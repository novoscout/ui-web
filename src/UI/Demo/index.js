import { h, Component, createContext, createRef, Fragment } from "preact"
import { useMemo, useContext } from "preact/compat"

import { Text, View } from "ui-shared/components"
import { mergeDeep } from "ui-shared/lib"
import { Desk, Modal, Nav, Swiper, TextLink, Toolbar } from "../../components"
import { Theme } from "../../theme"

// import { LoremIpsum } from "lorem-ipsum"

import mq from "../../theme/common/mq"


class Demo extends Component {
  constructor(props) {
    super(props)
    this.share = this.share.bind(this)
    this.renderArticles = this.renderArticles.bind(this)
    this.articleSiblings = this.articleSiblings.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.articleResetStyles = this.articleResetStyles.bind(this)
    this.state = {
      loading: true,
      modal: { visible: false },
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

  articleSiblings(ref,numToShow) {
    numToShow = numToShow ? numToShow : 3
    // FIXME This should probably be done with refs instead of DOM nodes.
    return Array(...ref.current.base.parentNode.children).slice(0,numToShow).map( (i) => {
      if (ref.current.base != i) { return i }
    }).filter((i) => { if (i) { return i } })
  }

  articleResetStyles(ref,numToShow) {
    numToShow = numToShow ? numToShow : 3
    ref.current.base.style.transition = "all 0.2s ease-out"
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
    const delta = (pointerCoords.start.x - pointerCoords.x)*-1
    ref.current.base.style.transform = "translateX(" + String(delta) + "px)"
  }

  componentDidMount() {
    this.setState({loading:false})
  }

  renderArticles(theme) {
    const paras = (<Fragment><p>Hi first</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi last</p></Fragment>)
    const ref1 = createRef()
    const ref2 = createRef()
    const ref3 = createRef()
    const numToShow = 3
    return (
      <div id="articles-frame-outer" style="height:100%">
        <Swiper
          ref={ref1}
          uniaxial={true}
          start={ this.swipeStart.bind(this,ref1,numToShow) }
          end={ this.swipeEnd.bind(this,ref1,numToShow) }
          cancel={ this.swipeCancel.bind(this,ref1,numToShow) }
          move={ this.swipeMove.bind(this,ref1,numToShow) } 
          shouldPreventDefault={ this.swipeShouldPreventDefault.bind(this,ref1) }
          style="background:pink"
          >
          {paras}
        </Swiper>
        <Swiper
          ref={ref2}
          uniaxial={true}
          start={ this.swipeStart.bind(this,ref2,numToShow) }
          end={ this.swipeEnd.bind(this,ref2,numToShow) }
          cancel={ this.swipeCancel.bind(this,ref2,numToShow) }
          move={ this.swipeMove.bind(this,ref2,numToShow) } 
          shouldPreventDefault={ this.swipeShouldPreventDefault.bind(this,ref2) }
          style="background:cyan"
          >
          {paras}
        </Swiper>
        <Swiper
          ref={ref3}
          uniaxial={true}
          start={ this.swipeStart.bind(this,ref3,numToShow) }
          end={ this.swipeEnd.bind(this,ref3,numToShow) }
          cancel={ this.swipeCancel.bind(this,ref3,numToShow) }
          move={ this.swipeMove.bind(this,ref3,numToShow) } 
          shouldPreventDefault={ this.swipeShouldPreventDefault.bind(this,ref3) }
          style="background:orange"
          startThreshold={10}
          >
          {paras}
        </Swiper>
      </div>
    )
  }

//  previousRenderArticles(theme,numToShow) {
//    const stackIndex = 0
//    const stack = this.state.articleGraph[stackIndex]
//
//    const minToShow = 2
//    numToShow = numToShow ? numToShow : minToShow
//    numToShow = stack.length < numToShow && stack.length > minToShow ? stack.length : numToShow
//
//    const lorem = new LoremIpsum({
//      sentencesPerParagraph: {
//        max: 2,
//        min: 1
//      },
//      wordsPerSentence: {
//        max: 16,
//        min: 4
//      }
//    })
//
//    var brightness = 100
//    const ret = []
//
//    stack.slice(0,numToShow).map( (a) => {
//      const ref = createRef()
//      const style = {
//        filter: brightness > 0 ? "brightness(" + String(brightness) + "%)" : null,
//      }
//
//      brightness -= 10
//
//      ret.push(
//        <Swiper
//          ref={ref}
//          style={style}
//          uniaxial={true}
//          start={ this.swipeStart.bind(this,ref,numToShow) }
//          end={ this.swipeEnd.bind(this,ref,numToShow) }
//          cancel={ this.swipeCancel.bind(this,ref,numToShow) }
//          move={ this.swipeMove.bind(this,ref,numToShow) } 
//          shouldPreventDefault={ this.swipeShouldPreventDefault.bind(this,ref) }
//          >
//          <View>
//            <Text style={{fontWeight:"bold"}}>{lorem.generateSentences(1)}</Text>
//          </View>
//          <hr/>
//          <View>
//            <Text elem="div">
//              <Text><TextLink>Authors Here</TextLink>&#32;&nbsp;&#32;</Text>
//              <Text><TextLink>{lorem.generateWords(2)}</TextLink>&#32;&nbsp;&#32;</Text>
//              <Text><TextLink>{lorem.generateWords(2)}</TextLink>&#32;&nbsp;&#32;</Text>
//              <Text>...</Text>
//            </Text>
//          </View>
//          <hr/>
//          <View>
//            <Text elem="div">
//              <Text><TextLink>keywords</TextLink>&#32;&nbsp;&#32;</Text>
//              <Text><TextLink>{lorem.generateWords(2)}</TextLink>&#32;&nbsp;&#32;</Text>
//              <Text><TextLink>{lorem.generateWords(2)}</TextLink>&#32;&nbsp;&#32;</Text>
//              <Text><TextLink>{lorem.generateWords(2)}</TextLink>&#32;&nbsp;&#32;</Text>
//              <Text><TextLink>{lorem.generateWords(2)}</TextLink>&#32;&nbsp;&#32;</Text>
//              <Text><TextLink>{lorem.generateWords(2)}</TextLink></Text>
//            </Text>
//          </View>
//          <hr/>
//          <View>
//            <Text>{lorem.generateParagraphs(30)}</Text>
//          </View>
//        </Swiper>
//      )
//    })
//
//    return ret.reverse()
//  }

  toggleModal(e) {
    this.setState(function(state,props) {
      return { modal: { visible: ! state.modal.visible } }
    })
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
      <Modal.Context.Provider value={this.state.modal}>
        <Nav />
        <Desk>{memoizedArticles}</Desk>
        <Toolbar
          share={this.share}
          toggleModal={this.toggleModal}
          toggleTheme={this.props.toggleTheme}
          />
        <Modal />
      </Modal.Context.Provider>
    )
  }
}

export default Demo
export { Demo }
