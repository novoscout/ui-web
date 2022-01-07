import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Ident, NavAction } from ".."

import { Theme } from "../../theme"


class NavActionShare extends Component {
  constructor(props) {
    super(props)
    this.handleShare = this.handleShare.bind(this)
  }

  handleShare(e) {
    if (window.location.pathname.toLowerCase().startsWith(Ident.href)) { return }
    if (this.props.toggleModal) {
      this.props.toggleModal({visible:false})
    }
    alert("If you're sharing this with a colleague, consider: How is this relevant to clinical practise? Have you critically evaluated the paper's findings?")
    navigator.share({
      title: "OsteoScout",
      text: "",
      url: window.location.href
    },{
      copy: true,
      email: true,
      print: true,
      sms: true,
      messenger: true,
      facebook: true,
      whatsapp: true,
      twitter: true,
      linkedin: true,
      telegram: false,
      skype: false,
      pinterest: false,
      language: 'en'
    })
    // .then( _ => console.log('Yay, you shared it :)'))
    // .catch( error => console.log('Oh noh! You couldn\'t share it! :\'(\n', error));
  }

  render() {
    const theme = useContext(Theme)
    const className = theme.navActionShare
                    ? cxs(theme.navActionShare)
                    : null

    return (
      <NavAction  className={className}>
        <NavAction.Icon ariaLabel="Share">🔗</NavAction.Icon>
        <NavAction.Text
          href={null}
          onclick={this.handleShare}>&nbsp;Share</NavAction.Text>
      </NavAction>
    )
  }
}

export default NavActionShare
export { NavActionShare }
