function getSourceCode(appName) {
return `import React from 'react'
import { createRoot } from 'react-dom/client'
import '../../TwixtUI/react/dist/tailwind.css'

import App from './Home'

const container = document.getElementById('${appName}')
const root = createRoot(container)
root.render(<App />)
`
}

module.exports = {
  getSourceCode,
};