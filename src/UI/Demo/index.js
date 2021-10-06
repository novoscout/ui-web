import { h, Component, createRef } from "preact"
import { useMemo, useContext } from "preact/compat"
import { Text, TextLink, View } from "ui-shared/components"
import { mergeDeep } from "ui-shared/lib"
import { Desk, Swiper } from "../../components"
import { Theme } from "../../theme"

import cxs from "cxs"

class Demo extends Component {
  constructor(props) {
    super(props)
    this.renderArticles = this.renderArticles.bind(this)
    this.articleSiblings = this.articleSiblings.bind(this)
    this.articleResetStyles = this.articleResetStyles.bind(this)
    this.state = {
      loading: true,
      articleGraph: [
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        [4,5,6]
      ]
    }
  }

  articleSiblings(e) {
    // FIXME This should probably be done with refs instead of DOM nodes.
    return Array(...this.base.parentNode.children).map( (i) => {
      if (this.base != i) { return i }
    }).filter((i) => { if (i) { return i } })
  }

  articleResetStyles(e) {
    this.base.style.transition = "all 0.3s ease-out"
    this.base.style.removeProperty("transform")
    this.articleSiblings(e).map( (s) => {
      s.style.removeProperty("transform")
    })
  }

  swipeShouldPreventDefault(coords) {
    return coords.xDelta > coords.yDelta
  }

  swipeStart(e) {
    this.base.style.removeProperty("transition")
  }

  swipeMove(elemRef,e,direction,pointerCoords) {
    console.log(direction)
    const reverseDirectionX = direction.left ? "" : "-"
    var current = 0
    const numberToShow = 5
    const siblings = this.articleSiblings(e)

    // FIXME This should probably be done with refs instead of DOM nodes.
    const rect = this.base.getClientRects()[0]
    const parentRect = this.base.parentNode.getClientRects()[0]

    // How far the swiped item has moved relative to its parent.
    const xEdgeDelta = rect.left > parentRect.left ? rect.left - parentRect.left : parentRect.left - rect.left

    // Limit the travel of each revealed page to 12px relative to each other.
    const xTravel = Math.min(12, (xEdgeDelta/numberToShow))

    siblings.slice(0,numberToShow).map( (s) => {
      current = current + 1
      s.style.transform =
        "translateX(" + reverseDirectionX + String((numberToShow - current) * xTravel) + "px)"
    })

    // FIXME is it efficient to remove the others from the DOM or something like that?
    // siblings.slice(numberToShow).map( (s) => {
    //   s.style = "display:none !important"
    // })

    this.base.style.transform =
      "translateX(" + String((pointerCoords.start.x - pointerCoords.x)*-1) + "px) "
  }

  swipeLeft(e) {
    this.articleResetStyles(e)
  }

  swipeRight(e) {
    this.articleResetStyles(e)
  }

  swipeCancel(e) {
    this.articleResetStyles(e)
  }

  swipeEnd(e) {
    this.articleResetStyles(e)
  }

  componentDidMount() {
    this.setState({loading:false})
  }

  renderArticles(theme) {
    const stackIndex = 0
    const stack = this.state.articleGraph[stackIndex]
    const zIndexStep = 10
    var zIndex = zIndexStep + (zIndexStep * stack.length)
    var brightness = 100
    return stack.map( (a) => {
      zIndex = zIndex - zIndexStep
      const ref = createRef()
      const cssAdjust = {
        filter: brightness > 0 ? "brightness(" + String(brightness) + "%)" : null,
        zIndex:zIndex
      }
      const classNameFrame = cxs(mergeDeep(
        {},
        cssAdjust,
        (theme.swiper || {}).frame || {}
      ))
      const classNameInner = cxs(mergeDeep(
        {},
        cssAdjust,
        (theme.swiper || {}).inner || {}
      ))

      brightness -= 10

      return (
        <Swiper
          ref={ref}
          className={classNameFrame}
          uniaxial={true}
          start={ () => this.swipeStart(ref) }
          end={ () => this.swipeEnd(ref) }
          cancel={ () => this.swipeCancel(ref) }
          // Spot the difference in the next two:
          move={ this.swipeMove.bind(this,ref) } 
          shouldPreventDefault={ this.swipeShouldPreventDefault.bind(this) }
          >
          <Swiper.Inner className={classNameInner}>
            <View>
              <Text>Article {a}.</Text>
            </View>
            <View>
              <Text>With a <TextLink>link</TextLink>.</Text>
            </View>
          </Swiper.Inner>
        </Swiper>
      )
    })
  }

  render() {
    if (this.state.loading) { return null }

    const theme = useContext(Theme)

    // Ensure articles are only generated when the
    // articleGraph changes or when the theme changes.
    const memoizedArticles = useMemo(
      () => this.renderArticles(theme),
      [ this.state.articleGraph, theme ]
    )

    return (
      <Desk>
        {memoizedArticles}
      </Desk>
    )
  }
}

export default Demo
export { Demo }
