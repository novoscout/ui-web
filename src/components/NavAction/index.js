import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { TextLink } from "../TextLink"

import { Theme } from "../../theme"


const NavAction = (props) => {
  const theme = useContext(Theme)
  const className = theme.navAction ? String(cxs({...theme.navAction})) : null
  return (
    <TextLink className={className}>{props.children}</TextLink>
  )
}

const _NavActionIcon = (props) => {
  const theme = useContext(Theme)
  const className = theme.navActionIcon ? String(cxs({...theme.navActionIcon})) : null
  return (
    <span role="img" aria-label={props.ariaLabel}>{props.children}</span>
  )
}

const _NavActionText = (props) => {
  const theme = useContext(Theme)
  const className = theme.navActionText ? String(cxs({...theme.navActionText})) : null
  return (
    <span className={className} aria-label={props.ariaLabel}>{props.children}</span>
  )
}

NavAction.Icon = _NavActionIcon
NavAction.Text = _NavActionText

export default NavAction
export { NavAction }
