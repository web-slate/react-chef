function getSourceCode(appName, { sourceDir }) {
return `import React, { Fragment } from 'react'

// UI Components.
import { Spinner } from '@/components/ui'

export default function PageLoader({ loading }) {
  // Add your business logic with store condition.
  return <Fragment>{loading && <Spinner />}</Fragment>
}
`
}

module.exports = {
  getSourceCode,
};