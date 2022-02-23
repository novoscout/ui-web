import { h } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Theme } from "../../theme"
import { TextInput as _TextInput } from "ui-shared/components"

const TextInput = (props) => {
  const theme = useContext(Theme)
  const className = theme.input
        ? cxs(theme.input)
        : null

  // Ignore some unnecessary items in new props.
  const { href, onClick, ...newProps } = props

  return (
    <_TextInput
      type="text"
      className={className}
      {...newProps}>{props.children}</_TextInput>
  )
}

export default TextInput
export { TextInput }
