function getSourceCode(appName, { sourceDir }) {return `import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'

import Routes from './Routes'

// Block Components.
import { ErrorHandler, PageLoader } from './components/blocks'

import { withTranslation } from '@/${sourceDir.i18n}'

const browserHistory: History = createBrowserHistory()

const App: React.FC = () => {
  return (
    <ErrorHandler>
      <PageLoader />
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </ErrorHandler>
  )
}

export default withTranslation(App)
`
}

module.exports = {
  getSourceCode,
};