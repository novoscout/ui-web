import { h } from "preact"

const ErrorMessage = (props) => {
  return (
    <div style={{padding:"2rem 1rem 0 1rem"}}><h3>Error:</h3>{props.children}</div>
  )
}

export default ErrorMessage
export { ErrorMessage }
