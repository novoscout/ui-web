import { h, Component, createContext, createElement } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

const lightTheme = {
  link: { backgroundColor: "pink" },
  page: { backgroundColor: "white", height:"100vh" }
}

const darkTheme = {
  link: { backgroundColor: "darkgreen" },
  page: { backgroundColor: "silver", height: "100vh" }
}

const Theme = createContext(lightTheme)

const Base = (props) => {
  return createElement("div", {...props})
}

class Debug extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      useDarkTheme: false
    }
  }

  toggle(e) {
    e.preventDefault()
    this.setState({useDarkTheme:!this.state.useDarkTheme})
  }

  render() {
    console.log("Called Debug render")
    const theme = this.state.useDarkTheme ? darkTheme : lightTheme
    console.log(theme.page)
    console.log(theme.link)
    return (
      <Theme.Provider value={theme}>
        <Page toggle={this.toggle}>
          <Link />
        </Page>
      </Theme.Provider>
    )
  }
}

const Page = (props) => {
  const ctx = useContext(Theme)
  const className = cxs(ctx.page)
  return (
    <Base id="page" className={className}>
      <div>
        <a href="#" onclick={props.toggle}>Global</a>
      </div>
      {props.children}
    </Base>
  )
}


class Link extends Component {
  constructor(props) {
    super(props)
    this.change = this.change.bind(this)
    this.state = {
      color: "red"
    }
  }

  change(e) {
    e.preventDefault()
    const c = this.state.color == "red" ? "green" : "red"
    this.setState({color:c})
  }

  render() {
    const ctx = useContext(Theme)
    let style = {...ctx.link}
    style.color = this.state.color
    style.backgroundColor = this.state.color == "red" ? "yellow" : style.backgroundColor
    const className = cxs(style)
    return (
      <Base className={className}>
        <a href="#" className={className} onclick={this.change}>Local</a>
      </Base>
    )
  }
}

export default Debug

// import { h, Component, createContext, createElement, createRef } from "preact"
// import { useContext } from "preact/compat"
// import cxs from "cxs/component"
// // import ThemeProvider from "cxs/ThemeProvider"
// 
// const lightTheme = {
//   inner:{backgroundColor:"red",display:"block",height:"300px"},
//   outer:{backgroundColor:"yellow",display:"block",height:"100vh"},
// }
// 
// const darkTheme = {
//   inner:{backgroundColor:"darkred",display:"block",height:"300px"},
//   outer:{backgroundColor:"orange",display:"block",height:"100vh"},
// }
// 
// const ThemedComponent = (props) => {
//   return (
//     <Theme.Consumer>{props.children}</Theme.Consumer>
//   )
// }
// 
// const InnerStyled = cxs(ThemedComponent)(function(props) {
//   return props.theme.inner
// })
// 
// const OuterStyled = cxs(ThemedComponent)(function(props) {
//   return props.theme.outer
// })
// 
// 
// class Inner extends Component {
//   constructor(props) {
//     super(props)
//     // this.ref = createRef()
//   }
//   render() {
//     // console.log("Inner render called")
//     // console.log(this.context.theme.inner)
//     // console.log(this.context.theme.outer)
//     // console.log(this.props)
//     return (
//       <InnerStyled {...this.props}>
//         <a href="#" style={{color:this.props.col}} onclick={this.props.action()}>Should not affect theme</a>
//       </InnerStyled>
//     )
//   }
// }
// 
// 
// class Outer extends Component {
//   constructor(props) {
//     super(props)
//     // this.innerAction = this.innerAction.bind(this,this.context.theme)
//     this.state = {
//       col: "white"
//     }
//   }
//   innerAction(e) {
//     console.log("Inner action called:")
//     console.log(e)
//     this.setState({col: this.state.col == "white" ? "black" : "white" })
//   }
//   render(props) {
//     // console.log("Outer render called")
//     // console.log(this.context.theme.inner)
//     // console.log(this.context.theme.outer)
//     return (
//       <OuterStyled {...props}>
//         <Inner col={this.state.col} action={ () => this.innerAction.bind(this,this.context.theme) } />
//       </OuterStyled>
//     )
//   }
// }
// 
// // class Debug extends Component {
// //   constructor(props) {
// //     super(props)
// //     this.toggleTheme = this.toggleTheme.bind(this)
// //     this.state = {
// //       useDarkTheme: false
// //     }
// //   }
// //   toggleTheme() {
// //     this.setState({useDarkTheme:!this.state.useDarkTheme})
// //   }
// //   render(props) {
// //     const theme = this.state.useDarkTheme ? darkTheme : lightTheme
// //     return (
// //       <div>
// //         <div style={{display:"block",top:"0",height:"2rem"}}>
// //           <input style={{marginRight:"1rem"}} type="checkbox" onchange={this.toggleTheme} />
// //         </div>
// //         <Outer {...props} />
// //       </div>
// //     )
// //     // return (
// //     //   <ThemeProvider theme={theme}>
// //     //     <div style={{display:"block",top:"0",height:"2rem"}}>
// //     //       <input style={{marginRight:"1rem"}} type="checkbox" onchange={this.toggleTheme} />
// //     //     </div>
// //     //     <Outer {...props} />
// //     //   </ThemeProvider>
// //     // )
// //   }
// // }
// 
// export default Debug;
