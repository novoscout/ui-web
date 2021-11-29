import { h, Component, Fragment } from "preact"
import { useContext, useMemo } from "preact/compat"
import { Router, route } from "preact-router"
import cxs from "cxs"

import { View } from "ui-shared/components"

import { Ident, Swiper, TextLink } from ".."
import { Theme } from "../../theme"
import { api } from "../../API"

import { load as graphFromJson } from "ngraph.fromjson"
import { save as graphToJson } from "ngraph.tojson"


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
      loading: true,
      // didSwipe: false,
      activeDOI: undefined,
      articleGraph: api.getGraph(0)
    }
  }

  componentDidMount() {
    this.setState({loading:false})
  }

  swipeEnd(ref,delta) {
    // Rotate the state's article graph.
    const g = [ ...this.state.articleGraph ]
    if (delta < 0) {
      g.unshift(g.pop())
    } else if (delta > 0) {
      g.push(g.shift())
    }
    this.setState({
      // didSwipe: true,
      activeDOI: g[g.length-1].article.doi,
      articleGraph: g
    })
  }

  renderArticles(DOIFromURL) {
    var g = [ ...this.state.articleGraph ]
    const gLen = g.length

    const activeDOI = this.state.activeDOI || DOIFromURL || g[g.length-1].article.doi

    var offset = g.findIndex( o => String(o.article.doi) == String(activeDOI))
    offset = offset < 0 ? 0 : offset

    // If the user has not swiped or set an active DOI, the state's
    // article graph will be ints default position, so re-order it.
    // if ((! this.state.didSwipe) || (this.state.activeDOI == undefined)) {
    if (this.state.activeDOI == undefined) {
      g = g.splice(offset+1).concat(g)
    }

    var ret = []
    for (let i = 0; i < gLen; i++) {
      const pointer = i % gLen
      const article = g[pointer].article
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
          end={ this.swipeEnd.bind(this) }
          startThreshold={10}
          path={"/doi/" + doi}
          doi={doi}
          >{title}<hr />{para}</Swiper>
      )
    }

    // Update the URL.
    route("/doi/" + ret[ret.length-1].props.doi)

    // Update the state to ensure it is in the correct order.
    this.setState({articleGraph: [ ...g ] })

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
            <View default id="not-article">
              <p>
                <TextLink href="/doi/a">Article A</TextLink>
              </p>
              <p>
                <TextLink href="/doi/b">Article B</TextLink>
              </p>
            </View>
            <Articles
              id="articles"
              path="/doi/:doi*"
              renderCallback={this.renderArticles}
              renderChecks={[
                this.state.activeDOI
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
