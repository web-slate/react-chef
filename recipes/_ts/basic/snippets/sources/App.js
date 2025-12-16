function getSourceCode(appName, { sourceDir }) {
  return `import React, { FC } from 'react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'

import Routes from './Routes'

// Block Components
import { ErrorHandler, PageLoader } from '@/components/blocks'

import { withTranslation } from '@/${sourceDir.i18n}'

const browserHistory = createBrowserHistory()

interface AppProps extends WithTranslation {}

function App(props: AppProps) {
  return (
    <ErrorHandler>
      <PageLoader />
      <HistoryRouter history={browserHistory}>
        <Routes />
      </HistoryRouter>
    </ErrorHandler>
  )
}

export default withTranslation(App)

`
}

module.exports = {
  getSourceCode,
};