import { h, Component, createContext } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Modal as _Modal } from "ui-shared/components"

import mergeDeep from "../../helpers/mergeDeep"
import { Theme } from "../../theme"
import { NavMenu } from ".."


const _ModalContext = createContext("modal")


class Modal extends Component {
  constructor(props) {
    super(props)
    this.showComponents = this.showComponents.bind(this)
    this.state = { loading: true }
  }

  componentDidMount() {
    this.setState({loading:false})
  }

  showComponents(modalContext) {
    if (modalContext.visible) {
      return (
        <NavMenu
          isInModal={true}
          share={this.props.share}
          handleIdent={this.props.handleIdent}
          toggleModal={this.props.toggleModal}
          toggleTheme={this.props.toggleTheme}
          />
      )
    }
  }

  render() {
    if (this.state.loading) { return null }
    const newProps = {...this.props}
    delete(newProps.style)

    const modalContext = useContext(_ModalContext)

    const theme = useContext(Theme)
    const className = modalContext.visible
          ? String(cxs(theme.modal || {}))
          : String(cxs(theme.invisible || {}))

    return (
      <_Modal style={this.props.style} className={className} {...newProps}>
        { this.showComponents(modalContext) }
      </_Modal>
    )
  }
}

Modal.Context = _ModalContext


export default Modal
export { Modal }
