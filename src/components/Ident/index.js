import { h, Component, Fragment } from "preact"
import { useContext } from "preact/compat"
// import { route } from "preact-router"
import cxs from "cxs"

import { Ident as _Ident } from "ui-shared/components"

import { api } from "../../API"
import { TextLink } from ".."
import { Theme } from "../../theme"

const storage = require("../../helpers/storage")


class Ident extends Component {
  constructor(props) {
    super(props)
    this.forceLogout = this.forceLogout.bind(this)
    this.getNewPassphrase = this.getNewPassphrase.bind(this)
    this.choosePassphrase = this.choosePassphrase.bind(this)
    this.fixPassphrase = this.fixPassphrase.bind(this)
    this.state = {
      loading: true,
      passphrase: undefined,
      apikey: undefined
    }
  }

  forceLogout() {
    storage.removeItem("apikey")
    this.setState(function(state) {
      return {
        loading: true,
        passphrase: undefined,
        apikey: undefined
      }
    })
    if (window.location.pathname != "/doi/") {
      // window.location.replace("/doi/")
      route("/doi/",true)
    }
  }

  async getNewPassphrase() {
    var passphrase = undefined
    try {
      const getReg = await api.register()
      passphrase = getReg.passphrase
    } catch(err) {
      forceLogout()
      return // Quit!
    }
    this.setState({passphrase})
  }

  async componentDidMount() {
    var apikey = storage.getItem("apikey")
    if (! apikey) {
      await this.getNewPassphrase()
    }
    this.setState({
        apikey: apikey,
        loading: false
    })
  }

  choosePassphrase(theme) {
    const pairwise = (arr) => {
      return arr.reduce((result, value, index, sourceArray) => index % 2 === 0 ? [...result, sourceArray.slice(index, index + 2)] : result, [])
    }
    return (
      <p className={theme.passphrase ? cxs(theme.passphrase) : null}>
        {
          pairwise(
            this.state.passphrase.
                 split(" ").
                 filter( word => {
                   if (word) { return word }
                 })
          ).map((i) => {
            return <Fragment><span>{i.join(" ")}</span><br /></Fragment>
          })
        }
      </p>
    )
  }

  async fixPassphrase() {
    const getAPIKey = await api.getAPIKey(this.state.passphrase)
    const apikey = getAPIKey.apikey
    storage.setItem("apikey",apikey)
    this.setState({
      apikey: apikey,
      passphrase: null
    })
  }

  render() {
    if (this.state.loading) { return null }

    const newProps = {...this.props}
    delete(newProps.path)
    delete(newProps.url)

    const theme = useContext(Theme)
    const className = theme.ident ? cxs(theme.ident) : null

    const ID = (p) => {
      return (
        <_Ident id="ident" className={className} {...newProps}>{p.children}</_Ident>
      )
    }

    if (this.state.apikey) {
      return (
        <ID>
          <p style={{paddingTop:"2rem"}}>
            You can <TextLink href="/doi/">browse articles</TextLink> on OsteoScout and easily share them with your colleagues to discuss as part of your CPD.
          </p>
          <p>
            You can <TextLink>logout</TextLink> if you want, but if you do that, OsteoScout will no longer be able to recommend articles that relate to your interests, and will not be able to keep a record of articles you are reading for your CPD.
          </p>
        </ID>
      )
    } else {
      return (
        <ID>
          <p style={{paddingTop:"2rem",lineHeight:"1.3",textAlign:"left! important"}}>
            OsteoScout does not record any personal information about you. Instead, a unique, random phrase is assigned to each user. Your phrase lets you access your OsteoScout account from any device.
          </p>
          <p>
            Here is a brand-new phrase just for you:
          </p>
          { this.choosePassphrase(theme) }
          <p>
            Do you want to keep it?
          </p>
          <p>
            <button>No, I've already got one</button>
            <br />
            <button onclick={this.fixPassphrase}>Yes, I've written it down</button>
            <br />
            <button onclick={this.getNewPassphrase}>No, show me another</button>
          </p>
        </ID>
      )
    }
  }
}

Ident.href = "/id"

export default Ident
export { Ident }
