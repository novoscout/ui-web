import { h, Component } from "preact"
import cxs from "cxs"

class Outer extends Component {
  constructor(props) {
    super(props)
    this.handleSwipeStart = this.handleSwipeStart.bind(this)
    this.handleSwipeEnd = this.handleSwipeEnd.bind(this)
    this.handleSwipeCancel = this.handleSwipeCancel.bind(this)
    this.handleSwipeMove = this.handleSwipeMove.bind(this)
    this.addListeners = this.addListeners.bind(this)
    this.pointerCoords = this.pointerCoords.bind(this)
    this.removeListeners = this.removeListeners.bind(this)
    this.state = {
      isDragging: false,
      startDragThreshold: 20,
      coords: { x: 0, y: 0 },
      startCoords: { x: 0, y: 0 }
    }
  }

  pointerCoords(e) {
    // Find the pointerCoords within a touch or mouse event.
    return {
      x: e.clientX || e.changedTouches[0].clientX,
      y: e.clientY || e.changedTouches[0].clientY
    }
  }

  addListeners(_e) {
    this.base.addEventListener("mouseup", this.handleSwipeEnd, false)
    this.base.addEventListener("touchcancel", this.handleSwipeCancel, false)
    this.base.addEventListener("mousemove", this.handleSwipeMove, false)
    this.base.addEventListener("touchmove", this.handleSwipeMove, false)
  }

  removeListeners(_e) {
    this.base.removeEventListener("mouseup", this.handleSwipeEnd)
    this.base.removeEventListener("touchcancel", this.handleSwipeCancel)
    this.base.removeEventListener("mousemove", this.handleSwipeMove)
    this.base.removeEventListener("touchmove", this.handleSwipeMove)
  }

  handleSwipeStart(e) {
    // e.preventDefault()
    this.addListeners(e)
    this.base.style.transition = null
    /* eslint-disable prefer-arrow-callback, unused-imports/no-unused-vars */
    this.setState(function(state,props) {
      return {
        isDragging:true,
        startCoords: {
          x: e.clientX || e.changedTouches[0].clientX,
          y: e.clientY || e.changedTouches[0].clientY
        }
      }
    })
    /* eslint-enable prefer-arrow-callback, unused-imports/no-unused-vars */
  }

  handleSwipeEnd(e) {
    // e.preventDefault()
    this.removeListeners(e)
    this.base.style.transform = null
    this.base.style.transition = "all 0.3s ease-out"
    this.setState({isDragging:false})
  }

  handleSwipeCancel(e) {
    // e.preventDefault()
    this.removeListeners(e)
    this.base.style.transform = null
    this.base.style.transition = "all 0.3s ease-out"
    this.setState({isDragging:false})
  }

  handleSwipeMove(e) {
    const { x, y } = this.pointerCoords(e)
    const xDeltaSigned = this.state.startCoords.x - x
    const xDelta = xDeltaSigned < 0 ? xDeltaSigned * -1 : xDeltaSigned

    if (xDelta > this.state.startDragThreshold) {
      e.preventDefault()
      if (this.props.left) {
        if (xDeltaSigned > 0) {
          this.base.style.transform = "translateX(" + String(
            (((this.state.startCoords.x - x) - this.state.startDragThreshold) * -1)
          ) + "px)"
        }
      }
    }

    /* eslint-disable prefer-arrow-callback, unused-imports/no-unused-vars */
    this.setState(function(state,props) {
      return {
        coords: { x, y } // short-hand
      }
    })
    /* eslint-enable prefer-arrow-callback, unused-imports/no-unused-vars */
  }

  render() {
    const className = cxs({
      backgroundColor: "red",
      display: "block",
      height: "100vh",
      margin: 0,
      padding: "1rem",
      position: "absolute",
      width: "100vw",
    })
    return (
      <div
        onmousedown={this.handleSwipeStart}
        onmouseup={this.handleSwipeEnd}
        ontouchstart={this.handleSwipeStart}
        ontouchend={this.handleSwipeEnd}
        className={className}>{this.props.children}</div>
    )
  }
}

const Inner = () => {
  const className = cxs({
    backgroundColor: "yellow",
    display: "block",
    height: "90%",
    overflowY: "scroll",
    position: "relative",
    width: "100%",
    top: 0
  })
  return (
    <div className={className}>
      <ol style={{margin:0}}>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
        <li>Hi!</li>
      </ol>
    </div>
  )
}

const Whatever = () => {
  return (
    <Outer left={true}>
      <Inner />
    </Outer>
  )
}

export { Whatever }
export default Whatever

// // Debugging themes below.
// 
// const lightTheme = {
//   link: { backgroundColor: "pink" },
//   desk: { backgroundColor: "white", height:"100vh" }
// }
// 
// const darkTheme = {
//   link: { backgroundColor: "darkgreen" },
//   desk: { backgroundColor: "silver", height: "100vh" }
// }
// 
// const Theme = createContext(lightTheme)
// 
// const Base = (props) => {
//   return createElement("div", {...props})
// }
// 
// class Debug extends Component {
//   constructor(props) {
//     super(props)
//     this.toggle = this.toggle.bind(this)
//     this.state = {
//       useDarkTheme: false
//     }
//   }
// 
//   toggle(e) {
//     e.preventDefault()
//     this.setState({useDarkTheme:!this.state.useDarkTheme})
//   }
// 
//   render() {
//     console.log("Called Debug render")
//     const theme = this.state.useDarkTheme ? darkTheme : lightTheme
//     console.log(theme.desk)
//     console.log(theme.link)
//     return (
//       <Theme.Provider value={theme}>
//         <Desk toggle={this.toggle}>
//           <Link />
//         </Desk>
//       </Theme.Provider>
//     )
//   }
// }
// 
// const Desk = (props) => {
//   const ctx = useContext(Theme)
//   const className = cxs(ctx.desk)
//   return (
//     <Base id="desk" className={className}>
//       <div>
//         <a href="#" onClick={props.toggle}>Global</a>
//       </div>
//       {props.children}
//     </Base>
//   )
// }
// 
// 
// class Link extends Component {
//   constructor(props) {
//     super(props)
//     this.change = this.change.bind(this)
//     this.state = {
//       color: "red"
//     }
//   }
// 
//   change(e) {
//     e.preventDefault()
//     const c = this.state.color == "red" ? "green" : "red"
//     this.setState({color:c})
//   }
// 
//   render() {
//     const ctx = useContext(Theme)
//     let style = {...ctx.link}
//     style.color = this.state.color
//     style.backgroundColor = this.state.color == "red" ? "yellow" : style.backgroundColor
//     const className = cxs(style)
//     return (
//       <Base className={className}>
//         <a href="#" className={className} onClick={this.change}>Local</a>
//       </Base>
//     )
//   }
// }


// // Ehm some other previous debugging below!
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
//         <a href="#" style={{color:this.props.col}} onClick={this.props.action()}>Should not affect theme</a>
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
