import { h, Component } from "preact"
import { useContext } from "preact/compat"
import { Theme, lightTheme, darkTheme } from "../theme"

import { Demo } from "./Demo"


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
    this.setState(function(state,props) {
      return { darkTheme:!state.darkTheme }
    })
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
      await this.setState({loading: false})
      await doSW().then(m => m.registerServiceWorker())
    })()
  }

  render(props,state) {
    if (this.state.loading) { return <Loading /> }
    const theme = this.state.darkTheme ? darkTheme : lightTheme

    return (
      <Theme.Provider value={theme} >
        <Demo
          toggleTheme={this.toggleTheme}
        />
      </Theme.Provider>
    )
  }
}

export default UI
export { UI }
