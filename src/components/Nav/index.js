import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { View } from "ui-shared/components"

import { NavTitle, NavMenu } from ".."
import { Theme } from "../../theme"


const Nav = (props) => {
  const theme = useContext(Theme)
  const className = theme.nav ? String(cxs({...theme.nav})) : null
  return (
    <View id="nav" className={className} {...props}>
      <NavTitle>osteoscout</NavTitle>
      <NavMenu/>
    </View>
  )
}

export default Nav
export { Nav }
