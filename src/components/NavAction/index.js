import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { TextLink } from ".."

import { Theme } from "../../theme"

// FIXME Better handling of onclick!!

const NavAction = (props) => {
  const theme = useContext(Theme)
  const className = theme.navAction
                  ? cxs(theme.navAction)
                  : null
  return (
    <span className={className}>
      {props.children}
    </span>
  )
}

const _NavActionIcon = (props) => {
  const theme = useContext(Theme)
  const className = theme.navActionIcon
                  ? cxs(theme.navActionIcon)
                  : null
  const role = props.role || "img"
  return (
    <span className={className} aria-label={props.ariaLabel} role={role}>
      {props.children}
    </span>
  )
}

const _NavActionText = (props) => {
  const theme = useContext(Theme)
  const className = theme.navActionText
                  ? cxs(theme.navActionText)
                  : null
  return (
    <TextLink className={className} aria-label={props.ariaLabel} {...props}>
      {props.children}
    </TextLink>
  )
}

NavAction.Icon = _NavActionIcon
NavAction.Text = _NavActionText

export default NavAction
export { NavAction }
