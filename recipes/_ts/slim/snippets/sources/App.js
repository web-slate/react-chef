function getSourceCode(appName, { sourceDir }) {
return `import React from 'react'

// Define the component's props interface for strict typing
interface AppProps {
  // Empty for a basic slim app, ready for extension
}

// Components.
import { ErrorHandler } from '@${appName}/${sourceDir.components}'

// Use React.FC<AppProps> for function component typing
const App: React.FC<AppProps> = () => {
  return (
    <ErrorHandler>
      <h1>Welcome to React Chef Slim TS App</h1>
      <p>This is the starting point for your new TypeScript recipe.</p>
    </ErrorHandler>
  )
}

export default App
`
}

module.exports = {
  getSourceCode,
};