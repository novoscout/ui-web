import { h } from "preact"
import { useMemo } from "preact/compat"

import { View } from "ui-shared/components"

const MemoizedArticles = (props) => {
  // Ensure articles are only generated when necessary.

  // The doi prop is inserted by preact-router, in the Desk component.
  const doi = (props || {}).doi

  const checkIfUpdated = props.checkIfUpdated.filter( x => x )

  const memoizedArticles = useMemo(
    () => { return props.renderCallback(doi) },
    checkIfUpdated
  )

  return (
    <View style={{height:"100%"}}>
      {memoizedArticles}
    </View>
  )
}

export default MemoizedArticles
export { MemoizedArticles }
