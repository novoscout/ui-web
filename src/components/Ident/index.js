import { h } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Ident as _Ident } from "ui-shared/components"

import { TextLink } from ".."
import { Theme } from "../../theme"


const Ident = (props) => {
  const newProps = {...props}
  delete(newProps.path)
  delete(newProps.url)

  const theme = useContext(Theme)
  const className = theme.ident ? cxs(theme.ident) : null

  return (
    <_Ident
      id="ident"
      className={className}
      {...newProps}>
      <TextLink href="/">Oh!</TextLink>
    </_Ident>
  )
}

Ident.href = "/id"

export default Ident
export { Ident }
