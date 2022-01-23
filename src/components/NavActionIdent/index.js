import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Ident, NavAction } from ".."

import { Theme } from "../../theme"


class NavActionIdent extends Component {
  constructor(props) {
    super(props)
    this.handleIdent = this.handleIdent.bind(this)
  }

  handleIdent(e) {
    if (this.props.toggleModal) {
      this.props.toggleModal({visible:false})
    }
    if (this.props.handleIdent) {
      this.props.handleIdent()
    }
  }

  render() {
    const theme = useContext(Theme)
    const className = theme.navActionIdent
                    ? cxs(theme.navActionIdent)
                    : null

    return (
      <NavAction
        href={Ident.href}
        className={className}
        onclick={this.handleIdent}>
        <NavAction.Icon ariaLabel="Login/out">🔒</NavAction.Icon>
        <NavAction.Text>&nbsp;Login/out</NavAction.Text>
      </NavAction>
    )
  }
}

export default NavActionIdent
export { NavActionIdent }
