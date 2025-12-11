function getSourceCode(appName) {
return `import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

const container = document.getElementById('${appName}')

// TS Type Guard: Ensure the container exists before calling createRoot
if (!container) {
  throw new Error('Root element with ID "${appName}" not found in the HTML document.')
}

// React 18 createRoot
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`
}

module.exports = {
  getSourceCode,
};