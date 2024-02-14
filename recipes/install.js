#! /usr/bin/env node
const inquirer = require("inquirer");
const chalk = require("chalk");
const shell = require("shelljs");
const CFonts = require("cfonts");

const slimConfig = require("./slim/config");
const slimSnippet = require("./slim/snippets");
const basicConfig = require(`./basic/config`);
const basicSnippet = require(`./basic/snippets`);

//Twixt Config
const twixtUIConfig = require("./twixt-ui/config");
const twixtUISnippet = require("./twixt-ui/snippets");

const {
  log,
  error,
  createFile,
  tryAccess,
  moduleSetInstall,
  getTwixtUIIndexPath,
  getTwixtUIHomePath,
  getTwixtUIScripts
} = require("./utils");

const install = function(directory, appName = '') {
  CFonts.say("React Chef", {
    type: 5,
    font: "block", // define the font face
    align: "left", // define text alignment
    colors: ["system"], // define all colors
    background: "transparent", // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1, // define letter spacing
    lineHeight: 1, // define the line height
    space: true, // define if the output text should have empty lines on top and on the bottom
    maxLength: "0", // define how many character can be on one line
    gradient: false, // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: false, // define if this is a transition between colors directly
    env: "node", // define the environment CFonts is being executed in
  });

  let getConfig = slimConfig.getConfig;
  let getModulesList = slimConfig.getModulesList;
  let getDevModulesList = slimConfig.getDevModulesList;
  let getFileContent = slimSnippet.getFileContent;
  let getWebPackConfig = slimSnippet.getWebPackConfig;
  let getDynamicSourceCode = slimSnippet.getDynamicSourceCode;
  let baseConfig = getConfig();

  const baseDirPath = `./${appName}`;
  const defaultProjectType = 'slim';
  const twixtUIProjectType = 'twixtui';
  let projectType = defaultProjectType;
  const isSlimProject = (type) => type === defaultProjectType;
  const isTwixtUIProject = (type) => type === twixtUIProjectType;

  tryAccess(baseDirPath)
    .then(() => undefined, function onPathExist() {
      if(!directory){
        error(
          `Choose different App name. ${appName} is already exist in ${process.cwd()}`
        );
      }
      return true;
    })
    .then(() => {
      return inquirer.prompt([
        {
          type: "list",
          name: "projectType",
          message: "choose your project type",
          choices: ["Slim", "Basic", "TwixtUI"],
          default: "Slim",
        },
      ]);
    })
    .then((mainAnswer) => {
      projectType = mainAnswer.projectType.toLowerCase();
      log(`projectType: ${projectType}`);
      if(isTwixtUIProject(projectType)){

        log(`TwixtUI - projectType: ${projectType}`);
        getConfig = twixtUIConfig.getConfig;
        getModulesList = twixtUIConfig.getModulesList;
        getDevModulesList = twixtUIConfig.getDevModulesList;
        getFileContent = twixtUISnippet.getFileContent;
        getWebPackConfig = twixtUISnippet.getWebPackConfig;
        getDynamicSourceCode = twixtUISnippet.getDynamicSourceCode;
        baseConfig = getConfig();

      } 
      else if (!isSlimProject(projectType)) {
        log(`not slim - projectType: ${projectType}`);
        getConfig = basicConfig.getConfig;
        getModulesList = basicConfig.getModulesList;
        getDevModulesList = basicConfig.getDevModulesList;
        getFileContent = basicSnippet.getFileContent;
        getWebPackConfig = basicSnippet.getWebPackConfig;
        getDynamicSourceCode = basicSnippet.getDynamicSourceCode;
        baseConfig = getConfig();
      }
    })
    .then(() => {
      return shell.which("npm");
    })
    .then(() => {
      const projectQuestions = [
        {
          type: "list",
          name: "portNumber",
          message: "choose your port number",
          choices: [3000, 4000, 5000, 6000, 7000],
          default: 7000,
        },
      ];

      if (baseConfig.canAdd.eslint) {
        projectQuestions.push({
          type: "confirm",
          name: "eslint",
          message: "do you want to add eslint?",
          default: true,
        });
      }

      if (baseConfig.canAdd.prettier) {
        projectQuestions.push({
          type: "confirm",
          name: "prettier",
          message: "do you want to add prettier?",
          default: false,
        });
      }

      if (baseConfig.canAdd.husky) {
        projectQuestions.push({
          type: "confirm",
          name: "husky",
          message:
            "do you want to add husky which enables linting and prettier on pre-commit hook?",
          default: false,
        });
      }

      if (baseConfig.canAdd.hookForm) {
        projectQuestions.push({
          type: "confirm",
          name: "hookForm",
          message: "do you want to add react-hook-form?",
          default: false,
        });
      }

      return inquirer.prompt(projectQuestions);
    })
    .then((answers) => {
      if(!directory) {
        shell.mkdir(baseDirPath);
        shell.cd(appName);
      } else {
        shell.cd(directory);
      }
      shell.exec("npm init -y", { silent: true });

      return answers;
    })
    .then((answers) => {
      if (baseConfig.canAdd.gitIgnore) {
        const gitIgnoreFileName = `git-ignore.txt`;
        createFile('.gitignore', getFileContent(gitIgnoreFileName));
      }

      const babelConfigFileName = `.babelrc`;
      createFile(babelConfigFileName, getFileContent(babelConfigFileName));

      createFile(
        "webpack.config.js",
        getWebPackConfig(appName, {
          ...baseConfig,
          portNumber: answers.portNumber,
        })
      );

      if (answers.eslint) {
        const eslintConfigFileName = `.eslintrc.json`;
        createFile(eslintConfigFileName, getFileContent(eslintConfigFileName));
      }

      if (answers.prettier) {
        const prettierConfigFileName = `.prettierrc.json`;
        createFile(
          prettierConfigFileName,
          getFileContent(prettierConfigFileName)
        );
      }

      shell.mkdir(baseConfig.sourceDir.main);
      shell.cd(baseConfig.sourceDir.main);

      const sourceSnippetDir = `${__dirname}/${projectType}/snippets/sources`;

      const indexFile = !isTwixtUIProject(projectType) ? "index.js": getTwixtUIIndexPath(projectType);
      createFile(indexFile, getDynamicSourceCode(indexFile, appName, baseConfig));

      const AppFile = !isTwixtUIProject(projectType)? "App.js":  getTwixtUIHomePath(projectType);
      createFile(AppFile, getDynamicSourceCode(AppFile, appName, baseConfig));

      if (baseConfig.canAdd.routes) {
        const RoutesFile = "Routes.js";
        createFile(
          RoutesFile,
          getDynamicSourceCode(RoutesFile, appName, baseConfig)
        );
      }


      if (baseConfig.canAdd.hooks) {
        // Copy Hooks.
        shell.cp("-Rf", `${sourceSnippetDir}/hooks`, ".");
      }

      if (baseConfig.canAdd.environment) {
        // Copy Environment.
        shell.cp("-Rf", `${sourceSnippetDir}/env`, ".");
      }

      if (baseConfig.canAdd.constants) {
        // Copy Constants.
        shell.cp("-Rf", `${sourceSnippetDir}/constants`, ".");
      }

      if (baseConfig.canAdd.utils) {
        // Copy Utils.
        shell.cp("-Rf", `${sourceSnippetDir}/utils`, ".");
      }

      if (baseConfig.canAdd.static) {
        // Copy Static.
        shell.cp("-Rf", `${sourceSnippetDir}/static`, ".");
      }

      if (baseConfig.canAdd.i18n) {
        // Copy i18n.
        shell.cp("-Rf", `${sourceSnippetDir}/i18n`, ".");

        shell.cd(baseConfig.sourceDir.i18n);
        const withI18n = `withI18n.js`;
        createFile(withI18n, getDynamicSourceCode(withI18n, appName, baseConfig));
        shell.cd("..");
      }

      if (baseConfig.canAdd.modules) {
        // Copy Modules.
        shell.cp("-Rf", `${sourceSnippetDir}/modules`, ".");

        shell.cd(
          `${baseConfig.sourceDir.containers}/${baseConfig.modules.signIn}`
        );
        const signInModule = "SignIn.js";
        createFile(
          signInModule,
          getDynamicSourceCode(signInModule, appName, baseConfig)
        );

        shell.cd(`../${baseConfig.modules.dashboard}`);
        const dashboardModule = "Dashboard.js";
        createFile(
          dashboardModule,
          getDynamicSourceCode(dashboardModule, appName, baseConfig)
        );
        shell.cd("../../");
      }

      if (baseConfig.canAdd.componentsCopy && !baseConfig.canAdd.fullComponents) {
        // Copy Components.
        shell.cp("-Rf", `${sourceSnippetDir}/components`, ".");
      } else if (baseConfig.canAdd.fullComponents) {
        // Copy Components.
        shell.cp("-Rf", `${sourceSnippetDir}/components`, ".");
        const pageLoader = "PageLoader";
        shell.cd(
          `${baseConfig.sourceDir.components}/${baseConfig.sourceDir.businessLogic}/Loader/${pageLoader}`
        );
        const pageLoaderBlock = `${pageLoader}.js`;
        createFile(
          pageLoaderBlock,
          getDynamicSourceCode(pageLoaderBlock, appName, baseConfig)
        );

        const sidebar = "Sidebar";
        shell.cd(`../../Region/${sidebar}`);
        const sidebarBlock = `${sidebar}.js`;
        createFile(
          sidebarBlock,
          getDynamicSourceCode(sidebarBlock, appName, baseConfig)
        );

        const topBar = "TopBar";
        shell.cd(`../../Region/${topBar}`);
        const topBarBlock = `${topBar}.js`;
        createFile(
          topBarBlock,
          getDynamicSourceCode(topBarBlock, appName, baseConfig)
        );
        shell.cd("../../../../");
      }

      log(chalk.green.underline.bold("Installing App dependencies..."));
      const dependencyList = [
        ...getModulesList(),
        ...(answers.hookForm ? ["form"] : []),
      ];
      moduleSetInstall("-S", dependencyList);

      log(chalk.green.underline.bold("Installing App dev dependencies..."));
      const devDependencyList = [
        ...getDevModulesList(),
        ...(answers.eslint ? ["eslint"] : []),
        ...(answers.prettier ? ["prettier"] : []),
        ...(answers.husky ? ["husky"] : []),
      ];
      moduleSetInstall("-D", devDependencyList);

      shell.cd("..");
      const packageFileContent = shell.cat("package.json")
      const packageFileObject = JSON.parse(packageFileContent)
      packageFileObject.main = `${baseConfig.sourceDir.main}/index.js`
      packageFileObject.private = true
      packageFileObject.scripts = {
        dev: "webpack serve --mode development",
        build: "webpack --mode production --progress",
        ...(answers.eslint
          ? {
              lint: "eslint src --ext .js",
            }
          : {}),
        ...(answers.prettier
          ? {
              prettier: "prettier --write src",
            }
          : {}),
        clean: "rm -rf node_modules",
        ...(isTwixtUIProject(projectType) ? getTwixtUIScripts(): {})
      };
      delete packageFileObject.main;
      shell.rm("package.json");
      createFile("package.json", JSON.stringify(packageFileObject, null, 2));
    })
    .catch((e) => {
      error(e, true);
    });
}

module.exports = install;