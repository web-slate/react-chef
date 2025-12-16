function getSourceCode(appName) {
  return `import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

const container = document.getElementById('${appName}')

if (!container) {
  throw new Error('Root container not found')
}

const root = createRoot(container)
root.render(<App />)
`
}

module.exports = {
  getSourceCode,
};
