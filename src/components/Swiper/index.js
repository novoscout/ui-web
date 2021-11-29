import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Swiper as _Swiper } from "ui-shared/components"

import { Theme } from "../../theme"


class Swiper extends Component {
  constructor(props) {
    super(props)
    this.start = this.start.bind(this)
    this.end = this.end.bind(this)
    this.move = this.move.bind(this)
    this.cancel = this.cancel.bind(this)
    this.resetStyles = this.resetStyles.bind(this)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.setState(function(state) {
      return { loading: false }
    })
  }

  siblings() {
    // FIXME This should probably be done with refs instead of DOM nodes
    // or be done by parent.
    return Array(...this.base.parentNode.children).map( (i) => {
      if (this.base != i) { return i }
    }).filter((i) => { if (i) { return i } })
  }

  resetStyles() {
    // this.base.style.transition = "all 0.2s ease-out"
    this.base.style.removeProperty("transform")
    this.base.style.removeProperty("border-left")
    this.base.style.removeProperty("border-right")
    this.siblings().map( (s) => {
      s.style.removeProperty("transform")
      s.style.removeProperty("border-left")
      s.style.removeProperty("border-right")
    })
  }

  start() {
    this.base.style.removeProperty("transition")
    this.base.style.borderLeft = "1px solid #888"
    this.base.style.borderRight = "1px solid #888"
    if (this.props && this.props.start) {
      this.props.start(this)
    }
  }

  end() {
    const delta = ((this.base.style || {}).transform || "0").match(/(\-?)\d+/)[0]
    if (this.props && this.props.end) {
      this.props.end(this,delta)
    }
    this.resetStyles()
  }

  move(coords) {
    const delta = (coords.start.x - coords.x)*-1
    if (delta < 1) {
      this.base.style.transform = "translateX(" + String(delta) + "px)"
    }
    if (this.props && this.props.move) {
      this.props.move(this,coords)
    }
  }

  cancel() {
    if (this.props && this.props.cancel) {
      this.props.cancel(this)
    }
    this.resetStyles()
  }

  shouldPreventDefault(coords) {
    if (this.props && this.props.shouldPreventDefault) {
      this.props.shouldPreventDefault(this,coords)
    }
  }

  render() {
    if (this.state.loading) { return null }
    const theme = useContext(Theme)

    const className = (theme.swiper || {}).frame
                    ? cxs(theme.swiper.frame)
                    : null
    // const innerClassName = (theme.swiper || {}).inner
    //                      ? cxs(theme.swiper.inner)
    //                      : null

    return (
      <_Swiper
        className={className}
        uniaxial={this.props && this.props.uniaxial}
        start={this.start}
        end={this.end}
        move={this.move}
        cancel={this.cancel}
        shouldPreventDefault={this.shouldPreventDefault}
        >
        {this.props.children}
      </_Swiper>
    )
  }
}

export default Swiper
export { Swiper }
