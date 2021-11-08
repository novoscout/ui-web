import { h } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { NavAction } from "../NavAction"

import { Theme } from "../../theme"


const NavActionTheme = (props) => {
  const theme = useContext(Theme)
  const className = theme.navActionTheme ? String(cxs({...theme.navActionTheme})) : null
  return (
    <NavAction onclick={props.toggleTheme} className={className} {...props}>
      <NavAction.Icon ariaLabel="Toggle day/night theme">🌗</NavAction.Icon>
      <NavAction.Text>&nbsp;Day/night</NavAction.Text>
    </NavAction>
  )
}

export default NavActionTheme
export { NavActionTheme }
