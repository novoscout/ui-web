import { h } from "preact"

const Offline = (props) => {
  return (
    <div className="offline">
      {props.children}
    </div>
  )
}

export default Offline
export { Offline }
