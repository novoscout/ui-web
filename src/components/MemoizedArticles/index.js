import { h } from "preact"
import { useMemo } from "preact/compat"

import { View } from "ui-shared/components"

const MemoizedArticles = (props) => {
  // The doi prop is inserted by preact-router, in the Desk component.
  const doi = (props || {}).doi

  // Ensure articles are only generated when necessary.
  const memoizedArticles = useMemo(
    () => { return props.renderCallback(doi) },
    props.renderChecks
  )

  return (
    <View style={{height:"100%"}}>
      {memoizedArticles}
    </View>
  )
}

export default MemoizedArticles
export { MemoizedArticles }
