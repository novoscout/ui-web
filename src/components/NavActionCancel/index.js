import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { NavAction } from "../NavAction"

import { Theme } from "../../theme"


class NavActionCancel extends Component {
  constructor(props) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleCancel() {
    if (this.props.toggleModal) {
      this.props.toggleModal({visible:false})
    }
  }
  
  render() {
    const theme = useContext(Theme)
    const className = String(cxs(theme.navActionCancel || {}))

    return (
      <NavAction
        className={className}
        {...this.props}>
        <NavAction.Icon ariaLabel="Cancel" role="none"><b style={{color:"red",fontSize:"1.4em"}}>&times;</b></NavAction.Icon>
        <NavAction.Text
          href={null}
          onclick={this.handleCancel}
          >&nbsp;Cancel</NavAction.Text>
      </NavAction>
    )
  }
}

export default NavActionCancel
export { NavActionCancel }
