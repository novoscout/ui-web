import { h, Component } from "preact"
import { Link, Swiper, Text, TextInput, TextLink } from "ui-shared/components"
import { cyclicIterator } from "ui-shared/lib"
import { Page } from "../../components"
import { Theme } from "../../theme"

import cxs from "cxs"

const rainbow = cyclicIterator([
  "#ff0000","#ff9900","#ffff00","#00ff00","#00ccff","#3366cc","#9900ff"
]);

class Demo extends Component {
  constructor(props) {
    super(props)
    this.swipeLeft = this.swipeLeft.bind(this)
    this.swipeRight = this.swipeRight.bind(this)
    this.state = {
      bgcol: undefined,
      loading: true
    }
  }

  swipeLeft() {
    this.setState({bgcol:rainbow.getNext()})
  }
  swipeRight() {
    this.setState({bgcol:rainbow.getPrevious()})
  }

  componentDidMount() {
    this.setState({loading:false,bgcol:rainbow.getCurrent()})
  }

  render() {
    if (this.state.loading) { return null }
    return (
      <Page>
        { /**
           <Text>This is some text. It is a simple <span style={{"backgroundColor":"silver"}}>span</span> in HTML.</Text>
           <Text elem="div" style={{"backgroundColor":"red","display":"block"}}>But you can style it or make it a div if you want.</Text>
           <Text>This text has a <TextLink url="https://google.com">link</TextLink> in it.</Text>
           <TextInput />
           <TextInput type="password" />
        */ }
        <Swiper
          style={{height:"400px",backgroundColor:this.state.bgcol}}
          left={this.swipeLeft}
          right={this.swipeRight}
          ><Text>Some text.</Text>
        </Swiper>
      </Page>
    )
  }
}

export default Demo
export { Demo }
