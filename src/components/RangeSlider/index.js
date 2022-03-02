import { h, Component } from "preact"

import { View } from ".."
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
    // Ignore some unnecessary items in new props.
    const { id, max, min, name, step, ...newProps } = this.props
    const theMax = max == 0 ? 0 : max ? max : 10
    const theName = name || "range"

    return (
      <View themeItem="rangeSliderContainer">
        <View
          elem="input"
          themeItem="rangeSlider"
          type="range"
          min={this.props.min || 0}
          max={theMax}
          step={this.props.step || 1}
          name={theName}
          id={this.props.id || null}
          value={
            parseInt(
              this.state.value
                || storage.getItem(theName)
                || Math.round(theMax / 2)
            )
          }
          onInput={this.storeValue.bind(this,name)}
          onChange={this.storeValue.bind(this,name)}
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
