import { h, Component } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Theme } from "../../theme"
import { View } from "ui-shared/components"


const RangeSlider = (props) => {
  const theme = useContext(Theme)
  const className = cxs(theme.rangeSlider || {}) || null
  const classNameContainer = cxs(theme.rangeSliderContainer || {}) || null

  return (
    <View className={classNameContainer}>
      <input
        className={className}
        type="range"
        min={props.min || 1}
        max={props.max || 100}
        value={Math.round((props.max || 100) / 2)}
      />
    </View>
  )
}

export default RangeSlider
export { RangeSlider }
