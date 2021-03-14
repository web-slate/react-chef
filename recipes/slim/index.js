#! /usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const fs = require("fs");
const shell = require("shelljs");

const { getConfig, getModulesList, getDevModulesList } = require("./config");
const { getFileContent, getWebPackConfig, getDynamicSourceCode } = require("./snippets");
const moduleMatrix = require('../moduleMatrix')
const log = console.log;

const error = (msg, canExit = true) => {
  console.error(chalk.white.bgRed(`Error: ${msg}`));
  canExit && process.exit();
};

const warning = chalk.keyword("orange");

const warn = (msg) => {
  console.warn(warning(`Warning: ${msg}`));
};

const lineCounter = ((i = 0) => () => ++i)();

program.option("-f, --app-name <value>", "App Name");

program.parse(process.argv);

// Create App Directory.
const appName = program.args[0];
const baseDirPath = `./${appName}`;

const tryAccess = (accessPath) => {
  return new Promise((resolve, reject) => {
    fs.access(accessPath, function (isAccessError) {
      const isGivenPathNotExist = isAccessError
      if (isGivenPathNotExist) {
        resolve()
      } else {
        console.error(
          `Sorry, unable to access the path: ${baseDirPath} which is already exist`
        );
        reject()
      }
    })
  })
}

const createFile = (fileNameWithPath, content) => {
  shell.touch(fileNameWithPath);
  shell.ShellString(`${content}`).to(fileNameWithPath);
}

const moduleSetInstall = async (option = '', moduleListArray = []) => {
  if (!option) {
    return
  }

  moduleListArray.forEach(moduleSet => {
    const moduleList = moduleMatrix[moduleSet]
    if (Array.isArray(moduleList)) {
      log(`Installing ${moduleList.join(', ')} modules`)
      shell.exec(`npm i ${option} ${moduleList.join(' ')}`)
    } else {
      log(`execute ${moduleList} modules`)
      shell.exec(`${moduleList}`)
    }
  })
}

const baseConfig = getConfig()

tryAccess(baseDirPath)
  .then(() => {
    shell.mkdir(baseDirPath)
    shell.cd(appName)

    const babelConfigFileName = `.babelrc`
    createFile(babelConfigFileName, getFileContent(babelConfigFileName))

    createFile('webpack.config.js', getWebPackConfig(appName, baseConfig))

    const eslintConfigFileName = `.eslintrc.json`
    createFile(eslintConfigFileName, getFileContent(eslintConfigFileName))

    const prettierConfigFileName = `.prettierrc.json`
    createFile(prettierConfigFileName, getFileContent(prettierConfigFileName))

    return shell.which('npm')
  })
  .then(() => {
    return shell.exec('npm init -y')
  })
  .then(() => {
    shell.mkdir(baseConfig.sourceDir.main)
    shell.cd(baseConfig.sourceDir.main)

    const indexFile = 'index.js'
    createFile(indexFile, getDynamicSourceCode(indexFile, appName, baseConfig))

    const AppFile = 'App.js'
    createFile(AppFile, getDynamicSourceCode(AppFile, appName, baseConfig))

    const RoutesFile = 'Routes.js'
    createFile(RoutesFile, getDynamicSourceCode(RoutesFile, appName, baseConfig))

    const sourceSnippetDir = `${__dirname}/snippets/sources`

    // Copy Utils.
    shell.cp('-Rf', `${sourceSnippetDir}/utils`, '.')

    // Copy Static.
    shell.cp('-Rf', `${sourceSnippetDir}/static`, '.')

    // Copy i18n.
    shell.cp('-Rf', `${sourceSnippetDir}/i18n`, '.')

    shell.cd(baseConfig.sourceDir.i18n)
    const withI18n = `withI18n.js`
    createFile(withI18n, getDynamicSourceCode(withI18n, appName, baseConfig))

    // Copy Modules.
    shell.cd('..')
    shell.cp('-Rf', `${sourceSnippetDir}/modules`, '.')

    shell.cd(`${baseConfig.sourceDir.containers}/${baseConfig.modules.signIn}`)
    const signInModule = 'SignIn.js'
    createFile(signInModule, getDynamicSourceCode(signInModule, appName, baseConfig))

    shell.cd(`../${baseConfig.modules.dashboard}`)
    const dashboardModule = 'Dashboard.js'
    createFile(dashboardModule, getDynamicSourceCode(dashboardModule, appName, baseConfig))

    // Copy Components.
    shell.cd('../../')
    shell.cp('-Rf', `${sourceSnippetDir}/components`, '.')

    const pageLoader = 'PageLoader'
    shell.cd(`${baseConfig.sourceDir.components}/${baseConfig.sourceDir.businessLogic}/Loader/${pageLoader}`)
    const pageLoaderBlock = `${pageLoader}.js`
    createFile(pageLoaderBlock, getDynamicSourceCode(pageLoaderBlock, appName, baseConfig))

    const sidebar = 'Sidebar'
    shell.cd(`../../Region/${sidebar}`)
    const sidebarBlock = `${sidebar}.js`
    createFile(sidebarBlock, getDynamicSourceCode(sidebarBlock, appName, baseConfig))

    const topBar = 'TopBar'
    shell.cd(`../../Region/${topBar}`)
    const topBarBlock = `${topBar}.js`
    createFile(topBarBlock, getDynamicSourceCode(topBarBlock, appName, baseConfig))

    log('Installing App dependencies...')
    moduleSetInstall('-S', getModulesList())

    log('Installing App dev dependencies...')
    moduleSetInstall('-D', getDevModulesList())

    shell.cd('../../../../../')
    const packageFileContent = shell.cat('package.json')
    const packageFileObject = JSON.parse(packageFileContent);
    packageFileObject.scripts = {
      "dev": "webpack serve --mode development",
      "lint": "eslint src --ext .js",
      "build": "webpack --mode production --progress",
      "prettier": "prettier --write src",
      "clean": "rm -rf node_modules"
    }
    shell.rm('package.json')
    createFile('package.json', JSON.stringify(packageFileObject, null, 2))
  })
  .catch((e) => {
    error('Error occurred: ', e);
  })