import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { View } from "ui-shared/components"

import { NavTitle } from "../NavTitle"
import { Theme } from "../../theme"


class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    if (this.props.toggleTheme) {
      this.props.toggleTheme()
    }
  }

  componentDidMount() {
    this.setState({loading:false})
  }

  render() {
    const theme = useContext(Theme)
    const className = theme.nav ? String(cxs({...theme.nav})) : null
    return (
      <View
        onClick={this.handleClick}
        className={className} {...this.props}>
        <NavTitle>osteoscout</NavTitle>
      </View>
    )
  }
}

export default Nav
export { Nav }
