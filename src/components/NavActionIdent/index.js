import { h } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { NavAction } from "../NavAction"

import { Theme } from "../../theme"


const NavActionIdent = (props) => {
  const theme = useContext(Theme)
  const className = String(cxs(theme.navActionIdent || {}))
  return (
    <NavAction onclick={props.handleIdent} className={className} {...props}>
      <NavAction.Icon ariaLabel="Login/out">🔒</NavAction.Icon>
      <NavAction.Text>&nbsp;Login/out</NavAction.Text>
    </NavAction>
  )
}

export default NavActionIdent
export { NavActionIdent }
