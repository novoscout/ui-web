import { h } from "preact"

import { View } from ".."

import { NavMenu, NavTitle } from ".."
import { Theme } from "../../theme"


const Nav = (props) => {
  return (
    <View id="nav" themeItem="nav">
      <NavTitle>osteoscout</NavTitle>
      <NavMenu {...props}/>
    </View>
  )
}

export default Nav
export { Nav }
