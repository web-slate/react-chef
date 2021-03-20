function getSourceCode(appName, { sourceDir }) {
return `import React from 'react'

// Components.
import { ErrorHandler } from '@${appName}/${sourceDir.components}'

function App() {
  return (
    <>
      <ErrorHandler>
        <h1>Welcome to React Chef Slim App</h1>
      </ErrorHandler>
    </>
  )
}

export default App
`
}

module.exports = {
  getSourceCode,
};