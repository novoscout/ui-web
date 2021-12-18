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
      loading: true,
      delay: undefined,
      startThreshold: undefined,
      endThreshold: undefined
    }
  }

  componentDidMount() {
    this.setState({
      loading: false,
      delay: this.props.delay || 0.1,
      startThreshold: this.props.startThreshold || 10,
      endThreshold: this.props.endThreshold || 30
    })
  }

  siblings() {
    // FIXME This should probably be done with refs instead of DOM nodes
    // or be done by parent.
    return Array(...this.base.parentNode.children).map( (i) => {
      if (this.base != i) { return i }
    }).filter((i) => { if (i) { return i } })
  }

  resetStyles(o) {
    const { onlySelf, onlySiblings } = o || {}
    if (! onlySiblings) {
      this.base.style.transition = "all " + this.state.delay + "s ease-out"
      this.base.style.removeProperty("transform")
      this.base.style.borderColor = "transparent"
      this.base.style.borderColor = "transparent"
    }
    if (! onlySelf) {
      this.siblings().map( (s) => {
        s.style.transition = "all " + this.state.delay + "s ease-out"
        s.style.removeProperty("transform")
        s.style.borderColor = "transparent"
        s.style.borderColor = "transparent"
      })
    }
  }

  start() {
    // FIXME Check if startThreshold has been reached.
    const delta = ((this.base.style || {}).transform || "0").match(/(\-?)\d+/)[0]
    this.base.style.removeProperty("transition")
    this.base.style.borderColor = "#888"
    this.base.style.borderColor = "#888"
    if (this.props && this.props.start) {
      this.props.start(this)
    }
  }

  end() {
    // FIXME Check if endThreshold has been reached.
    const ms = (this.state.delay * 1000) + 100
    const tr = ((this.base.style || {}).transform || "0").match(/(\-?)\d+/)
    const delta = tr[0]
    const sign = tr[1]
    // Reset styles only of siblings:
    this.resetStyles({onlySiblings:true})
    // Animate the swipe:
    this.base.style.transition = "all " + this.state.delay + "s ease-out"
    if (Math.abs(delta) > this.state.endThreshold) {
      this.base.style.transform = "translateX(" + sign + "340px)"
    } else {
      this.base.style.transform = "translateX(0)"
    }
    // After the swipe animation has finished, remove transitions etc
    // from this element, and call the end() func.
    const timeoutID = setTimeout(function(that,delta,timeoutID) {
      that.base.style.removeProperty("transition")
      that.base.style.removeProperty("transform")
      that.base.style.removeProperty("z-index")
      that.base.style.borderColor = "transparent"
      if (Math.abs(delta) > that.state.endThreshold) {
        if (that.props && that.props.end) {
          that.props.end(that,delta)
        }
      }
      clearTimeout(timeoutID)
    }, ms, this, delta, timeoutID)
  }

  move(coords) {
    const delta = (coords.start.x - coords.x) * -1
    if (delta < 0) {
      this.base.previousElementSibling.style.display = "none"
      this.base.nextElementSibling.style.display = "block"
    } else if (delta > 0) {
      this.base.previousElementSibling.style.display = "block"
      this.base.nextElementSibling.style.display = "none"
    }
    this.base.style.transform = "translateX(" + String(delta) + "px)"
    this.base.style.zIndex = this.base.style.zIndex || 0 + 10
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
        id={this.props.id}
        className={className}
        uniaxial={this.props.uniaxial}
        start={this.start}
        end={this.end}
        move={this.move}
        cancel={this.cancel}
        shouldPreventDefault={this.shouldPreventDefault}
        style={this.props.style}
        >
        {this.props.children}
      </_Swiper>
    )
  }
}

export default Swiper
export { Swiper }
