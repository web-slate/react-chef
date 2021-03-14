const shell = require('shelljs')
const { getWebPackConfig } = require('./webpack.config')
const rootIndex = require('./sources/index')
const rootApp = require('./sources/App')
const rootRoutes = require('./sources/Routes')

const sourceCodes = {
  'index.js': rootIndex,
  'App.js': rootApp,
  'Routes.js': rootRoutes,
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
