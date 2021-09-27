import { h, Component, createElement } from "preact"

class View extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let newProps = {...this.props}
    const elem = (newProps.elem ? newProps.elem : "div").toLowerCase()

    newProps.position = newProps.position ? newProps.position : "relative"

    // Remove items that otherwise will end up in HTML.
    delete newProps.elem
    return createElement(`${elem}`, newProps)
  }
}

export default View
export { View }
