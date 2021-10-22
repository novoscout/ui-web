import { h, Component, createRef, Fragment } from "preact"
import { useMemo, useContext } from "preact/compat"
import { Text, View } from "ui-shared/components"
import { mergeDeep } from "ui-shared/lib"
import { Desk, Nav, Swiper, TextLink } from "../../components"
import { Theme } from "../../theme"

import { LoremIpsum } from "lorem-ipsum"

import { actual } from "actual"
import mq from "../../theme/common/mq"


class Demo extends Component {
  constructor(props) {
    super(props)
    this.share = this.share.bind(this)
    this.toggleNav = this.toggleNav.bind(this)
    this.renderArticles = this.renderArticles.bind(this)
    this.articleSiblings = this.articleSiblings.bind(this)
    // this.articleResetStyles = this.articleResetStyles.bind(this)
    this.state = {
      loading: true,
      navIsOpen: actual.is("(min-width:" + mq.breakpoint.md + ")"),
      articleGraph: [
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        []
      ]
    }
  }

  share() {
    navigator.share({
      title: "OsteoScout",
      text: "Interesting article",
      url: window.location.href
    },{
      copy: true,
      email: true,
      print: true,
      sms: true,
      messenger: true,
      facebook: true,
      whatsapp: true,
      twitter: true,
      linkedin: true,
      telegram: true,
      skype: true,
      language: 'en'
    })
    // .then( _ => console.log('Yay, you shared it :)'))
    // .catch( error => console.log('Oh noh! You couldn\'t share it! :\'(\n', error));
  }

  toggleNav(e) {
    console.log(e)
    if (actual.is("(min-width:" + mq.breakpoint.md + ")")) {
      this.setState({navIsOpen:true})
    } else {
      this.setState({navIsOpen:!this.state.navIsOpen})
    }
    if (
      (e.target || {}).nodeName == "SPAN" && (
        (e.target.textContent || "").includes("Share")
        // (e.target.children && ((e.target.children[0] || {}).textContent || "").includes("Share"))
      ) ) {
      this.share()
    }
    if (((e.target || {}).children || []).length > 0) {
      if ((e.target.children[1].textContent || "").includes("Share")) {
        this.share()
      }
    }
  }

  articleSiblings(ref,numToShow) {
    numToShow = numToShow ? numToShow : Infinity
    // FIXME This should probably be done with refs instead of DOM nodes.
    return Array(...ref.current.base.parentNode.children).slice(0,numToShow).map( (i) => {
      if (ref.current.base != i) { return i }
    }).filter((i) => { if (i) { return i } })
  }

  articleResetStyles(ref,numToShow) {
    numToShow = numToShow ? numToShow : Infinity
    ref.current.base.style.transition = "all 0.3s ease-out"
    ref.current.base.style.removeProperty("transform")
    // this.articleSiblings(ref,numToShow).map( (s) => {
    //   s.style.removeProperty("transform")
    // })
  }

  swipeShouldPreventDefault(ref,coords) {
    return coords.xDelta > coords.yDelta
  }

  swipeStart(ref,numToShow) {
    ref.current.base.style.removeProperty("transition")
  }

  swipeEnd(ref,numToShow) {
    this.articleResetStyles(ref,numToShow)
  }

  swipeCancel(ref,numToShow) {
    this.articleResetStyles(ref,numToShow)
  }

  swipeMove(ref,numToShow,pointerCoords) {
    ref.current.base.style.transform =
      "translateX(" + String((pointerCoords.start.x - pointerCoords.x)*-1) + "px) "
  }

  componentDidMount() {
    this.setState({loading:false})
  }

  renderArticles(theme,numToShow) {
    const stackIndex = 0
    const stack = this.state.articleGraph[stackIndex]

    const minToShow = 2
    numToShow = numToShow ? numToShow : minToShow
    numToShow = stack.length < numToShow && stack.length > minToShow ? stack.length : numToShow

    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 2,
        min: 1
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    })

    var brightness = 100
    const ret = []

    stack.slice(0,numToShow).map( (a) => {
      const ref = createRef()
      const style = {
        filter: brightness > 0 ? "brightness(" + String(brightness) + "%)" : null,
      }

      brightness -= 10

      ret.push(
        <Swiper
          ref={ref}
          style={style}
          uniaxial={true}
          start={ this.swipeStart.bind(this,ref,numToShow) }
          end={ this.swipeEnd.bind(this,ref,numToShow) }
          cancel={ this.swipeCancel.bind(this,ref,numToShow) }
          move={ this.swipeMove.bind(this,ref,numToShow) } 
          shouldPreventDefault={ this.swipeShouldPreventDefault.bind(this,ref) }
          >
          <View>
            <Text style={{fontWeight:"bold"}}>{lorem.generateSentences(1)}</Text>
          </View>
          <hr/>
          <View>
            <Text elem="div">
              <Text><TextLink>Authors Here</TextLink>&#32;&nbsp;&#32;</Text>
              <Text><TextLink>{lorem.generateWords(2)}</TextLink>&#32;&nbsp;&#32;</Text>
              <Text><TextLink>{lorem.generateWords(2)}</TextLink>&#32;&nbsp;&#32;</Text>
              <Text>...</Text>
            </Text>
          </View>
          <hr/>
          <View>
            <Text elem="div">
              <Text><TextLink>keywords</TextLink>&#32;&nbsp;&#32;</Text>
              <Text><TextLink>{lorem.generateWords(2)}</TextLink>&#32;&nbsp;&#32;</Text>
              <Text><TextLink>{lorem.generateWords(2)}</TextLink>&#32;&nbsp;&#32;</Text>
              <Text><TextLink>{lorem.generateWords(2)}</TextLink>&#32;&nbsp;&#32;</Text>
              <Text><TextLink>{lorem.generateWords(2)}</TextLink>&#32;&nbsp;&#32;</Text>
              <Text><TextLink>{lorem.generateWords(2)}</TextLink></Text>
            </Text>
          </View>
          <hr/>
          <View>
            <Text>{lorem.generateParagraphs(30)}</Text>
          </View>
        </Swiper>
      )
    })

    return ret.reverse()
  }

  render() {
    if (this.state.loading) { return null }

    const theme = useContext(Theme)

    // Ensure articles are only generated when the articleGraph changes.
    const memoizedArticles = useMemo(
      () => this.renderArticles(theme),
      [ this.state.articleGraph ]
    )

    return (
      <Fragment>
        <Desk id="desk">
          {memoizedArticles}
        </Desk>
        <Nav
          id="nav"
          onClick={this.toggleNav}
          isOpen={
            actual.is("(min-width:" + mq.breakpoint.md + ")") ||
              this.state.navIsOpen
          }
          toggleTheme={this.props.toggleTheme} />
      </Fragment>
    )
  }
}

export default Demo
export { Demo }
