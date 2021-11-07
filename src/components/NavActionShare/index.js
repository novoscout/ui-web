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
    console.log(e)
  }

  render() {
    const theme = useContext(Theme)
    const className = theme.navActionShare ? String(cxs({...theme.navActionShare})) : null

    return (
      <NavAction onClick={this.handleShare} className={className} {...this.props}>
        <NavAction.Icon ariaLabel="Share">🔗</NavAction.Icon>
        <NavAction.Text>&nbsp;Share</NavAction.Text>
      </NavAction>
    )
  }
}

export default NavActionShare
export { NavActionShare }
