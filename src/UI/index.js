import { h, render, Component } from "ui-shared/lib/react-preact"
import ThemeProvider from 'cxs/ThemeProvider'
import { Router } from "preact-router"

import FrontPage from "./FrontPage"

import theme from "../theme"

// Code-splitting and lazy-loading.
const doSW = () => {
  return import(
    /* webpackMode: "lazy", webpackChunkName: "helpers/registerServiceWorker" */
    "../helpers/registerServiceWorker")}

const Loading = () => {
  return (<div className="loading" />)
}

class UI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      darkTheme: false
    }
    this.toggleTheme = this.toggleTheme.bind(this)
  }

  toggleTheme() {
    this.setState({darkTheme:!this.state.darkTheme})
  }

  componentDidMount() {
    // Use import(...) to ensure code-splitting, followed by
    // awaits to ensure all are loaded before setting
    // state.loading to false.

    // const doSW = () => {
    //   return import(
    //     /* webpackMode: "lazy", webpackChunkName: "helpers/registerServiceWorker" */
    //     "../helpers/registerServiceWorker"
    //   )
    // }

    (async () => {
      // await ( async () => {
      //   if (condition) {
      //     await getComponent().then((m) => { whatever })
      //   }
      // })()
      await this.setState({themeLoading: false})
      await this.setState({loading: false})
      await doSW().then(m => m.registerServiceWorker())
    })()
  }

  render(props,state) {
    if (this.state.loading) { return <Loading /> }
    const _theme = this.state.darkTheme ? theme.dark : theme.light

    // FIXME Why is theme lost when sub-components re-render?? :(

    return (
        <ThemeProvider theme={_theme} >
        <div style={{
               display: "block",
               height: "2rem",
               position: "relative",
               top: "0",
               backgroundColor: "black",
               textAlign: "right"
             }}>
          <input style={{marginRight:"1rem"}} type="checkbox" onchange={this.toggleTheme} />
        </div>
        { /* <Router> */ }
        <FrontPage path="/" />
        { /* </Router> */ }
      </ThemeProvider>
    )
  }
}

export default UI
export { UI }
