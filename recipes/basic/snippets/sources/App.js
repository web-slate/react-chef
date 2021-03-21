function getSourceCode(appName, { sourceDir }) {
return `import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Routes from './Routes'

// Block Components.
import { ErrorHandler, PageLoader } from '@${appName}/${sourceDir.businessLogic}'

import { withTranslation } from '@${appName}/${sourceDir.i18n}'

const browserHistory = createBrowserHistory()

function App() {
  return (
    <>
      <ErrorHandler>
        <PageLoader />
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ErrorHandler>
    </>
  )
}

export default withTranslation(App)
`
}

module.exports = {
  getSourceCode,
};