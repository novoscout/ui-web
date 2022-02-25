import { h } from "preact"

import { View } from ".."


const NavTitle = (props) => {
  return (
    <View elem="h1" themeItem="navTitle">{props.children}</View>
  )
}

export default NavTitle
export { NavTitle }
