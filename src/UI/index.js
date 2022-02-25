import { h, Component } from "preact"
import { useContext } from "preact/compat"

import { Theme, lightTheme, darkTheme } from "../theme"
import { Demo } from "./Demo"
import { Loading } from "../components/"
import { storage } from "../helpers/"


class UI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      theme: undefined
    }
    this.chooseTheme = this.chooseTheme.bind(this)
  }

  async chooseTheme() {
    const theme = this.state.theme == "light" ? "dark" : "light"
    storage.setItem("theme",theme)
    await this.setState({ theme })
  }

  componentDidMount() {
    // Use import(...) to ensure code-splitting, followed by
    // awaits to ensure all are loaded before setting
    // state.loading to false.

    // const registerSW = () => {
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

      // await registerSW().then(m => m.registerServiceWorker())
      await this.setState({
        loading: false,
        theme: storage.getItem("theme") || "light"
      })
    })()
  }

  render(props,state) {
    if (this.state.loading) { return <Loading /> }
    const theme = this.state.theme == "light" ? lightTheme : darkTheme

    return (
      <Theme.Provider value={theme}>
        <Demo
          chooseTheme={this.chooseTheme}
          monitorForChange={[
            theme.desk.backgroundColor,
            theme.swiper.inner.backgroundColor,
          ]}
        />
      </Theme.Provider>
    )
  }
}

export default UI
export { UI }
