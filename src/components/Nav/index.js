import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { View } from "ui-shared/components"

import { NavMenu, NavTitle } from ".."
import { Theme } from "../../theme"


const Nav = (props) => {
  const theme = useContext(Theme)
  const className = theme.nav ? cxs(theme.nav) : null
  return (
    <View id="nav" className={className}>
      <NavTitle>osteoscout</NavTitle>
      <NavMenu {...props}/>
    </View>
  )
}

export default Nav
export { Nav }
