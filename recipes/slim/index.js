#! /usr/bin/env node

const program = require("commander");
const inquirer = require('inquirer');
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

if (!appName) {
  error('App name is mandatory to create your react dish!');
}

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
      log(chalk.green.underline.bold(`Installing ${moduleList.join(', ')} modules`))
      shell.exec(`npm i ${option} ${moduleList.join(' ')}`)
    } else {
      log(chalk.green.underline.bold(`execute ${moduleList} modules`))
      shell.exec(`${moduleList}`)
    }
  })
}

const baseConfig = getConfig()

tryAccess(baseDirPath)
  .then(() => {
    return shell.which('npm')
  })
  .then(() => {
    shell.mkdir(baseDirPath)
    shell.cd(appName)

    return shell.exec('npm init -y', { silent: true })
  })
  .then(() => {
    const babelConfigFileName = `.babelrc`
    createFile(babelConfigFileName, getFileContent(babelConfigFileName))

    createFile('webpack.config.js', getWebPackConfig(appName, baseConfig))

    return inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'eslint',
        message: 'do you want to add eslint?',
        default: true
      },
      {
        type: 'confirm',
        name: 'prettier',
        message: 'do you want to add prettier?',
        default: false
      },
      {
        type: 'confirm',
        name: 'husky',
        message: 'do you want to add husky which enables linting and prettier on pre-commit hook?',
        default: false
      },
      {
        type: 'confirm',
        name: 'hookForm',
        message: 'do you want to add react-hook-form?',
        default: false
      }
    ])
  })
  .then((answers) => {
    if (answers.eslint) {
      const eslintConfigFileName = `.eslintrc.json`
      createFile(eslintConfigFileName, getFileContent(eslintConfigFileName))
    }

    if (answers.prettier) {
      const prettierConfigFileName = `.prettierrc.json`
      createFile(prettierConfigFileName, getFileContent(prettierConfigFileName))
    }

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

    log(chalk.green.underline.bold('Installing App dependencies...'))
    const dependencyList = [
      ...getModulesList(),
      ...(answers.hookForm ? ['form'] : []),
    ]
    moduleSetInstall('-S', dependencyList)

    log(chalk.green.underline.bold('Installing App dev dependencies...'))
    const devDependencyList = [
      ...getDevModulesList(),
      ...(answers.eslint ? ['eslint'] : []),
      ...(answers.prettier ? ['prettier'] : []),
      ...(answers.husky ? ['husky'] : []),
    ]
    moduleSetInstall('-D', devDependencyList)

    shell.cd('../../../../../')
    const packageFileContent = shell.cat('package.json')
    const packageFileObject = JSON.parse(packageFileContent);
    packageFileObject.scripts = {
      "dev": "webpack serve --mode development",
      "build": "webpack --mode production --progress",
      ...(answers.eslint ? {
        "lint": "eslint src --ext .js"
      } : {}),
      ...(answers.prettier ? {
        "prettier": "prettier --write src",
      } : {}),
      "clean": "rm -rf node_modules"
    }
    delete packageFileObject.main
    shell.rm('package.json')
    createFile('package.json', JSON.stringify(packageFileObject, null, 2))
  })
  .catch((e) => {
    error(e, true);
  })