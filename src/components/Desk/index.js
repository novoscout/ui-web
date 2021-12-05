import { h, Component, Fragment } from "preact"
import { useContext, useMemo } from "preact/compat"
import { Router, route } from "preact-router"
import cxs from "cxs"

import { View } from "ui-shared/components"

import { Ident, Swiper, TextLink } from ".."
import { Theme } from "../../theme"
import { api } from "../../API"

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
    this.renderArticles = this.renderArticles.bind(this)
    this.state = {
      apikey: undefined,
      passphrase: undefined,
      loading: true,
      activeDOI: undefined,
      articleGraph: []
    }
  }

  async componentDidMount() {
    const forceLogout = () => {
      storage.removeItem("apikey")
      if (window.location.pathname != Ident.href) {
        window.location.replace(Ident.href)
      }
      this.setState(function(state) {
        return { loading: false }
      })
    }
    var apikey = storage.getItem("apikey")
    if (! apikey) {
      forceLogout()
      return // Quit!
    }

    this.setState(function(state) {
      return {
        apikey: apikey
      }
    })

    try {
      const getGraph = await api.getGraph({apikey})
      const g = getGraph
      this.setState(function(state) {
        return {
          articleGraph: g
        }
      })
    } catch(err) {
      // FIXME
    }

    this.setState({loading:false})
  }

  swipeEnd(dois,ref,delta) {
    const { previousDOI, nextDOI } = dois
    if (delta < 0 && previousDOI != undefined) {
      route("/doi/" + previousDOI)
      this.setState({activeDOI:previousDOI})
    } else if (delta > 0 && nextDOI != undefined) {
      route("/doi/" + nextDOI)
      this.setState({activeDOI:nextDOI})
    }

    api.recordUserNavigateFromDOIToDOI({
      apikey: this.state.apikey,
      doiA: ref.props.doi,
      doiB: nextDOI
    }).catch((err) => {
      // FIXME
    })
  }

  renderArticles(DOIFromURL) {
    const g = this.state.articleGraph
    const gLen = g.length

    if (! g) { return null }

    const activeDOI = this.state.activeDOI
          || DOIFromURL
          || ((g[Math.floor(Math.random() * ((g || {}).length || 0))] || {}).article || {}).doi
          // || g[g.length-1].article.doi

    if (! activeDOI) { return null }

    var offset = g.findIndex( o => String(o.article.doi) == String(activeDOI)) + 1
    offset = offset < 0 ? 0 : offset
    offset = offset % gLen

    var ret = []
    for (let i = 0 + offset; i < (gLen + offset); i++) {
      const pointer = i % gLen
      const article = g[pointer].article
      const previousDOI = g[pointer - 1 < 0 ? gLen - 1 : pointer - 1].article.doi
      const nextDOI = g[(pointer + 1) % gLen].article.doi
      const doi = String(article.doi)
      const title = (
        <h2>
          {article.front["article-meta"]["title-group"]["article-title"]}
        </h2>
      )
      const para = article.body.sec.map( (section) => {
        return ( <p>{section.p}</p> )
      })
      ret.push(
        <Swiper
          uniaxial={true}
          end={this.swipeEnd.bind(this,{previousDOI,nextDOI}) }
          startThreshold={10}
          path={"/doi/" + doi}
          doi={doi}
          >{title}<hr />{para}</Swiper>
      )
    }
    if (activeDOI) {
      route("/doi/" + activeDOI)
    }
    return (<Fragment>{ret}</Fragment>)
  }

  render() {
    if (this.state.loading) { return null }

    const theme = useContext(Theme)

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
        <Ident path={Ident.href} />
      </Router>
    )
  }
}

export default Desk
export { Desk }
