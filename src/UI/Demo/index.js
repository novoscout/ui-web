import { h, Component } from "preact"
import { useContext } from "preact/compat"

import { Text, View } from "ui-shared/components"
import { Desk, Modal, Nav, Toolbar } from "../../components"

// import { LoremIpsum } from "lorem-ipsum"


class Demo extends Component {
  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.state = {
      loading: true,
      modal: { visible: false }
    }
  }

  componentDidMount() {
    this.setState({loading:false})
  }

  async toggleModal(e) {
    if (e && e.hasOwnProperty("visible")) {
      await this.setState({ modal: { visible: e.visible }})
    } else {
      await this.setState({ modal: { visible: ! this.state.modal.visible }})
    }
  }

  render() {
    if (this.state.loading) { return null }

    const commonActions = {
      toggleModal: this.toggleModal,
      chooseTheme: this.props.chooseTheme
    }

    return (
      <Modal.Context.Provider value={this.state.modal}>
        <Nav {...commonActions} />
        <Desk {...commonActions} />
        <Toolbar {...commonActions} />
        <Modal {...commonActions} />
      </Modal.Context.Provider>
    )
  }
}

export default Demo
export { Demo }


  // whatever(theme) {
  //   const paras = (<Fragment><p>Hi first</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi</p><p>Hi last</p></Fragment>)
  //   const ref1 = createRef()
  //   const ref2 = createRef()
  //   const ref3 = createRef()
  //   // const this.state.numArticlesToShow = 3
  //   return (
  //     <div id="articles-frame-outer" style="height:100%">
  //       <Swiper
  //         ref={ref1}
  //         uniaxial={true}
  //         start={ this.swipeStart.bind(this,ref1,this.state.numArticlesToShow) }
  //         end={ this.swipeEnd.bind(this,ref1,this.state.numArticlesToShow) }
  //         cancel={ this.swipeCancel.bind(this,ref1,this.state.numArticlesToShow) }
  //         move={ this.swipeMove.bind(this,ref1,this.state.numArticlesToShow) } 
  //         shouldPreventDefault={ this.swipeShouldPreventDefault.bind(this,ref1) }
  //         style="background:pink"
  //         >
  //         {paras}
  //       </Swiper>
  //       <Swiper
  //         ref={ref2}
  //         uniaxial={true}
  //         start={ this.swipeStart.bind(this,ref2,this.state.numArticlesToShow) }
  //         end={ this.swipeEnd.bind(this,ref2,this.state.numArticlesToShow) }
  //         cancel={ this.swipeCancel.bind(this,ref2,this.state.numArticlesToShow) }
  //         move={ this.swipeMove.bind(this,ref2,this.state.numArticlesToShow) } 
  //         shouldPreventDefault={ this.swipeShouldPreventDefault.bind(this,ref2) }
  //         style="background:cyan"
  //         >
  //         {paras}
  //       </Swiper>
  //       <Swiper
  //         ref={ref3}
  //         uniaxial={true}
  //         start={ this.swipeStart.bind(this,ref3,this.state.numArticlesToShow) }
  //         end={ this.swipeEnd.bind(this,ref3,this.state.numArticlesToShow) }
  //         cancel={ this.swipeCancel.bind(this,ref3,this.state.numArticlesToShow) }
  //         move={ this.swipeMove.bind(this,ref3,this.state.numArticlesToShow) } 
  //         shouldPreventDefault={ this.swipeShouldPreventDefault.bind(this,ref3) }
  //         style="background:orange"
  //         startThreshold={10}
  //         >
  //         {paras}
  //       </Swiper>
  //     </div>
  //   )
  // }

//  previousRenderArticles(theme,this.state.numArticlesToShow) {
//    const stackIndex = 0
//    const stack = this.state.articleGraph[stackIndex]
//
//    const minToShow = 2
//    this.state.numArticlesToShow = this.state.numArticlesToShow ? this.state.numArticlesToShow : minToShow
//    this.state.numArticlesToShow = stack.length < this.state.numArticlesToShow && stack.length > minToShow ? stack.length : this.state.numArticlesToShow
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
//    stack.slice(0,this.state.numArticlesToShow).map( (a) => {
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
//          start={ this.swipeStart.bind(this,ref,this.state.numArticlesToShow) }
//          end={ this.swipeEnd.bind(this,ref,this.state.numArticlesToShow) }
//          cancel={ this.swipeCancel.bind(this,ref,this.state.numArticlesToShow) }
//          move={ this.swipeMove.bind(this,ref,this.state.numArticlesToShow) } 
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
