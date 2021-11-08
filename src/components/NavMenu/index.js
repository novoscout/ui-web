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
      <li><NavActionIdent order={2} handleIdent={props.handleIdent} /></li>
      <li><NavActionTheme order={3} toggleTheme={props.toggleTheme} /></li>
    </ul>
  )
}

const NavMenu = (props) => {
  const theme = useContext(Theme)
  const className = props.isInModal
        ? String(cxs(theme.navMenuModal))
        : String(cxs(theme.navMenu))
  return (
    <div className={className}>
      <_Inner {...props} />
    </div>
  )
}

NavMenu.Inner = _Inner

export default NavMenu
export { NavMenu }
