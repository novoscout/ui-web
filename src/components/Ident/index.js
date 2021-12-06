import { h, Component, Fragment } from "preact"
import { useContext } from "preact/compat"
import { route } from "preact-router"
import cxs from "cxs"

import { Ident as _Ident } from "ui-shared/components"

import { TextLink } from ".."
import { Theme } from "../../theme"
import api from "../../API"

const storage = require("../../helpers/storage")


class Ident extends Component {
  constructor(props) {
    super(props)
    this.forceLogout = this.forceLogout.bind(this)
    this.getNewPassphrase = this.getNewPassphrase.bind(this)
    this.showNewPassphrase = this.showNewPassphrase.bind(this)
    this.fixPassphrase = this.fixPassphrase.bind(this)
    this.state = {
      loading: true,
      passphrase: null,
      apikey: null
    }
  }

  forceLogout() {
    storage.removeItem("apikey")
    this.setState(function(state) {
      return {
        loading: true,
        passphrase: null,
        apikey: null
      }
    })
    if (window.location.pathname != "/doi/") {
      // window.location.replace("/doi/")
      route("/doi/",true)
    }
  }

  async getNewPassphrase() {
    if (this.state.passphrase) {
      await this.setState({ passphrase: null })
    }
    var passphrase = null
    try {
      const getReg = await api.register()
      passphrase = getReg.passphrase
      await this.setState({ passphrase: passphrase })
    } catch(err) {
      this.forceLogout()
      return // Quit!
    }
  }

  shouldComponentUpdate(nextProps,nextState) {
    // Prevent glitchy re-rendering cause by calling getNewPassphrase in render(). Oops.
    if (nextState.loading) {
      return true
    }
    if (this.state.passphrase && ! nextState.passphrase) {
      return false
    }
    if (this.state.passphrase && nextState.passphrase) {
      return true
    }
  }

  componentDidMount() {
    this.setState({loading:false})
  }

  showNewPassphrase(theme) {
    // const pairwise = (arr) => {
    //   return arr.reduce((result, value, index, sourceArray) => index % 2 === 0 ? [...result, sourceArray.slice(index, index + 2)] : result, [])
    // }
    const SNP = (props) => {
      return <p className={theme.passphrase ? cxs(theme.passphrase) : null}>{props.children}</p>
    }
    if (! this.state.passphrase) { return <SNP/> }
    return (
      <SNP>
        {
          this.state.passphrase.split(" ").filter( word => {
            if (word) { return word }
          }).join(" ")
        }
      </SNP>
    )
  }

  forceRedirectToDOIs() {
    // FIXME Unsure why <a> and <TextLink> both fail to redirect the user??
    window.location.replace("/doi/")
  }

  async fixPassphrase() {
    const getAPIKey = await api.getAPIKey(this.state.passphrase)
    const apikey = getAPIKey.apikey
    if (apikey) {
      await storage.setItem("apikey",apikey)
      await this.setState({
        apikey: apikey,
        passphrase: null,
        loading: true
      })
      this.forceRedirectToDOIs()
    }
  }

  render() {
    if (this.state.loading) { return null }
    if ( ! this.state.passphrase) { this.getNewPassphrase() ; return null }

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
            You can <a onclick={this.forceRedirectToDOIs}>browse articles</a> on OsteoScout and easily share them with your colleagues to discuss as part of your CPD.
          </p>
          <p>
            If you <TextLink>logout</TextLink> OsteoScout will no longer be able to recommend articles that relate to your interests, and will not be able to keep a record of articles you are reading for your CPD. But you can always <TextLink>login</TextLink> again with your passphrase.
          </p>
        </ID>
      )
    } else {
      return (
        <ID>
          <p style={{paddingTop:"2rem",lineHeight:"1.3",textAlign:"left"}}>
            OsteoScout does not record any personal information about you. Instead, a unique, random phrase is assigned to each user. Your phrase lets you access your OsteoScout account from any device.
          </p>
          <p>
            Here is a brand-new phrase just for you:
          </p>
          { this.showNewPassphrase(theme) }
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
