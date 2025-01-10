function getSourceCode(appName) {
return `import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

const root = createRoot(container)
const container = document.getElementById('${appName}')
root.render(<App />)
`
}

module.exports = {
  getSourceCode,
};
