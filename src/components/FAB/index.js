import { h, Component, Fragment } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { FAB as _FAB } from "ui-shared/components"

import { Theme } from "../../theme"


class FAB extends Component {
  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.state = {
      loading: true,
      expanded: false
    }
  }

  componentDidMount() {
    this.setState({loading:false})
  }

  handleToggle(o) {
    this.setState(function(state,props) {
      props.toggleModal && props.toggleModal()
      const ret = {expanded:( o || {}).expanded}
      return ret
    })
  }

  render() {
    if (this.state.loading) { return null }
    const theme = useContext(Theme)
    const className = this.state.expanded
          ? String(cxs(theme.fabExpanded || {}))
          : String(cxs(theme.fabCollapsed || {}))
    return (
      <_FAB
        handleToggle={this.handleToggle}
        className={className}
        {...this.props} />
    )
  }
}

export default FAB
export { FAB }
