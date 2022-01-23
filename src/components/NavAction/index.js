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
  const handleClick = props.onclick || props.onClick || null
  return (
    <TextLink href={props.href} onClick={handleClick} className={className}>
      {props.children}
    </TextLink>
  )
}

const _NavActionIcon = (props) => {
  const theme = useContext(Theme)
  const className = theme.navActionIcon
                  ? cxs(theme.navActionIcon)
                  : null
  const role = props.role || "img"
  return (
    <span className={className} aria-label={props.ariaLabel} role={role} {...props}>
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
    <span className={className} {...props}>
      {props.children}
    </span>
  )
}

NavAction.Icon = _NavActionIcon
NavAction.Text = _NavActionText

export default NavAction
export { NavAction }
