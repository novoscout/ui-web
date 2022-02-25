import { h } from "preact"
import { useContext } from "preact/compat"

import { Theme } from "../../theme"

import {
  NavActionCancel,
  NavActionIdent,
  NavActionPrint,
  NavActionShare,
  NavActionTheme,
  RangeSlider,
  View,
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
  const commonActions = {
    toggleModal: props.toggleModal,
    chooseTheme: props.chooseTheme
  }
  return (
    <ul>
      <li>
        <RangeSlider
          order={1}
          min={0}
          max={api.numLevelsOfDetail - 1}
          step={1}
          name="levelOfDetail"
          id="levelOfDetail"
          label="Detail"
          callback={props.detailLevelCallback}

          onMouseDown={props.tempStyles.add}
          onPointerStart={props.tempStyles.add}
          onTouchStart={props.tempStyles.add}

          onMouseUp={props.tempStyles.remove}
          onPointerEnd={props.tempStyles.remove}
          onTouchEnd={props.tempStyles.remove}
        />
      </li>
      <li><NavActionShare order={2} {...commonActions} /></li>
      <li><NavActionIdent order={3} {...commonActions} /></li>
      <li><NavActionPrint order={4} {...commonActions} /></li>
      <li><NavActionTheme order={5} {...commonActions} /></li>
    </ul>
  )
}

const NavMenu = (props) => {
  // FIXME Try useContext(Modal.Context) to determine whether modal active?
  const theme = useContext(Theme)
  const ts = tempStyles(theme, props.isInModal)
  return (
    <View themeItem={props.isInModal ? "navMenuModal" : "navMenu"}>
      <_Inner {...props} tempStyles={ts} />
    </View>
  )
}

NavMenu.Inner = _Inner

export default NavMenu
export { NavMenu }
