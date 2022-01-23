import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { TextLink } from "ui-shared/components"

import { NavActionCancel, NavActionIdent, NavActionPrint, NavActionShare, NavActionTheme } from ".."
import { Theme } from "../../theme"


const _Inner = (props) => {
  const commonActions = {
    toggleModal: props.toggleModal,
    chooseTheme: props.chooseTheme
  }
  return (
    <ul>
      <li><NavActionShare  order={1} {...commonActions} /></li>
      <li><NavActionIdent  order={2} {...commonActions} /></li>
      <li><NavActionPrint  order={3} {...commonActions} /></li>
      <li><NavActionTheme  order={4} {...commonActions} /></li>
      <li><NavActionCancel order={5} {...commonActions} /></li>
    </ul>
  )
}

const NavMenu = (props) => {
  // FIXME Try useContext(Modal.Context) to determine whether modal active?
  const theme = useContext(Theme)
  const className = props.isInModal
                  ? cxs(theme.navMenuModal || {}) || null
                  : cxs(theme.navMenu || {}) || null
  return (
    <div className={className}>
      <_Inner {...props} />
    </div>
  )
}

NavMenu.Inner = _Inner

export default NavMenu
export { NavMenu }
