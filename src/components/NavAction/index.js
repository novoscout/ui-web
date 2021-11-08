import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { TextLink } from "../TextLink"

import { Theme } from "../../theme"

// FIXME Better handling of onclick!!

const NavAction = (props) => {
  const theme = useContext(Theme)
  const className = String(cxs(theme.navAction || {}))
  return (
    <TextLink className={className} onclick={props.onclick}>
      {props.children}
    </TextLink>
  )
}

const _NavActionIcon = (props) => {
  const theme = useContext(Theme)
  const className = String(cxs(theme.navActionIcon || {}))
  return (
    <span className={className} aria-label={props.ariaLabel} role="img">
      {props.children}
    </span>
  )
}

const _NavActionText = (props) => {
  const theme = useContext(Theme)
  const className = String(cxs(theme.navActionText || {}))
  return (
    <span className={className} aria-label={props.ariaLabel}>
      {props.children}
    </span>
  )
}

NavAction.Icon = _NavActionIcon
NavAction.Text = _NavActionText

export default NavAction
export { NavAction }
