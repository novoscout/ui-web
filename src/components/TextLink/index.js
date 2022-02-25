import { h, Component } from "preact"
import { route } from "preact-router"

import { View } from ".."

class TextLink extends Component {
  handleOnClick(props,e) {
    if (props.force && props.href) {
      window.location.replace(props.href)
      return
    } else {
      if (e) {
        if (props.preventDefault != false) {
          if (e.stopImmediatePropagation) { e.stopImmediatePropagation() }
          if (e.stopPropagation) { e.stopPropagation() }
          e.preventDefault()
        }
      }
      if (props) {
        if (props.onClick) { props.onClick() }
        if (props.href && props.preventDefault != false) {
          if (props.replaceHistory) {
            route(props.href, true)
          } else {
            route(props.href)
          }
        }
      }
    }
  }

  render() {
    // Ignore some unnecessary items in new props.
    const { href, onClick, ...newProps } = this.props

    return (
      <View
        elem="a"
        themeItem="textLink"
        onClick={this.handleOnClick.bind(this,this.props)}
        href={this.props.href}
        {...newProps}>{this.props.children}</View>
    )
  }
}

export default TextLink
export { TextLink }
