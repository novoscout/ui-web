import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Swiper as _Swiper } from "ui-shared/components"

import { Theme } from "../../theme"


const Swiper = (props) => {
  const theme = useContext(Theme)

  const className =
        (theme.swiper || {}).frame ? String(cxs(theme.swiper.frame)) : null
  const innerClassName =
        (theme.swiper || {}).inner ? String(cxs(theme.swiper.inner)) : null

  const newProps = {...props}
  props.style && (newProps.style = null)

  return (
    <_Swiper style={props.style} className={className} {...newProps}>
      <_Swiper.Inner className={innerClassName}>
        {props.children}
      </_Swiper.Inner>
    </_Swiper>
  )
}

export default Swiper
export { Swiper }
