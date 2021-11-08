import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { TextLink } from "ui-shared/components"

import { NavActionIdent, NavActionShare, NavActionTheme } from ".."
import { Theme } from "../../theme"


const _Inner = (props) => {
  return (
    <ul>
      <li><NavActionShare order={1} /></li>
      <li><NavActionIdent order={2} /></li>
      <li><NavActionTheme order={3} /></li>
    </ul>
  )
}

const NavMenu = (props) => {
  const theme = useContext(Theme)
  const className = theme.navMenu ? String(cxs({...theme.navMenu})) : null
  return (
    <div className={className} {...props}>
      <_Inner />
    </div>
  )
}

NavMenu.Inner = _Inner

export default NavMenu
export { NavMenu }
