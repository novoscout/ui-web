import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { TextLink } from "ui-shared/components"

import { NavActionIdent, NavActionShare, NavActionTheme } from ".."
import { Theme } from "../../theme"


const NavMenu = (props) => {
  const theme = useContext(Theme)
  const className = theme.navMenu ? String(cxs({...theme.navMenu})) : null
  return (
    <div className={className} {...props}>
      <ul>
        <li><NavActionIdent /></li>
        <li><NavActionShare /></li>
        <li><NavActionTheme /></li>
      </ul>
    </div>
  )
}

export default NavMenu
export { NavMenu }
