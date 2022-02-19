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
    console.debug(name)
    console.debug(e.target.value)
  }

  render() {
    const theme = useContext(Theme)
    const className = cxs(theme.rangeSlider || {}) || null
    const classNameContainer = cxs(theme.rangeSliderContainer || {}) || null

    const theMin = this.props.min || 0
    const theMax = this.props.max || 10
    const name = this.props.name || "range"

    return (
      <View className={classNameContainer}>
        <input
          className={className}
          type="range"
          min={theMin}
          max={theMax}
          name={name}
          value={
            parseInt(
              this.state.value
                || storage.getItem(name)
                || Math.round(theMax / 2)
            )
          }
          oninput={this.storeValue.bind(this,name)}
          onchange={this.storeValue.bind(this,name)}
        />
      </View>
    )
  }
}

export default RangeSlider
export { RangeSlider }
