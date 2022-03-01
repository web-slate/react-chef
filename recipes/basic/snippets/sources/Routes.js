function getSourceCode(appName, { sourceDir, modules }) {
return `import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

// Block Components.
import { PageLoader } from '@/${sourceDir.businessLogic}'

// Utils.
import { RoutePaths } from '@/${sourceDir.utility}'

const SignInModule = React.lazy(() =>
  import(/* webpackChunkName: "${sourceDir.containers}/${modules.signIn}" */ './${sourceDir.containers}/${modules.signIn}')
)

const DashboardModule = React.lazy(() =>
  import(/* webpackChunkName: "${sourceDir.containers}/${modules.dashboard}" */ './${sourceDir.containers}/${modules.dashboard}')
)

const NotFoundModule = React.lazy(() =>
  import(/* webpackChunkName: "${sourceDir.containers}/${modules.notFound}" */ './${sourceDir.containers}/${modules.notFound}')
)

const RoutesComponent = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={RoutePaths.SignIn} exact element={SignInModule} />
        <Route path={RoutePaths.Dashboard} element={DashboardModule} />
        <Route path="*" element={<NotFoundModule />} />
      </Routes>
    </Suspense>
  )
}

export default RoutesComponent
`
}

module.exports = {
  getSourceCode,
};


