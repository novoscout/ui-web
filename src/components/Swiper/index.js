import { h } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Swiper as _Swiper } from "ui-shared/components"

import { Theme } from "../../theme"


const Swiper = (props) => {
  const theme = useContext(Theme)

  const className = (theme.swiper || {}).frame
                  ? cxs(theme.swiper.frame)
                  : null
  // const innerClassName = (theme.swiper || {}).inner
  //                      ? cxs(theme.swiper.inner)
  //                      : null

  return (
    <_Swiper className={className} {...props}>
      {props.children}
    </_Swiper>
  )
}

export default Swiper
export { Swiper }
