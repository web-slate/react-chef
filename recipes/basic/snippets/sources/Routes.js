function getSourceCode(appName, { sourceDir, modules }) {
return `import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// Block Components.
import { PageLoader } from '@${appName}/${sourceDir.businessLogic}'

// Utils.
import { RoutePaths } from '@${appName}/${sourceDir.utility}'

const SignInModule = React.lazy(() =>
  import(/* webpackChunkName: "${sourceDir.containers}/${modules.signIn}" */ './${sourceDir.containers}/${modules.signIn}')
)
const DashboardModule = React.lazy(() =>
  import(/* webpackChunkName: "${sourceDir.containers}/${modules.dashboard}" */ './${sourceDir.containers}/${modules.dashboard}')
)

const Routes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={RoutePaths.SignIn} exact component={SignInModule} />
        <Route path={RoutePaths.Dashboard} component={DashboardModule} />
        <Redirect to={RoutePaths.NotFound} />
      </Switch>
    </Suspense>
  )
}

export default Routes
`
}

module.exports = {
  getSourceCode,
};


