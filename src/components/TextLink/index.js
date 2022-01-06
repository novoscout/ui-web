import { h, Component } from "preact"
import { useContext } from "preact/compat"
import { route } from "preact-router"
import cxs from "cxs"

import { Theme } from "../../theme"


class TextLink extends Component {
  handleOnClick(props,e) {
    if (props.force && props.href) {
      window.location.replace(props.href)
      return
    } else {
      if (e) {
        if (e.stopImmediatePropagation) { e.stopImmediatePropagation() }
        if (e.stopPropagation) { e.stopPropagation() }
        e.preventDefault()
      }
      if (props) {
        if (props.onClick) { props.onClick() }
        if (props.onclick) { props.onclick() }
        if (props.href) {
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
    const theme = useContext(Theme)
    const className = theme.textLink ? cxs(theme.textLink) : null
    var newProps = {...this.props}
    delete(newProps.href)
    delete(newProps.onClick)
    delete(newProps.onclick)
    return (
      <a
        onClick={this.handleOnClick.bind(this,this.props)}
        href={this.props.href}
        className={className}
        {...newProps}>{this.props.children}</a>
    )
  }
}

export default TextLink
export { TextLink }
