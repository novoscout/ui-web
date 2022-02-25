import { h } from "preact"

import { TextLink, View } from ".."


const NavAction = (props) => {
  return (
    <TextLink
      href={props.href}
      onClick={props.onClick}
      themeItem={props.themeItem || "navAction"}>{props.children}</TextLink>
  )
}

const _NavActionIcon = (props) => {
  return (
    <View
      elem="span"
      themeItem="navActionIcon"
      aria-label={props.ariaLabel}
      role={props.role || "img"}>{props.children}</View>
  )
}

const _NavActionText = (props) => {
  return (
    <View themeItem="navActionText">{props.children}</View>
  )
}

NavAction.Icon = _NavActionIcon
NavAction.Text = _NavActionText

export default NavAction
export { NavAction }
