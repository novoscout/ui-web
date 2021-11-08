import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { NavAction } from "../NavAction"

import { Theme } from "../../theme"


class NavActionShare extends Component {
  constructor(props) {
    super(props)
    this.handleShare = this.handleShare.bind(this)
  }

  handleShare(e) {
    navigator.share({
      title: "OsteoScout",
      text: "Interesting article",
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
      telegram: true,
      skype: true,
      language: 'en'
    })
    // .then( _ => console.log('Yay, you shared it :)'))
    // .catch( error => console.log('Oh noh! You couldn\'t share it! :\'(\n', error));
  }

  render() {
    const theme = useContext(Theme)
    const className = theme.navActionShare ? String(cxs({...theme.navActionShare})) : null

    return (
      <NavAction onclick={this.handleShare} className={className} {...this.props}>
        <NavAction.Icon ariaLabel="Share">🔗</NavAction.Icon>
        <NavAction.Text>&nbsp;Share</NavAction.Text>
      </NavAction>
    )
  }
}

export default NavActionShare
export { NavActionShare }
