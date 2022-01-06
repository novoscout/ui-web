import { h, Component, Fragment } from "preact"
import { useContext } from "preact/compat"
import { route } from "preact-router"
import cxs from "cxs"

import { Ident as _Ident } from "ui-shared/components"
import { TextInput } from ".."

import { Button, TextLink } from ".."
import { Theme } from "../../theme"

const api = require("../../API")
const storage = require("../../helpers/storage")


class Ident extends Component {
  constructor(props) {
    super(props)
    this.forceLogout = this.forceLogout.bind(this)
    this.forceRedirect = this.forceRedirect.bind(this)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.updateUsername = this.updateUsername.bind(this)
    this.updatePassphrase = this.updatePassphrase.bind(this)
    this.updatePermit = this.updatePermit.bind(this)
    this.handleForm = this.handleForm.bind(this)
    this.toggleFaqWhat = this.toggleFaqWhat.bind(this)
    this.state = {
      loading: true,
      apikey: null,
      username: undefined,
      passphrase: undefined,
      permit: undefined,
      submittingForm: false,
      faqWhatVisible: false
    }
  }

  updateUsername(e) { this.setState({username:e.target.value}) }
  updatePassphrase(e) { this.setState({passphrase:e.target.value}) }
  updatePermit(e) { this.setState({permit:e.target.value}) }

  toggleFaqWhat(e) {
    this.setState(function(state,props) {
      return {
        faqWhatVisible: ! state.faqWhatVisible
      }
    })
  }

  async handleForm(e) {
    e.preventDefault()
    await this.setState({submittingForm:true})
    if (this.state.permit) {
      try {
        await this.register()
      } catch(err) {
        alert("Registration failed, try again?")
      }
    } else {
      await this.login()
    }
    await this.setState({submittingForm:false})
  }

  async login() {
    try {
      const resp = await api.login({
        username: this.state.username,
        passphrase: this.state.passphrase
      })
      console.debug("Login response:",resp)
      if (typeof(resp) == "object" && "apikey" in resp) {
        await storage.setItem("apikey",resp["apikey"])
        await this.setState({
          apikey: resp["apikey"]
        })
      } else {
        alert("Login failed, try again?")
      }
    } catch(err) {
      alert("Log failed, try again?")
    }
  }

  async register() {
    try {
      const resp = await api.register({
        username: this.state.username,
        passphrase: this.state.passphrase,
        permit: this.state.permit
      })
    } catch(err) {
      alert("Registration failed, try again?")
    }
  }

  async forceLogout() {
    storage.removeItem("apikey")
    await this.setState({
      loading: true,
      apikey: null,
      username: undefined,
      passphrase: undefined,
      permit: undefined,
      submittingForm: false
    })
    window.location.replace("/id")
  }

  forceRedirect() {
    window.location.replace("/doi/")
  }

  shouldComponentUpdate(nextProps,nextState) {
    if (nextState.submittingForm != this.state.submittingForm) {
      return true
    }
    if (nextState.username || nextState.passphrase || nextState.permit) {
      return false
    }
  }

  async componentDidMount() {
    if (storage.getItem("apikey") && ! this.state.apikey) {
      await this.setState({
        apikey: storage.getItem("apikey")
      })
    }
    await this.setState({loading:false,submittingForm:false})
  }

  render() {
    const theme = useContext(Theme)
    if (this.state.loading || this.state.submittingForm) {
      return <div class="loading" style={{backgroundColor:theme.desk.backgroundColor}} />
    }

    const newProps = {...this.props}
    delete(newProps.path)
    delete(newProps.url)

    const className = theme.ident ? cxs(theme.ident) : null

    const ID = (p) => {
      return (
        <_Ident id="ident" className={className} {...newProps}>{p.children}</_Ident>
      )
    }

    if (this.state.apikey) {
      return (
        <ID>
          <p><h4 style={{textAlign:"center"}}>About OsteoScout</h4></p>
          <p>
            You can <TextLink onclick={this.forceRedirect}>browse articles</TextLink> and easily share them with your colleagues to discuss as part of your CPD.
          </p>
          <p>
            OsteoScout will remember you each time you visit, unless you <TextLink onclick={this.forceLogout}>logout</TextLink>.
          </p>
          <p><h4 style={{textAlign:"center",paddingTop:"1.5rem"}}>FAQ</h4></p>
          <ul style={{padding:"0 0 0 1rem"}}>
            <li><TextLink onclick={this.toggleFaqWhat}>What information does OsteoScout store about me?</TextLink></li>
          </ul>
          <div id="faq-what" style={{ display:this.state.faqWhatVisible ? "block" : "none" }}>
            <p>Your username, and safely encrypted password.</p>
            <p>In order to learn what articles are relevant to you, OsteoScout asks you to create an account and to login. The <u>only</u> information OsteoScout stores is your username. We don't even store your password, your IP address, and we don't use cookies. See below for more details.</p>
            <p>About your password: Like any good website, we don't store the plain-text version of your password; we store a <u>securely encrypted</u> version of it instead. This means we can't know your password so we can't remind you of it if you lose it, so keep it safe!</p>
            <p>About IP addresses: Any computer on the internet (including the one you're reading this with, right now) is assigned an 'IP address' (IP stands for 'internet protocol'). The IP address may be temporary, or might be more permanent such as when using a computer in a workplace. Some web service providers collect the IP addresses of visitors. OsteoScout does not do this.</p>
            <p>About cookies: In internet parlance, a 'cookie' is a small piece of data that a website might send to your device. Your device stores the cookie, then sends it back when visiting the website. Cookies are typically used to track individuals, often for advertising purposes. OsteoScout does not use cookies.</p>
            <p>Even more about cookies: OsteoScout uses a third-party service called Cloudflare which may send you cookies. OsteoScout does not make use of these cookies.</p>
          </div>
        </ID>
      )
    } else {
      return (
        <ID>
          <form onSubmit={this.handleForm} style={{textAlign:"center"}}>
            <p>Username:</p>
            <p>
              <TextInput
                disabled={this.state.submittingForm}
                onChange={this.updateUsername}
                value={this.state.username}
                style={{textAlign:"initial"}} /><br/>
            </p>
            <p>Passphrase:</p>
            <p>
              <TextInput
                type="password"
                disabled={this.state.submittingForm}
                onChange={this.updatePassphrase}
                value={this.state.password}
                style={{textAlign:"initial"}} /><br/>
            </p>
            <p>If you are creating a new user, enter your <i>permit</i> here:</p>
            <p>
              <TextInput
                disabled={this.state.submittingForm}
                onChange={this.updatePermit}
                value={this.state.permit}
                style={{textAlign:"initial"}} />
            </p>
            <p style={{paddingTop:"2rem"}}>
              <Button
                disabled={this.state.submittingForm}
                type="submit">OK</Button>
            </p>
            <p>
              <Button
                disabled={this.state.submittingForm}
                onclick={ () => { route("/") } }>Cancel</Button>
            </p>
          </form>
        </ID>
      )
    }
  }
}

Ident.href = "/id"
Ident.path = Ident.href

export default Ident
export { Ident }
