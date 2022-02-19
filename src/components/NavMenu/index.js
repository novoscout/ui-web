import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { TextLink } from "ui-shared/components"

import { Theme } from "../../theme"

import { NavActionCancel, NavActionIdent, NavActionPrint, NavActionShare, NavActionTheme } from ".."
import { RangeSlider } from ".."

// import { lazyLoad } from "../../helpers/lazyLoad"
// var NavActionCancel = undefined;
// lazyLoad("NavActionCancel").then( m => { NavActionCancel = m.default })
// var NavActionIdent = undefined;
// lazyLoad("NavActionIdent").then( m => { NavActionIdent = m.default })
// var NavActionPrint = undefined;
// lazyLoad("NavActionPrint").then( m => { NavActionPrint = m.default })
// var NavActionShare = undefined;
// lazyLoad("NavActionShare").then( m => { NavActionShare = m.default })
// var NavActionTheme = undefined;
// lazyLoad("NavActionTheme").then( m => { NavActionTheme = m.default })


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
      { /* <li><NavActionCancel order={5} {...commonActions} /></li> */ }
      <li>
        <RangeSlider
          order={5}
          min={props.rangeMin || 1}
          max={props.rangeMax || 5}
          name="levelOfDetail"
        />
      </li>
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
