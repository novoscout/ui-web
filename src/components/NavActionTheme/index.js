import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { NavAction } from "../NavAction"

import { Theme } from "../../theme"


class NavActionTheme extends Component {
  constructor(props) {
    super(props)
    this.handleToggleTheme = this.handleToggleTheme.bind(this)
  }

  handleToggleTheme() {
    if (this.props.toggleModal) {
      this.props.toggleModal({visible:false})
    }
    if (this.props.toggleTheme) {
      this.props.toggleTheme()
    }
  }
  
  render() {
    const theme = useContext(Theme)
    const className = theme.navActionTheme
                    ? cxs(theme.navActionTheme)
                    : null
    return (
      <NavAction className={className}>
        <NavAction.Icon ariaLabel="Toggle day/night theme">🌗</NavAction.Icon>
        <NavAction.Text
          href={null}
          onclick={this.handleToggleTheme}>&nbsp;Day/night</NavAction.Text>
      </NavAction>
    )
  }
}

export default NavActionTheme
export { NavActionTheme }
