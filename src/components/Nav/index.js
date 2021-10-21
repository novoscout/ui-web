import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { View } from "ui-shared/components"

import { Container, NavActionShare, NavActionTheme } from ".."
import { NavTitle } from "../NavTitle"
import { Theme } from "../../theme"


class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    this.handleHideShow = this.handleHideShow(this)
    this.handleShare = this.handleShare.bind(this)
    this.handleToggleTheme = this.handleToggleTheme.bind(this)
  }

  handleHideShow(e) {
  }

  handleShare(e) {
    alert("Share!")
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
    return (
      <View className={className} {...this.props}>
        <Container>
          <NavTitle onClick={this.handleHideShow}>osteoscout</NavTitle>
          <NavActionShare onClick={this.handleShare} />
          <NavActionTheme onClick={this.handleToggleTheme} />
        </Container>
      </View>
    )
  }
}

export default Nav
export { Nav }
