function getSourceCode(appName) {
return `import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

import App from './App'

const container = document.getElementById('${appName}')
const root = createRoot(container)
root.render(<App />)
`
}

module.exports = {
  getSourceCode,
};