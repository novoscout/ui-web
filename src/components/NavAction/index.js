import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { TextLink } from "../TextLink"

import { Theme } from "../../theme"


const NavAction = (props) => {
  const theme = useContext(Theme)
  const className = theme.navAction ? String(cxs({...theme.navAction})) : null
  return (
    <TextLink
      className={(className || "") + " navAction"} {...props}>
      {props.children}
    </TextLink>
  )
}

export default NavAction
export { NavAction }
