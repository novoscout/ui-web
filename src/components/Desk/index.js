import { h, Component, Fragment } from "preact"
import { createRef, useContext, useMemo } from "preact/compat"
import { Router, route } from "preact-router"
import cxs from "cxs"

import { View } from "ui-shared/components"

import { Details, Ident, Summary, Swiper, TextLink } from ".."
import { Theme } from "../../theme"
const api = require("../../API")

// import { load as graphFromJson } from "ngraph.fromjson"
// import { save as graphToJson } from "ngraph.tojson"

const storage = require("../../helpers/storage")


const Articles = (props) => {
  // This component is separate from the Desk component so it can access
  // the doi prop inserted by preact-router.
  const doi = (props || {}).doi

  // Ensure articles are only generated when necessary.
  const memoizedArticles = useMemo(
    () => { return props.renderCallback(doi) },
    props.renderChecks
  )

  return (
    <View style={{height:"100%"}}>
      {memoizedArticles}
    </View>
  )
}


class Desk extends Component {
  constructor(props) {
    super(props)
    this.checkRoute = this.checkRoute.bind(this)
    this.renderArticles = this.renderArticles.bind(this)
    this.swiperShouldPreventDefault = this.swiperShouldPreventDefault.bind(this)
    this.state = {
      apikey: undefined,
      // apikeyValidated: false,
      passphrase: undefined,
      loading: true,
      activeDOI: undefined,
      articleGraph: [],

      // Number of articles to "pad" around the displayed one.
      // The "padding" here is added either side of the displayed
      // article, so e.g. a padding of 1 each side results
      // in rendering 3 articles (max). This is done to ensure
      // the UI doesn't needlessly render hidden elements,
      // and calculate their transition effects etc.
      articleGraphWindowPadding: 1,
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

    await api.getGraph({apikey}).then( async (res) => {
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

  renderArticles(DOIFromURL) {
    const g = this.state.articleGraph
    const gLen = ( g || []).length

    if ((! g) || (gLen == 0)) { return null }

    const activeDOI = this.state.activeDOI
          || DOIFromURL
          || ((g[Math.floor(Math.random() * gLen)] || {}).article || {}).doi
          // || g[g.length-1].article.doi

    if (! activeDOI) { return null }

    // Some offsetting calcs. Explanation:
    // 
    //  [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o ]  <- All articles in current graph.
    //                 [ f, g, h, i, j ]                 <- Articles to render.
    //                         h                         <- Active article.
    // 
    // After swipe, moving to the right:
    // 
    //  [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o ]  <- All articles in current graph.
    //                    [ g, h, i, j, k ]              <- Articles to render.
    //                            i                      <- Active article.
    // 
    // After several more swipes:
    // 
    //  [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o ]  <- All articles in current graph.
    //  ..a, b, c ]                            [ n, o..  <- Articles to render: n,o,a,b,c.
    //    a                                              <- Active article.

    var offset = 0;
    if (gLen > 0) {
      offset = g.findIndex( (o) => {
        if (o && typeof(o) === "object" && "article" in o && "doi" in o.article) {
          return String(o.article.doi) == String(activeDOI)
        } else {
          return -1
        }
      })
    }
    offset = offset < 0 ? 0 : offset % gLen

    // Ensure article window isn't larger that the available articles.
    const maxPad = Math.min(
      this.state.articleGraphWindowPadding,
      Math.floor((gLen - 1) / 2)
    )

    const windowStartOffset = (gLen + (offset - maxPad) ) % gLen

    const ret = []
    for (let i = windowStartOffset; i < windowStartOffset + ( 2 * maxPad ) + 1; i ++) {
      const pointer = i % gLen
      const article = g[pointer].article
      const prevPointer = pointer - 1 < 0 ? gLen - 1 < 0 ? 0 : gLen - 1 : pointer - 1
      const previous = g[prevPointer]
      if (typeof(previous) != "object" || (! "article" in previous) || (! "doi" in previous.article)) {
        continue
      }
      const previousDOI = previous.article.doi
      const nextDOI = g[(pointer + 1) % gLen].article.doi
      const doi = article.doi
      const title = (
        <h2>
          {article.front["article-meta"]["title-group"]["article-title"]}
        </h2>
      )
      const summary = article.body.sec.map( (section) => {
        return ( <p>{section.p}</p> )
      })
      const authors = article.front["article-meta"]["contrib-group"].map( (c) => {
        return c["contrib"]["string-name"]
      }).filter( (i) => { if (i) { return true } })
      const ref = createRef()
      const doiUrl = String("https://doi.org/" + doi).toLowerCase()
      const osUrl = String("https://app.osteoscout.com/doi/" + doi).toLowerCase()
      ret.push(
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
        >{title}
          <hr />
          <div style={{fontSize:"0.9rem"}}>
            <Details>
              <Summary>Details</Summary>
              <p>
                <span class="print-only">
                  Accessed at: <a style={{textDecoration:"underline !important"}} href={osUrl}>{osUrl}</a>
                </span>
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
          </div>
          <hr />
          {summary}
        </Swiper>
      )
    }

    route("/doi/" + activeDOI)
    return <Fragment>{ret}</Fragment>
  }

  checkRoute(e) { }

  render() {
    const theme = useContext(Theme)
    if (this.state.loading) {
      return <div class="loading" style={{backgroundColor:theme.desk.backgroundColor}} />
    }

    const className = theme.desk
                    ? cxs(theme.desk)
                    : null

    return (
      <Router>
        <View default id="desk" className={className}>
          <Router>
            { /**
            <View default>
              <p>
                <TextLink href={Ident.href}>Login</TextLink>
              </p>
            </View>
            */ }
            <Articles
              default
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
