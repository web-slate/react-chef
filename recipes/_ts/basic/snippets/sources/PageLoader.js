function getSourceCode(appName, { sourceDir }) {
return `import React, { Fragment } from 'react'

// UI Components.
import { Spinner } from '@/components/ui'

interface PageLoaderProps {
  loading: boolean
}

export default function PageLoader({ loading }: PageLoaderProps) {
  return loading ? <Spinner /> : null
}

`

}

module.exports = {
  getSourceCode,
};