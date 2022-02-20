import { h, Component, Fragment } from "preact"
import { createRef, useContext } from "preact/compat"
import { Router, route } from "preact-router"
import cxs from "cxs"

import { View } from "ui-shared/components"

import { Details, Ident, MemoizedArticles, Summary, Swiper, TextLink } from ".."
import { Theme } from "../../theme"

const api = require("../../API")
import { DOI, shrinkTitle, storage } from "../../helpers/"

// import { load as graphFromJson } from "ngraph.fromjson"
// import { save as graphToJson } from "ngraph.tojson"


class Desk extends Component {
  constructor(props) {
    super(props)
    this.checkRoute = this.checkRoute.bind(this)
    this.renderArticles = this.renderArticles.bind(this)
    this.swiperShouldPreventDefault = this.swiperShouldPreventDefault.bind(this)
    this.fromArticle = this.fromArticle.bind(this)
    this.state = {
      apikey: undefined,
      // apikeyValidated: false,
      passphrase: undefined,
      loading: true,
      activeDOI: undefined,
      articleGraph: [],
    }
  }


  async componentDidMount() {
    const forceLogout = async () => {
      storage.removeItem("apikey")
      if (window.location.pathname != Ident.href) {
        window.location.replace(Ident.href)
      }
      await this.setState({loading:false})
    }

    var apikey = storage.getItem("apikey");

    if (! apikey) {
      forceLogout();
      return // Quit!
    }

    await this.setState({apikey})

    // const apikeyValidated = await api.validAPIKey(apikey)
    // await this.setState({apikeyValidated})
    // storage.setItem("apikey_validated",true)

    await api.getGraph({
      apikey
    }).then( async (res) => {
      if (res) {
        await this.setState({ articleGraph: res })
      }
    }).catch( (err) => {
      console.debug("Couldn't get graph: " + String(err))
    })
    await this.setState({loading:false})
  }


  swipeEnd(dois,ref,delta) {
    const { doi, previousDOI, nextDOI } = dois
    if (delta > 0) {
      if (previousDOI != undefined) {
        route("/doi/" + previousDOI)
        this.setState({activeDOI:previousDOI})
      } else {
        route("/doi/" + doi)
        this.setState({activeDOI:doi})
      }
    } else if (delta < 0) {
      if (nextDOI != undefined) {
        route("/doi/" + nextDOI)
        this.setState({activeDOI:nextDOI})
      } else {
        route("/doi/" + doi)
        this.setState({activeDOI:doi})
      }
    }

    api.recordUserNavigateFromDOIToDOI({
      apikey: this.state.apikey,
      doiA: ref.props.doi,
      doiB: nextDOI
    })
  }

  swiperShouldPreventDefault(ref,coords) {
    // Default action (vertical scrolling) should be prevented
    // if the user is swiping left or right.
    return coords.direction.left || coords.direction.right
  }

  fromArticle(item,elem) {
    if (! elem) { return undefined }
    elem = elem.toLowerCase()
    if (["title","authors","doi"].indexOf(elem) != -1) {
      const meta = (((item || {}).article || {}).front || {})["article-meta"] || {}
      if (elem == "doi") {
        if ((meta["article-id"] || {})["@pub-id-type"] == "doi") {
          return (meta["article-id"] || {})["#text"]
        }
        return undefined
      }
      else if (elem == "authors") {
        return ((meta["contrib-group"] || {})["contrib"] || []).map( (c) => {
          return c["string-name"]
        }).filter( (i) => { if (i) { return true } })
      }
      else if (elem == "title") {
        return (meta["title-group"] || {})["article-title"] || ""
      }
    }
    else if (["summary"].indexOf(elem) != -1) {
      const body = ((item || {}).article || {}).body || {}
      if (elem == "summary") {
        return (body.sec || []).map( (section) => {
          return ( <p>{section.p}</p> )
        })
      }
    }
    return undefined
  }

  renderArticles(DOIFromURL) {
    /* This function performs a fun dance. The current article being viewed
     * is identified from the state, or the URL. If there is no current
     * article, one is selected at random.
     * Next, the articles "either side" of the active article are
     * identified by look-up in the state's articleGraph (a list). This is
     * done in order to reveal them "underneath" the current article
     * during swiping.
     * Only the active article and the two either side (3 in total) are
     * rendered to prevent unnecessary DOM node rendering.
     */
    const g = this.state.articleGraph
    const gLen = ( g || []).length
    const doiFromUrl = DOI(DOIFromURL)
    var activeDOI = DOI(
      this.state.activeDOI ||
      doiFromUrl ||
      this.fromArticle(g[Math.floor((Math.random() * gLen))],"doi")
    )

    const pointer = g.findIndex( (i) => {
      return this.fromArticle(i,"doi") == activeDOI
    })

    const pointerBefore = pointer - 1 < 0 ? gLen - 1 : pointer - 1
    const pointerAfter = pointer + 1 >= gLen ? 0 : pointer + 1

    return [pointerBefore, pointer, pointerAfter].map( (i) => {
      const doi = DOI(this.fromArticle(g[i],"doi"))
      const previousDOI = DOI(
        this.fromArticle((
          i == pointer
          ? g[pointerBefore]
          : i == pointerBefore
          ? g[pointerAfter]
          : g[pointer]
        ),"doi")
      )
      const nextDOI = DOI(
        this.fromArticle((
          i == pointer
          ? g[pointerAfter]
          : i == pointerBefore
          ? g[pointer]
          : g[pointerBefore]
        ),"doi")
      )
      const title = this.fromArticle(g[i],"title")
      const shrunkTitle = shrinkTitle(title)
      const authors = this.fromArticle(g[i],"authors")
      const doiUrl = String("https://doi.org/" + doi).toLowerCase()
      const osUrl = String("https://app.osteoscout.com/doi/" + doi).toLowerCase()
      const summary = this.fromArticle(g[i],"summary")
      const ref = createRef()
      route("/doi/" + activeDOI)
      return (
        <Swiper
          id={"doi:"+doi}
          uniaxial={true}
          end={this.swipeEnd.bind(this,{doi,previousDOI,nextDOI})}
          path={"/doi/" + doi}
          doi={doi}
          ref={ref}
          shouldPreventDefault={this.swiperShouldPreventDefault}
          startThreshold={100}
          style={{display:activeDOI == doi ? undefined : "none"}}
          >
          <h2>{shrunkTitle}</h2>
          <Details className="always-print">
            <Summary className="not-print">Info</Summary>
            <p>
              <span class="print-only">
                Accessed at: <a style={{textDecoration:"underline !important"}} href={osUrl}>{osUrl}</a>
              </span>
            </p>
            <p>
              Full title: {title}
            </p>
            <p>
              Full paper: <TextLink preventDefault={false} target="__blank" href={doiUrl}>{doiUrl}</TextLink>
            </p>
            {
              authors.length > 0 &&
                <p>Authors: {authors.map( (auth) => {
                    return (<span>{auth}. </span>)
                })}</p>
            }
          </Details>
          {summary}
        </Swiper>
      )
    })
  }

  checkRoute(e) { }

  render() {
    const theme = useContext(Theme)
    if (this.state.loading) {
      return <div class="loading" style={{backgroundColor:theme.desk.backgroundColor}} />
    }

    const className = theme.desk
                    ? cxs(theme.desk) || null
                    : null

    return (
      <Router>
        <View default id="desk" className={className}>
          <Router>
            <View default>
              <p>
                <TextLink href={Ident.href}>Login</TextLink>
              </p>
            </View>
            <MemoizedArticles
              id="articles"
              path="/doi/:doi*"
              renderCallback={this.renderArticles}
              renderChecks={[
                this.state.activeDOI,
                theme
              ]}
              />
          </Router>
        </View>
        <Ident path={Ident.path} />
      </Router>
    )
  }
}

export default Desk
export { Desk }
