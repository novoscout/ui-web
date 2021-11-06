import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Text } from "ui-shared/components"

import { Theme } from "../../theme"


const NavTitle = (props) => {
  const theme = useContext(Theme)
  const className = theme.navTitle ? String(cxs({...theme.navTitle})) : null
  return (
    <div className={className} {...props}>
      <Text elem="h1">{props.children}</Text>
    </div>
  )
}

export default NavTitle
export { NavTitle }
