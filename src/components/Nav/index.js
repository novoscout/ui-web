import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { View } from "ui-shared/components"

import { Container, NavActionShare, NavActionTheme } from ".."
import { NavTitle } from "../NavTitle"
import { NavMenu } from "../NavMenu"
import { Theme } from "../../theme"
// import mq from "../../theme/common/mq"


class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.handleShare = this.handleShare.bind(this)
    this.handleToggleTheme = this.handleToggleTheme.bind(this)
  }

  handleShare(e) {
    if (this.props.share) {
      this.props.share()
    }
  }

  handleToggleTheme(e) {
    if (this.props.toggleTheme) {
      this.props.toggleTheme()
    }
  }

  componentDidMount() {
    this.setState({loading:false})
  }

  render() {
    if (this.state.loading) { return null }
    const theme = useContext(Theme)
    const className = theme.nav ? String(cxs({...theme.nav})) : null
    if (this.props.isOpen) {
      return (
        <View className={className} {...this.props}>
          <NavTitle>osteoscout</NavTitle>
          { /* <NavActionShare onClick={this.handleShare} /> */ }
          { /* <NavActionTheme onClick={this.handleToggleTheme} /> */ }
          <NavMenu/>
        </View>
      )
    }
    return (
      <View className={className} {...this.props}>
        <NavTitle>osteoscout</NavTitle>
        <NavMenu/>
      </View>
    )
  }
}

export default Nav
export { Nav }
