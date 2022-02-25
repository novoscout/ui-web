import { h } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { View as _View } from "ui-shared/components"

import { Theme } from "../../theme"
import { getObjProp } from "../../helpers"


const View = (props) => {
  const theme = useContext(Theme)
  const className = (props.className ? (props.className + " ") : "")
        + (cxs(getObjProp(theme, props.themeItem) || {}) || "")
        || undefined

  // Remove conflicting props.
  const newProps = { ...props }
  delete(newProps.themeItem)
  delete(newProps.className)

  return (
    <_View
      className={className}
      {...newProps}>{props.children}</_View>
  )
}

export default View
export { View }
