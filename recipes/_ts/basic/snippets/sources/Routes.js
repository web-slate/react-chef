function getSourceCode(appName, { modules }) {
  return `import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

// Block Components
import { PageLoader } from '@/components/blocks'

// Utils
import { RoutePaths } from '@/utils'

// Lazy-loaded modules
const SignInModule = React.lazy(() =>
  import(/* webpackChunkName: "${modules.signIn}" */ '@/modules/${modules.signIn}')
)

const DashBoardModule = React.lazy(() =>
  import(/* webpackChunkName: "${modules.dashboard}" */ '@/modules/${modules.dashboard}')
)

const NotFoundModule = React.lazy(() =>
  import(/* webpackChunkName: "${modules.notFound}" */ '@/modules/${modules.notFound}')
)

const RoutesComponent: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={RoutePaths.SignIn} element={<SignInModule />} />
        <Route path={RoutePaths.DashBoard} element={<DashBoardModule />} />
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
}
