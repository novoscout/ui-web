import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { View } from "ui-shared/components"
import { Theme } from "../../theme"
import { storage } from "../../helpers"


class RangeSlider extends Component {
  constructor(props) {
    super(props)
    // this.storeValue = this.storeValue.bind(this)
    this.state = {
      value: undefined
    }
  }

  async storeValue(name,e) {
    if (! (e || {}).target) {
      return
    }
    await this.setState({value:e.target.value})
    storage.setItem(name,e.target.value)
    if (this.props.callback) {
      this.props.callback(e.target.value)
    }
  }

  render() {
    const theme = useContext(Theme)
    const className = cxs(theme.rangeSlider || {}) || null
    const classNameContainer = cxs(theme.rangeSliderContainer || {}) || null

    const theMax = this.props.max == 0 ? 0 : this.props.max ? this.props.max : 10
    const name = this.props.name || "range"

    // Ignore some unnecessary items in new props.
    const { id:{}, max:{}, min:{}, name:{}, step:{}, ...newProps } = this.props

    return (
      <View className={classNameContainer}>
        <input
          className={className}
          type="range"
          min={this.props.min || 0}
          max={theMax}
          step={this.props.step || 1}
          name={name}
          id={this.props.id || null}
          value={
            parseInt(
              this.state.value
                || storage.getItem(name)
                || Math.round(theMax / 2)
            )
          }
          oninput={this.storeValue.bind(this,name)}
          onchange={this.storeValue.bind(this,name)}
          {...newProps}
          />
        <label for={name}>
          <span style={{
                  display: "inline-block",
                  width: "30%",
                  textAlign: "left"
                }}>min</span>
          <span style={{
                  display: "inline-block",
                  width: "40%",
                  textAlign: "center"
                }}>{this.props.label}</span>
          <span style={{
                  display: "inline-block",
                  width: "30%",
                  textAlign: "right"
                }}>max</span>
        </label>
      </View>
    )
  }
}

export default RangeSlider
export { RangeSlider }
