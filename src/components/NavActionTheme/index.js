import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { NavAction } from "../NavAction"

import { Theme } from "../../theme"


class NavActionTheme extends Component {
  constructor(props) {
    super(props)
    this.handleChooseTheme = this.handleChooseTheme.bind(this)
  }

  handleChooseTheme() {
    if (this.props.toggleModal) {
      this.props.toggleModal({visible:false})
    }
    if (this.props.chooseTheme) {
      this.props.chooseTheme()
    }
  }
  
  render() {
    const theme = useContext(Theme)
    const className = theme.navActionTheme
                    ? cxs(theme.navActionTheme)
                    : null
    return (
      <NavAction className={className}>
        <NavAction.Icon ariaLabel="Choose day/night theme">🌗</NavAction.Icon>
        <NavAction.Text
          href={null}
          onclick={this.handleChooseTheme}>&nbsp;Day/night</NavAction.Text>
      </NavAction>
    )
  }
}

export default NavActionTheme
export { NavActionTheme }
