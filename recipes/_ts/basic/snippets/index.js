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
  index: rootIndex,
  App: rootApp,
  Routes: rootRoutes,
  withI18n: withI18n,
  SignIn: signInModule,
  Dashboard: dashboardModule,
  PageLoader: pageLoaderBlock,
  Sidebar: sidebarBlock,
  TopBar: topBarBlock,
 }


const getFileContent = (fileName) => {
  return shell.cat(`${__dirname}/${fileName}`)
}

const getDynamicSourceCode = (fileName, appName, baseConfig) => {
  const key = fileName.replace(/\.(js|ts|tsx)$/, '')
  const source = sourceCodes[key]

  if (!source) {
    throw new Error(`Source template not found: ${key}`)
  }

  return source.getSourceCode(appName, baseConfig)
}

module.exports = {
  getFileContent,
  getWebPackConfig,
  getDynamicSourceCode,
}
