import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { NavAction } from "../NavAction"

import { Theme } from "../../theme"


class NavActionIdent extends Component {
  constructor(props) {
    super(props)
    this.handleIdent = this.handleIdent.bind(this)
  }

  handleIdent(e) {
    console.log(e)
  }

  render() {
    const theme = useContext(Theme)
    const className = theme.navActionIdent ? String(cxs({...theme.navActionIdent})) : null
    return (
      <NavAction className={className} onClick={this.handleIdent} className={className} {...this.props}>
        <NavAction.Icon ariaLabel="Login/out">🔒</NavAction.Icon>
        <NavAction.Text>&nbsp;Login/out</NavAction.Text>
      </NavAction>
    )
  }
}

export default NavActionIdent
export { NavActionIdent }
