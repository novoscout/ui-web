import { h, Component } from "preact"
import { createRef, useContext } from "preact/compat"
import { Router, route } from "preact-router"
import cxs from "cxs"

import { View } from "ui-shared/components"

import { Details, Ident, MemoizedArticles, Summary, Swiper, TextLink } from ".."
import { Theme } from "../../theme"
import { DOI, shrinkTitle, storage } from "../../helpers/"
import api from "../../API"

// import { load as graphFromJson } from "ngraph.fromjson"
// import { save as graphToJson } from "ngraph.tojson"


class Desk extends Component {
  constructor(props) {
    super(props)
    this.renderArticles = this.renderArticles.bind(this)
    this.swiperShouldPreventDefault = this.swiperShouldPreventDefault.bind(this)
    this.fromArticle = this.fromArticle.bind(this)
    this.handleRoute = this.handleRoute.bind(this)
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
    }).catch( (e) => {
      console.debug("API error: ",e)
    })
  }

  swiperShouldPreventDefault(ref,coords) {
    // Default action (vertical scrolling) should be prevented
    // if the user is swiping left or right.
    return coords.direction.left || coords.direction.right
  }

  fromArticle(chunk,elem) {
    if (! elem) { return undefined }
    elem = elem.toLowerCase()
    if (["title","authors","doi"].indexOf(elem) != -1) {
      const meta = (((chunk || {}).article || {}).front || {})["article-meta"] || {}
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
    else if (["body"].indexOf(elem) != -1) {
      const body = ((chunk || {}).article || {}).body || {}
      if (elem == "body") {
        return (body.sec || []).map( (sec) => {
          return ((sec || {}).p || []).map( (p) => {
            return (
              <p>
                {
                  (p || []).map( (sentence,idx) => {
                    return sentence.text
                         ? (
                           <span className={"lod lod-" + String(
                             (sentence.levelOfDetail || 0) * api.numLevelsOfDetail
                           )
                           }>{sentence.text + " "}</span>
                         )
                         : undefined
                  }).filter(
                    (text) => { if (text) { return true }
                  })
                }
              </p>
            )
          })
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
     * returned to prevent unnecessary nodes in the DOM.
     */
    const g = this.state.articleGraph
    const gLen = ( g || []).length
    const doiFromUrl = DOI(DOIFromURL)
    var activeDOI = this.state.activeDOI ||
                    doiFromUrl ||
                    this.fromArticle(g[Math.floor((Math.random() * gLen))],"doi")
    activeDOI = DOI(activeDOI)

    const pointer = g.findIndex( (i) => {
      return this.fromArticle(i,"doi") == activeDOI
    })

    const pointerBefore = pointer - 1 < 0 ? gLen - 1 : pointer - 1
    const pointerAfter = pointer + 1 >= gLen ? 0 : pointer + 1

    if (activeDOI) {
      route("/doi/" + activeDOI)
    }

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
      const doiUrl = "https://doi.org/" + (doi ? doi : "")
      const osUrl = "https://app.osteoscout.com/doi/" + (doi ? doi : "")
      const title = this.fromArticle(g[i],"title")
      const authors = this.fromArticle(g[i],"authors")
      const body = this.fromArticle(g[i],"body")
      const ref = createRef()
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
          <h2>{shrinkTitle(title)}</h2>
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
            {
              authors.length > 0 &&
                <p>Authors: {authors.map( (auth) => {
                    return (<span>{auth}. </span>)
                })}</p>
            }
            <p>
              Full paper: <TextLink preventDefault={false} target="__blank" href={doiUrl}>{doiUrl}</TextLink>
            </p>
          </Details>
          {body}
        </Swiper>
      )
    })
  }

  async handleRoute(e) {
    // console.log(e)
  }

  render() {
    const theme = useContext(Theme)
    if (this.state.loading) {
      return <div class="loading" style={{backgroundColor:theme.desk.backgroundColor}} />
    }

    const className = theme.desk
                    ? cxs(theme.desk) || null
                    : null

    return (
      <Router onChange={this.handleRoute}>
        <View default id="desk" className={className}>
          <Router>
            <View default>
              <p style={{marginTop:"2rem",textAlign:"center"}}>
                <TextLink href={Ident.href}>Login</TextLink>
              </p>
            </View>
            <MemoizedArticles
              id="articles"
              path="/doi/:doi*"
              renderCallback={this.renderArticles}
              checkIfUpdated={[
                theme.desk.backgroundColor,
                theme.swiper.inner.backgroundColor,
                this.state.activeDOI
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
