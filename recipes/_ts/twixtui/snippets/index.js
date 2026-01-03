const shell = require('shelljs')
const { getWebPackConfig } = require('./webpack.config')
const rootIndex = require('./sources/index')
const rootApp = require('./sources/App')

const sourceCodes = {
  index: rootIndex,
  App: rootApp,
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