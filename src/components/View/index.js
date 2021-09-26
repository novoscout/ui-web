import { h, createElement } from "preact"
import cxs from "cxs/component"

const _View = (props) => {
  let newProps = props
  const elem = (newProps.elem ? newProps.elem : "div").toLowerCase()

  // Remove items that otherwise will end up in HTML.
  delete newProps.elem
  return createElement(`${elem}`, newProps)
}

const View = cxs(_View)(function(props) {
  return {
    position: "relative",
  }
})

export default View
export { View }
