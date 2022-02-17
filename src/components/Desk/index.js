import { h, Component, Fragment } from "preact"
import { createRef, useContext } from "preact/compat"
import { Router, route } from "preact-router"
import cxs from "cxs"

import { View } from "ui-shared/components"

import { Details, Ident, MemoizedArticles, Summary, Swiper, TextLink } from ".."
import { Theme } from "../../theme"

const api = require("../../API")
const storage = require("../../helpers/storage")
import { DOI } from "../../helpers/doi"

// import { load as graphFromJson } from "ngraph.fromjson"
// import { save as graphToJson } from "ngraph.tojson"


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

  renderArticles(DOIFromURL) {
    const g = this.state.articleGraph
    console.debug("g",g)
    const gLen = ( g || []).length
    console.debug("gLen",gLen)
    const doiFromUrl = DOI(DOIFromURL)
    var activeDOI = DOI(
      this.state.activeDOI ||
      doiFromUrl ||
      ((((g[
        Math.floor(
          (Math.random() * gLen)
        )
      ].article || {}).front || {})["article-meta"] || {})["article-id"] || {})["#text"]
    )
    console.debug("doiFromUrl",doiFromUrl)
    console.debug("activeDOI",activeDOI)

    const pointer = g.findIndex( (i) => {
      return (
        (((i.article || {}).front || {})["article-meta"] || {})["article-id"] || {}
      )["#text"] == activeDOI
    })

    const pointerBefore = pointer - 1 < 0 ? gLen - 1 : pointer - 1
    const pointerAfter = pointer + 1 >= gLen ? 0 : pointer + 1

    console.debug("pointerBefore",pointerBefore)
    console.debug("pointer",pointer)
    console.debug("pointerAfter",pointerAfter)

    return [pointerBefore, pointer, pointerAfter].map( (i) => {
      const doi = DOI(
        ((((g[i].article || {}).front || {})["article-meta"] || {})["article-id"] || {})["#text"]
      )
      const previousDOI = DOI((((((
        i == pointer
        ? g[pointerBefore]
        : i == pointerBefore
        ? g[pointerAfter]
        : g[pointer]
      ).article || {}).front || {})["article-meta"] || {})["article-id"] || {})["#text"])
      const nextDOI = DOI((((((
        i == pointer
        ? g[pointerAfter]
        : i == pointerBefore
        ? g[pointer]
        : g[pointerBefore]
      ).article || {}).front || {})["article-meta"] || {})["article-id"] || {})["#text"])
      const title = "TITLE"
      const osUrl = "URL"
      const doiUrl = "https://doi.org/" + doi
      const authors = [ "AUTHOR ONE", "AUTHOR TWO" ]
      const summary = "SUMMARY"
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
        >{title}
          <div style={{paddingTop:"0.5rem",fontSize:"0.8rem"}}>
            <Details className="always-print">
              <Summary className="not-print">Details</Summary>
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
          <div style={{margin:"0 -1rem"}}>
            <hr />
          </div>
          {summary}
        </Swiper>
      )
    })
  }

//   whatever() {
// 
//     if ((! g) || (gLen == 0)) { return null }
// 
//           // || g[g.length-1].article.doi
// 
//     console.debug("activeDOI",activeDOI)
//     // if (! activeDOI) { return null }
// 
//     // Some offsetting calcs. Explanation:
//     // 
//     //  [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o ]  <- All articles in current graph.
//     //                 [ f, g, h, i, j ]                 <- Articles to render.
//     //                         h                         <- Active article.
//     // 
//     // After swipe, moving to the right:
//     // 
//     //  [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o ]  <- All articles in current graph.
//     //                    [ g, h, i, j, k ]              <- Articles to render.
//     //                            i                      <- Active article.
//     // 
//     // After several more swipes:
//     // 
//     //  [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o ]  <- All articles in current graph.
//     //  ..a, b, c ]                            [ n, o..  <- Articles to render: n,o,a,b,c.
//     //    a                                              <- Active article.
// 
//     var offset = 0;
//     if (gLen > 0) {
//       offset = g.findIndex( (o) => {
//         if (
//           // (((o || {}).article || {}).front || {})["article-meta"] etc! FIXME
//           o
//           && typeof(o) === "object"
//           && o.article
//           && o.article.front
//           && "article-meta" in o.article.front
//           && "article-id" in o.article.front["article-meta"]
//           && "#text" in o.article.front["article-meta"]["article-id"]
//           && "@pub-id-type" in o.article.front["article-meta"]["article-id"]
//           && o.article.front["article-meta"]["article-id"]["@pub-id-type"] === "doi"
//         ) {
//           return String(
//             o.article.front["article-meta"]["article-id"]["#text"]
//           ).toLowerCase == String(activeDOI).toLowerCase()
//         } else {
//           return -1
//         }
//       })
//     }
//     offset = offset < 0 ? 0 : offset % gLen
// 
//     // Ensure article window isn't larger that the available articles.
//     const maxPad = Math.min(
//       // this.state.articleGraphWindowPadding,
//       1,
//       Math.floor((gLen - 1) / 2)
//     )
// 
//     const windowStartOffset = (gLen + (offset - maxPad) ) % gLen
// 
//     const ret = []
//     // for (let i = windowStartOffset; i < windowStartOffset + ( 2 * maxPad ) + 1; i ++) {
//     for (let i = 0 ; i < gLen; i++) {
//       const pointer = i % gLen
//       const article = g[pointer].article
//       const prevPointer = pointer - 1 < 0 ? gLen - 1 < 0 ? 0 : gLen - 1 : pointer - 1
//       const previous = g[prevPointer]
//       // if (typeof(previous) != "object" || (! "article" in previous) || (! "front" in previous.article) || (! "article-meta" in previous.article.front) || (! "article-id" in previous.article.front["article-meta"]) || (! "#text" in previous.article.front["article-meta"]["article-id"]) || (! "@pub-id-type" in previous.article.front["article-meta"]["article-id"]) || (! previous.article.front["article-meta"]["article-id"]["@pub-id-type"] == "doi")) {
//       //   continue
//       // }
//       const previousDOI = previous.article.front["article-meta"]["article-id"]["#text"]
//       const nextDOI = g[(pointer + 1) % gLen].article.front["article-meta"]["article-id"]["#text"]
//       const doi = article.front["article-meta"]["article-id"]["#text"]
//       console.debug("doi",doi)
//       const title = (
//         <h2>
//           {article.front["article-meta"]["title-group"]["article-title"]}
//         </h2>
//       )
//       const summary = article.body.sec.map( (section) => {
//         return ( <p>{section.p}</p> )
//       })
//       const authors = article.front["article-meta"]["contrib-group"]["contrib"].map( (c) => {
//         return c["string-name"]
//       }).filter( (i) => { if (i) { return true } })
//       const ref = createRef()
//       const doiUrl = String("https://doi.org/" + doi).toLowerCase()
//       const osUrl = String("https://app.osteoscout.com/doi/" + doi).toLowerCase()
//       ret.push(
//         <Swiper
//           id={"doi:"+doi}
//           uniaxial={true}
//           end={this.swipeEnd.bind(this,{doi,previousDOI,nextDOI})}
//           path={"/doi/" + doi}
//           doi={doi}
//           ref={ref}
//           shouldPreventDefault={this.swiperShouldPreventDefault}
//           startThreshold={100}
//           style={{display:activeDOI == doi ? undefined : "none"}}
//         >{title}
//           <div style={{paddingTop:"0.5rem",fontSize:"0.8rem"}}>
//             <Details className="always-print">
//               <Summary className="not-print">Details</Summary>
//               <p>
//                 <span class="print-only">
//                   Accessed at: <a style={{textDecoration:"underline !important"}} href={osUrl}>{osUrl}</a>
//                 </span>
//               </p>
//               <p>
//                 Full paper: <TextLink preventDefault={false} target="__blank" href={doiUrl}>{doiUrl}</TextLink>
//               </p>
//               {
//                 authors.length > 0 &&
//                 <p>Authors: {authors.map( (auth) => {
//                     return (<span>{auth}. </span>)
//                   })}</p>
//               }
//             </Details>
//           </div>
//           <div style={{margin:"0 -1rem"}}>
//             <hr />
//           </div>
//           {summary}
//         </Swiper>
//       )
//     }
// 
//     // If no article is visible, make the middle one visible and active!
//     if (! activeDOI) {
//       if (
//         ret.map( (e) => {
//           console.debug(((e.props.style) || {}).display)
//           return (e.props.style || {}).display
//         }).filter( (e) => {
//           return e != "none"
//         }).length == 0) {
//         const selected = ret[Math.floor(ret.length / 2)];
//         selected.style = null;
//         activeDOI = selected.props.doi;
//         this.setState(function(state,props) {
//           return {activeDOI:activeDOI}
//         });
//       }
//     }
// 
//     route("/doi/" + activeDOI)
//     return <Fragment>{ret}</Fragment>
//   }

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
