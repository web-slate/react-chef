const shell = require('shelljs')
const { getWebPackConfig } = require('./webpack.config')
const rootIndex = require('./sources/index')
const rootApp = require('./sources/App')
const rootRoutes = require('./sources/Routes')
const withI18n = require('./sources/withI18n')
const signInModule = require('./sources/SignIn')
const dashboardModule = require('./sources/Dashboard')
const pageLoaderBlock = require('./sources/PageLoader')
const sidebarBlock = require('./sources/Sidebar')
const topBarBlock = require('./sources/TopBar')

const sourceCodes = {
  'index.js': rootIndex,
  'App.js': rootApp,
  'Routes.js': rootRoutes,
  'withI18n.js': withI18n,
  'SignIn.js': signInModule,
  'Dashboard.js': dashboardModule,
  'PageLoader.js': pageLoaderBlock,
  'Sidebar.js': sidebarBlock,
  'TopBar.js': topBarBlock,
}

const getFileContent = (fileName) => {
  return shell.cat(`${__dirname}/${fileName}`)
}

const getDynamicSourceCode = (fileName, appName, baseConfig) => {
  const { getSourceCode } = sourceCodes[fileName]
  return getSourceCode(appName, baseConfig)
}
module.exports = {
  getFileContent,
  getWebPackConfig,
  getDynamicSourceCode,
}
