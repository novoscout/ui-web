import { h, Component } from "preact"
import { useContext } from "preact/compat"
import { Theme } from "../../theme"
import { View, Swiper as _Swiper } from "ui-shared/components"

import cxs from "cxs"

const Swiper = (props) => {
  const theme = useContext(Theme)
  const className = theme.swiper ? String(cxs({...theme.swiper})) : ""
  const innerClassName = cxs({
    height:"88%",
    maxHeight:"88%",
    width:"90%",
    margin:"4% auto auto auto",
    background:"yellow",
    overflowX:"auto",
    overflowY:"scroll"
  })
  return (
    <_Swiper className={className} {...props}>
      <View className={innerClassName}>
        { /* props.children */ }
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
        <View>HI!</View>
      </View>
    </_Swiper>
  )
}

export default Swiper
export { Swiper }
