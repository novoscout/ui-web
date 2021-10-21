import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { NavAction } from "../NavAction"

import { Theme } from "../../theme"


const NavActionTheme = (props) => {
  const theme = useContext(Theme)
  const className = theme.navActionTheme ? String(cxs({...theme.navActionTheme})) : null
  return (
    <NavAction className={className} {...props}>
      <span role="img" aria-label="Toggle day/night theme">🌗</span>
      <span>&nbsp;Day/night</span>
    </NavAction>
  )
}

export default NavActionTheme
export { NavActionTheme }
