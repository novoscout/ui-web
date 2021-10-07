import { h, Component } from "preact"
import { useContext } from "preact/compat"
import { Theme } from "../../theme"
import { Swiper as _Swiper } from "ui-shared/components"
import { mergeDeep } from "ui-shared/lib"

import cxs from "cxs"

const Swiper = (props) => {
  const theme = useContext(Theme)

  const className =
        cxs(mergeDeep({}, (theme.swiper || {}).frame || {}, props.style || {}))
  const innerClassName =
        cxs(mergeDeep({}, (theme.swiper || {}).inner || {}, props.style || {}))

  const newProps = props
  props.style && (newProps.style = undefined)

  return (
    <_Swiper className={className} {...newProps}>
      <_Swiper.Inner className={innerClassName}>
        {props.children}
      </_Swiper.Inner>
    </_Swiper>
  )
}

export default Swiper
export { Swiper }
