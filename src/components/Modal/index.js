import { h, Component, createContext } from "preact"
import { useContext } from "preact/compat"
import cxs from "cxs"

import { Modal as _Modal } from "ui-shared/components"

import { Theme } from "../../theme"
import { NavMenu } from ".."


const _ModalContext = createContext("modal")


class Modal extends Component {
  constructor(props) {
    super(props)
    this.showComponents = this.showComponents.bind(this)
    this.toggleListener = this.toggleListener.bind(this)
    this.state = { loading: true }
  }

  componentDidMount() {
    this.setState({loading:false})
  }

  toggleListener(e) {
    if (this.props.toggleModal && ((e || {}).target == this.base)) {
      this.props.toggleModal()
    }
  }

  showComponents(modalContext) {
    // FIXME Need to handle non-modal (i.e. non-mobile) nav menu!!
    if (modalContext.visible) {
      const opts = {
        capture: false,
        once: false,
        passive: false,
      }
      if (this.base) {
        this.base.addEventListener(
          "mouseup", this.toggleListener, opts
        )
        this.base.addEventListener(
          "pointerend", this.toggleListener, opts
        )
        this.base.addEventListener(
          "touchend", this.toggleListener, opts
        )
      }
      return (
        <NavMenu
          isInModal={true}
          share={this.props.share}
          toggleModal={this.props.toggleModal}
          chooseTheme={this.props.chooseTheme}
          detailLevelCallback={this.props.detailLevelCallback}
          />
      )
    } else {
      if (this.base) {
        this.base.removeEventListener(
          "mouseup", this.toggleListener
        )
        this.base.removeEventListener(
          "pointerend", this.toggleListener
        )
        this.base.removeEventListener(
          "touchend", this.toggleListener
        )
      }
    }
  }

  render() {
    if (this.state.loading) { return null }

    // Ignore some unnecessary items in new props.
    const { style:{}, ...newProps } = this.props

    const modalContext = useContext(_ModalContext)

    const theme = useContext(Theme)
    const className = modalContext.visible
          ? cxs(theme.modal || {})
          : cxs(theme.invisible || {})

    return (
      <_Modal
        id="modal"
        style={this.props.style}
        className={className}
        {...newProps}
        >
        { this.showComponents(modalContext) }
      </_Modal>
    )
  }
}

Modal.Context = _ModalContext


export default Modal
export { Modal }
