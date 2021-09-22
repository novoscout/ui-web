import { h, createElement } from 'preact'
import cxs from 'cxs/component'

const _Base = (props) => {
  let newProps = props
  const elem = (newProps.elem ? newProps.elem : 'div').toLowerCase()

  // Remove items that otherwise will end up in HTML.
  delete newProps.elem
  return createElement(`${elem}`, newProps)
}

const Base = cxs(_Base)(function(props) {
  return {
    position: 'relative',
  }
})

export default Base
export { Base }
