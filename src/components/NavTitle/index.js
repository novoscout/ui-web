import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Text } from "ui-shared/components"

import { Theme } from "../../theme"


const NavTitle = (props) => {
  const theme = useContext(Theme)
  const className = theme.navTitle ? String(cxs({...theme.navTitle})) : null
  return (
    <Text className={className} elem="h1">{props.children}</Text>
  )
}

export default NavTitle
export { NavTitle }
