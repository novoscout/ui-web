import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { NavAction } from "../NavAction"

import { Theme } from "../../theme"

class NavActionPrint extends Component {
  constructor(props) {
    super(props)
    this.handlePrint = this.handlePrint.bind(this)
  }

  handlePrint() {
    if (this.props.toggleModal) {
      this.props.toggleModal({visible:false})
    }
    setTimeout((function(e) {
      self.print()
    }), 500)
  }

  render() {
    const theme = useContext(Theme)
    const className = String(cxs(theme.navActionPrint || {}))

    return (
      <NavAction
        className={className}
        {...this.props}>
        <NavAction.Icon ariaLabel="Print" role="none"><b style={{color:theme.text,fontSize:"1.4em"}}>&#128438;</b></NavAction.Icon>
        <NavAction.Text
          href={null}
          onclick={this.handlePrint}
          >&nbsp;Print</NavAction.Text>
      </NavAction>
    )
  }
}

export default NavActionPrint
export { NavActionPrint }
