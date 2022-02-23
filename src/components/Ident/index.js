import { h, Component, Fragment } from "preact"
import { createRef } from "preact/compat"
import { useContext } from "preact/compat"
import { route } from "preact-router"
import cxs from "cxs"

import { Ident as _Ident } from "ui-shared/components"
import { Button, Details, Summary, TextLink, TextInput } from ".."

import { Theme } from "../../theme"
import { storage } from "../../helpers/"
const api = require("../../API")


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
    this.toggleFormPurpose = this.toggleFormPurpose.bind(this)
    this.registerDetailsRef = createRef()
    this.state = {
      loading: true,
      apikey: null,
      username: undefined,
      passphrase: undefined,
      permit: undefined,
      submittingForm: false,
      formPurpose: "login"
    }
  }

  updateUsername(e) { this.setState({username:e.target.value}) }
  updatePassphrase(e) { this.setState({passphrase:e.target.value}) }
  updatePermit(e) { this.setState({permit:e.target.value}) }

  toggleFormPurpose(e) {
    const deets = ((this.registerDetailsRef || {}).current || {}).base || {}
    if (deets.hasOwnProperty("open")) {
      deets.setAttribute("open", ! deets["open"])
    }
    this.setState({
      formPurpose: this.state.formPurpose == "login" ? "register" : "login"
    })
  }

  handleForm(e) {
    e.preventDefault()
    // Yuck
    if (
      ((((e || {}).nativeEvent || {}).submitter || {}).name == "register") ||
      (((e || {}).submitter || {}).name == "register") ||
      (((e || {}).target || {}).name == "register") ||
      (this.state.formPurpose == "register")
    ) {
      this.register()
    } else {
      this.login()
    }
  }

  async login(o) {
    const { forceRefresh } = o || {}
    await this.setState({submittingForm:true})
    try {
      await api.login({
        username: this.state.username,
        passphrase: this.state.passphrase
      }).then( async (resp) => {
        if (typeof(resp) == "object" && "apikey" in resp) {
          await storage.setItem("apikey",resp["apikey"])
          await this.setState({
            apikey:resp["apikey"],
            submittingForm:false
          })
          if (forceRefresh) {
            window.location.replace("/id")
          }
        }
      })
    } catch(err) {
      this.setState({submittingForm:false})
      alert("Login failed, try again?")
    }
  }

  async register() {
    await this.setState({submittingForm:true})
    try {
      await api.register({
        username: this.state.username,
        passphrase: this.state.passphrase,
        permit: this.state.permit
      }).then( async (r) => {
        this.setState({submittingForm:false})
        await this.login() // {forceRefresh:true})
      })
    } catch(err) {
      this.setState({submittingForm:false})
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
    // Dance to ensure details/summary toggle register/login buttons
    // appear and disappear as expected.
    if (nextState.formPurpose != this.state.formPurpose) {
      return true
    }
    if (nextState.submittingForm != this.state.submittingForm) {
      return true
    }
    if (
      (nextState.username != this.state.username) ||
      (nextState.permit != this.state.permit) ||
      (nextState.passphrase != this.state.passphrase)
    ){
      return false
    }
    return true
  }

  async componentDidMount() {
    if (storage.getItem("apikey") && ! this.state.apikey) {
      await this.setState({
        apikey: storage.getItem("apikey")
      })
    }
    await this.setState({
      loading: false,
      submittingForm: false
    })
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

    const detailsOpen = this.state.formPurpose == "register" ? true : false

    if (this.state.apikey) {
      return (
        <ID>
          <p><h4 style={{textAlign:"center"}}>About OsteoScout</h4></p>
          <p>
            You can <TextLink onClick={this.forceRedirect}>browse articles</TextLink> and easily share them with your colleagues to discuss as part of your CPD.
          </p>
          <p>
            OsteoScout will remember you each time you visit, unless you <TextLink onClick={this.forceLogout}>logout</TextLink>.
          </p>
          <p><h4 style={{textAlign:"center",paddingTop:"1.5rem"}}>FAQ</h4></p>
          <Details>
            <Summary>What information does OsteoScout store about me?</Summary>
            <div>
              <p>Your username, and safely encrypted password.</p>
              <p>In order to keep track of articles that you find relevant, OsteoScout asks you to create an account and to login. The <u>only</u> information OsteoScout stores is your username, a safely encrypted version of your password. We don't store your IP address, and we don't use cookies (see below for more details). We also keep track of which articles you read so we can find further information that is relevant for you.</p>
              <p>About your password: Like any good website, we don't store the plain-text version of your password; we store a <u>securely encrypted</u> version of it instead. This means we can't know your password so we can't remind you of it if you lose it, so keep it safe!</p>
              <p>About IP addresses: Any computer on the internet (including the one you're reading this with, right now) is assigned an 'IP address' (IP stands for 'internet protocol'). The IP address may be temporary, or might be more permanent such as when using a computer in a workplace. Some web service providers collect the IP addresses of visitors. OsteoScout does not do this.</p>
              <p>About cookies: In internet parlance, a 'cookie' is a small piece of data that a website might send to your device. Your device stores the cookie, then sends it back when visiting the website. Cookies are typically used to track individuals, often for advertising purposes. OsteoScout does not use cookies.</p>
              <p>Even more about cookies: OsteoScout uses a third-party service called Cloudflare which may send you cookies. OsteoScout does not make use of these cookies.</p>
            </div>
          </Details>
        </ID>
      )
    } else {
      return (
        <ID>
          <form style={{textAlign:"center"}}>
            <h4>Login</h4>
            <p style={{textAlign:"initial"}}>Username:</p>
            <p>
              <TextInput
                disabled={this.state.submittingForm}
                onChange={this.updateUsername}
                value={this.state.username}
                style={{textAlign:"initial"}} /><br/>
            </p>
            <p style={{textAlign:"initial",marginTop:"1.2rem"}}>Password:</p>
            <p>
              <TextInput
                type="password"
                disabled={this.state.submittingForm}
                onChange={this.updatePassphrase}
                value={this.state.passphrase}
                style={{textAlign:"initial"}} /><br/>
            </p>

            <p style={{paddingTop:"1rem"}}>
              { this.state.formPurpose == "login" &&
                <Fragment>
                  <Button
                    disabled={this.state.submittingForm}
                    type="submit" name="login"
                    onClick={this.handleForm}>Login</Button>
                  <br/>
                  <Button
                    disabled={this.state.submittingForm}
                    onClick={ () => { window.history.go(-1); return false; } }>Cancel</Button>
                </Fragment>
              }
            </p>
            <Details
              open={detailsOpen}
              ref={this.registerDetailsRef}
              style={{display:"block",margin:"auto"}}>
              <Summary
                style={{display:"block",margin:"1.3rem auto"}}
                onClick={this.toggleFormPurpose}>No login? Create a new account.</Summary>
              <div style={{padding:"0 0 2rem 0"}}>
                <p style={{textAlign:"initial"}}>If you are registering as a new user, enter your '<i>permit</i>' here. <u>You also need to provide a username and password above</u> for your new account.</p>
                <p>
                  <TextInput
                    disabled={this.state.submittingForm}
                    onChange={this.updatePermit}
                    value={this.state.permit}
                    style={{textAlign:"initial"}}
                    placeholder="permit"
                  />
                </p>
                <p style={{paddingTop:"1rem"}}>
                  <Button
                    disabled={this.state.submittingForm}
                    name="register"
                    onClick={this.handleForm}>Register</Button>
                  <br/>
                  <Button
                    disabled={this.state.submittingForm}
                    onClick={ () => { window.history.go(-1); return false; } }>Cancel</Button>
                </p>
              </div>
            </Details>
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
