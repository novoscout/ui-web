import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { TextLink } from "ui-shared/components"

import { Theme } from "../../theme"

import {
  NavActionCancel,
  NavActionIdent,
  NavActionPrint,
  NavActionShare,
  NavActionTheme,
  RangeSlider,
} from ".."

import api from "../../API"


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


const tempStyles = (theme, isInModal) => {
  const add = (e) => {
    const sliderDiv = e.target.parentElement.parentElement
    const menu = sliderDiv.parentElement
    menu.style.backgroundColor = "transparent"
    menu.style.borderColor = "transparent"
    menu.style.boxShadow = "none"
    sliderDiv.style = "box-shadow: 0 0 1px 1px rgba(0,0,0,0.3); background: " + theme.navMenuModal[" ul"].background + ";"
    menu.childNodes.forEach( (n) => {
      if (n != sliderDiv) {
        n.style = "opacity: 0"
      }
    })
  }

  const remove = (e) => {
    const sliderDiv = e.target.parentElement.parentElement
    const menu = sliderDiv.parentElement
    sliderDiv.style = undefined
    menu.style = undefined
    menu.childNodes.forEach( (n) => {
      if (n != sliderDiv) {
        n.style = undefined
      }
    })
  }

  return { add, remove }
}


const _Inner = (props) => {
  const theme = useContext(Theme)
  const commonActions = {
    toggleModal: props.toggleModal,
    chooseTheme: props.chooseTheme
  }
  return (
    <ul>
      <li><NavActionShare order={1} {...commonActions} /></li>
      <li><NavActionIdent order={2} {...commonActions} /></li>
      <li><NavActionPrint order={3} {...commonActions} /></li>
      <li><NavActionTheme order={4} {...commonActions} /></li>
      <li>
        <RangeSlider
          order={5}
          min={0}
          max={api.numLevelsOfDetail - 1}
          step={1}
          name="levelOfDetail"
          id="levelOfDetail"
          label="Detail"
          callback={props.detailLevelCallback}
          onmousedown={props.tempStyles.add}
          onpointerstart={props.tempStyles.add}
          ontouchstart={props.tempStyles.add}
          onmouseup={props.tempStyles.remove}
          onpointerend={props.tempStyles.remove}
          ontouchend={props.tempStyles.remove}
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

  const ts = tempStyles(theme, props.isInModal)

  return (
    <div className={className}>
      <_Inner {...props} tempStyles={ts} />
    </div>
  )
}

NavMenu.Inner = _Inner

export default NavMenu
export { NavMenu }
