import { h, Component } from "preact"
import cxs from "cxs/component"
import { Link, Swiper, Text, TextInput, TextLink } from "ui-shared/components"

import Page from "../../components/Page"


const cyclicIterator = function (array) {
  var index = 0;
  var copy = array.slice(0);
  return {
    getCurrent: function () {
      return copy[index];
    },
    getNext: function () {
      index = ++index % copy.length;
      return this.getCurrent();
    },
    getPrevious: function () {
      if(--index < 0) {
        index += copy.length;
      }
      return this.getCurrent();
    }
  };
};

const rainbow = cyclicIterator([
  "#ff0000",
  "#ff6600",
  "#ffff00",
  "#00ff00",
  "#00ccff",
  "#3366cc",
  "#9900ff"
]);

class _Demo extends Component {
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
      <Page className="page">
        <Swiper
          style={{height:"400px",backgroundColor:this.state.bgcol}}
          left={this.swipeLeft}
          right={this.swipeRight}
          ><Text>Some text.</Text>
        </Swiper>
      </Page>
    )
    return (
      <_Demo className="front-page" style={{"height":"100vh"}}>
        <Page className="page">
          { /**
           <Text>This is some text. It is a simple <span style={{"backgroundColor":"silver"}}>span</span> in HTML.</Text>
           <Text elem="div" style={{"backgroundColor":"red","display":"block"}}>But you can style it or make it a div if you want.</Text>
           <Text>This text has a <TextLink url="https://google.com">link</TextLink> in it.</Text>
           <TextInput />
           <TextInput type="password" />
            */ }
           <Swiper
             style={{height:"400px",width:"100%",backgroundColor:this.state.bgcol,display:"block"}}
             left={this.swipeLeft} right={this.swipeRight}>
             <Text>Some text in a swiper.</Text>
           </Swiper>
        </Page>
      </_Demo>
    )
  }
}

const Demo = cxs(_Demo)(function(props) {
  return props.theme.demo
})


export default Demo
export { Demo }
