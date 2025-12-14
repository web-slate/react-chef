function getSourceCode(appName, { sourceDir }) {
  return `import React from 'react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { WithTranslation } from 'react-i18next'

import Routes from './Routes'

// Block Components
import { ErrorHandler, PageLoader } from './components/blocks'

import { withTranslation } from '@/${sourceDir.i18n}'

const browserHistory = createBrowserHistory()

interface AppProps extends WithTranslation {}

const App: React.FC<AppProps> = (props) => {
  return (
    <ErrorHandler>
      <PageLoader />
      <HistoryRouter history={browserHistory}>
        <Routes />
      </HistoryRouter>
    </ErrorHandler>
  )
}

export default withTranslation()(App)
`
}

module.exports = {
  getSourceCode,
};