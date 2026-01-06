#! /usr/bin/env node
const inquirer = require("inquirer");
const chalk = require("chalk");
const shell = require("shelljs");
const CFonts = require("cfonts");

// Slim Javasctipt
const slimConfig = require("./slim/config");
const slimSnippet = require("./slim/snippets");

// Slim Typescript Version
const slimTypeScriptConfig = require("./_ts/slim/config");
const slimTypeScriptSnippet = require("./_ts/slim/snippets");

// basic Typescript Version
const basicTypeScriptConfig = require("./_ts/basic/config");
const basicTypeScriptSnippet = require("./_ts/basic/snippets");

// Basic Javascript
const basicConfig = require(`./basic/config`);
const basicSnippet = require(`./basic/snippets`);

// Twixt Config
const twixtUIConfig = require("./twixtui/config");
const twixtUISnippet = require("./twixtui/snippets");

// Twixt TypeScript Config
const twixtUITypeScriptConfig = require("./_ts/twixtui/config");
const twixtUITypeScriptSnippet = require("./_ts/twixtui/snippets");

const agentConfig = require("./_ts/ai_agent/config");
const agentSnippet = require("./_ts/ai_agent/snippets");

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

const install = function (directory, appName = '') {
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

  let agentGetConfig = agentConfig.getConfig;



  const baseDirPath = `./${appName}`;
  const defaultProjectType = 'slim';
  const twixtUIProjectType = 'twixtui';
  const slimTypescriptProjectType = 'slim typescript';
  const basicTypescriptProjectType = 'basic typescript';
  const twixtUITypescriptProjectType = 'twixtui typescript';
  const agentProjectType = 'ai agent';
  let projectType = defaultProjectType;
  const isSlimProject = (type) => type === defaultProjectType;
  const isTwixtUIProject = (type) => type === twixtUIProjectType;
  const isSlimTypeScriptProject = (type) => type === slimTypescriptProjectType;
  const isBasicTypeScriptProject = (type) => type === basicTypescriptProjectType;
  const isTwixtUITypeScriptProject = (type) => type === twixtUITypescriptProjectType;
  const isAIAgentProject = (type) => type === agentProjectType;
  const isTypeScriptProject = (type) => isSlimTypeScriptProject(type) || isBasicTypeScriptProject(type) || isTwixtUITypeScriptProject(type);
  const isAnyTwixtUIProject = (type) =>
    isTwixtUIProject(type) || isTwixtUITypeScriptProject(type);

  tryAccess(baseDirPath)
    .then(() => undefined, function onPathExist() {
      if (!directory) {
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
          choices: ["Slim", "Slim TypeScript", "Basic", "Basic TypeScript", "TwixtUI", "TwixtUI TypeScript", "AI Agent"],
          default: "Slim",
        },
      ]);
    })
    .then((mainAnswer) => {
      projectType = mainAnswer.projectType.toLowerCase();
      log(`projectType: ${projectType}`);
      if (isSlimTypeScriptProject(projectType)) {
        log(`Slim Typescript - projectType: ${projectType}`);
        getConfig = slimTypeScriptConfig.getConfig;
        getModulesList = slimTypeScriptConfig.getModulesList;
        getDevModulesList = slimTypeScriptConfig.getDevModulesList;
        getFileContent = slimTypeScriptSnippet.getFileContent;
        getWebPackConfig = slimTypeScriptSnippet.getWebPackConfig;
        getDynamicSourceCode = slimTypeScriptSnippet.getDynamicSourceCode;
        baseConfig = getConfig();
      } else if (isBasicTypeScriptProject(projectType)) {
        log(`Basic TypeScript - projectType: ${projectType}`);
        getConfig = basicTypeScriptConfig.getConfig;
        getModulesList = basicTypeScriptConfig.getModulesList;
        getDevModulesList = basicTypeScriptConfig.getDevModulesList;
        getFileContent = basicTypeScriptSnippet.getFileContent;
        getWebPackConfig = basicTypeScriptSnippet.getWebPackConfig;
        getDynamicSourceCode = basicTypeScriptSnippet.getDynamicSourceCode;
        baseConfig = getConfig();
      } else if (isTwixtUIProject(projectType)) {
        log(`TwixtUI - projectType: ${projectType}`);
        getConfig = twixtUIConfig.getConfig;
        getModulesList = twixtUIConfig.getModulesList;
        getDevModulesList = twixtUIConfig.getDevModulesList;
        getFileContent = twixtUISnippet.getFileContent;
        getWebPackConfig = twixtUISnippet.getWebPackConfig;
        getDynamicSourceCode = twixtUISnippet.getDynamicSourceCode;
        baseConfig = getConfig();
      } else if (isTwixtUITypeScriptProject(projectType)) {
        log(`TwixtUI TypeScript - projectType: ${projectType}`);
        getConfig = twixtUITypeScriptConfig.getConfig;
        getModulesList = twixtUITypeScriptConfig.getModulesList;
        getDevModulesList = twixtUITypeScriptConfig.getDevModulesList;
        getFileContent = twixtUITypeScriptSnippet.getFileContent;
        getWebPackConfig = twixtUITypeScriptSnippet.getWebPackConfig;
        getDynamicSourceCode = twixtUITypeScriptSnippet.getDynamicSourceCode;
        baseConfig = getConfig();
      } else if (isAIAgentProject(projectType)) {
        log(`AI Agent - projectType: ${projectType}`);
        getConfig = agentConfig.getConfig;
        getModulesList = agentConfig.getModulesList;
        getDevModulesList = agentConfig.getDevModulesList;
        getFileContent = agentSnippet.getFileContent;
        getWebPackConfig = agentSnippet.getWebPackConfig;
        getDynamicSourceCode = agentSnippet.getDynamicSourceCode;
        baseConfig = agentGetConfig()
      } else if (!isSlimProject(projectType)) {
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

      if (baseConfig.canAdd.buildDir) {
        projectQuestions.push({
          type: "input",
          name: "buildDir",
          message: "Add your build directory",
          default: baseConfig.buildDir,
        });
      }

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
      if (!directory) {
        shell.mkdir(baseDirPath);
        shell.cd(appName);
      } else {
        shell.cd(directory);
      }
      shell.exec("npm init -y", { silent: true });

      return answers;
    })
    .then((answers) => {
      const isTypeScriptProjectType = isTypeScriptProject(projectType);
      const isBasicTypeScriptProjectType = isBasicTypeScriptProject(projectType);
      const isTwixtUITypeScriptProjectType = isTwixtUITypeScriptProject(projectType);
      const fileExtension = isTypeScriptProjectType ? 'ts' : 'js';
      const componentExtension = isTypeScriptProjectType ? 'tsx' : 'js';
      if (baseConfig.canAdd.gitIgnore) {
        const gitIgnoreFileName = `git-ignore.txt`;
        createFile('.gitignore', getFileContent(gitIgnoreFileName));
      }

      if (isTypeScriptProjectType) {
        const tsConfigFileName = `tsconfig.json`;
        createFile(tsConfigFileName, getFileContent(tsConfigFileName));
      }

      if (!isAIAgentProject(projectType)) {
        const babelConfigFileName = `.babelrc`;
        createFile(babelConfigFileName, getFileContent(babelConfigFileName));

        createFile(
          'webpack.config.js',
          getWebPackConfig(appName, {
            ...baseConfig,
            portNumber: answers.portNumber,
            buildDir: answers.buildDir || baseConfig.buildDir
          })
        );
      }


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

      if (!isAIAgentProject(projectType)) {
        shell.mkdir(baseConfig.sourceDir.main);
        shell.cd(baseConfig.sourceDir.main);
      }



      let projectTypeName;
      if (isBasicTypeScriptProjectType) {
        projectTypeName = 'basic';
      } else if (isSlimTypeScriptProject(projectType)) {
        projectTypeName = 'slim';
      } else if (isTwixtUITypeScriptProject(projectType)) {
        projectTypeName = 'twixtui';
      } else {
        projectTypeName = projectType;
      }

      const isTS = isTwixtUITypeScriptProject(projectType);

      let sourceSnippetDir;

      if (!isAIAgentProject(projectType)) {
        const sourceSubBase = isTypeScriptProjectType ? '_ts/' : '';
        sourceSnippetDir = `${__dirname}/${sourceSubBase}${projectTypeName}/snippets/sources`;
      }

      const indexSourceFileName = `index.js`;
      const appSourceFileName = `App.js`;

      // ✅ Non-TwixtUI and agent projects only The condition

      if (!isAnyTwixtUIProject(projectType) && !isAIAgentProject(projectType)) {
        createFile(
          `index.${componentExtension}`,
          getDynamicSourceCode(indexSourceFileName, appName, baseConfig)
        );

        createFile(
          `App.${componentExtension}`,
          getDynamicSourceCode(appSourceFileName, appName, baseConfig)
        );
      }


      if (baseConfig.canAdd.routes) {
        const RoutesFile = `Routes.${componentExtension}`;
        createFile(
          RoutesFile,
          getDynamicSourceCode(RoutesFile, appName, baseConfig)
        );
      }

      if (baseConfig.canAdd.pages) {
        // Copy Pages.
        shell.cp("-Rf", `${sourceSnippetDir}/pages`, ".");
      }


      if (!isAIAgentProject(projectType)) {
        if (baseConfig.canAdd.hooks) {
          shell.cp("-Rf", `${sourceSnippetDir}/hooks`, ".");
        }
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
        const withI18n = `withI18n.${componentExtension}`;
        createFile(withI18n, getDynamicSourceCode(withI18n, appName, baseConfig));
        shell.cd("..");
      }

      if (baseConfig.canAdd.modules) {
        // Copy Modules.
        shell.cp("-Rf", `${sourceSnippetDir}/modules`, ".");

        shell.cd(
          `${baseConfig.sourceDir.containers}/${baseConfig.modules.signIn}`
        );
        const signInModule = `SignIn.${componentExtension}`;
        createFile(
          signInModule,
          getDynamicSourceCode(signInModule, appName, baseConfig)
        );

        shell.cd(`../${baseConfig.modules.dashboard}`);
        const dashboardModule = `Dashboard.${componentExtension}`;
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
        const pageLoaderBlock = `${pageLoader}.${componentExtension}`;
        createFile(
          pageLoaderBlock,
          getDynamicSourceCode(pageLoaderBlock, appName, baseConfig)
        );

        const sidebar = "Sidebar";
        shell.cd(`../../Region/${sidebar}`);
        const sidebarBlock = `${sidebar}.${componentExtension}`;
        createFile(
          sidebarBlock,
          getDynamicSourceCode(sidebarBlock, appName, baseConfig)
        );

        const topBar = "TopBar";
        shell.cd(`../../Region/${topBar}`);
        const topBarBlock = `${topBar}.${componentExtension}`;
        createFile(
          topBarBlock,
          getDynamicSourceCode(topBarBlock, appName, baseConfig)
        );
        shell.cd("../../../../");
      }

      // Types folder 
      if (isTS && baseConfig.canAdd.types) {
        shell.mkdir('-p', 'types');
        shell.cp('-Rf', `${sourceSnippetDir}/types`, '.');
      }




      //  Ai Agent Folder
      if (isAIAgentProject(projectType)) {
        const agentSnippetDir = `${__dirname}/_ts/ai_agent/snippets/sources`;

        shell.cp('-Rf', `${agentSnippetDir}/app`, './app');

        createFile(
          "app/layout.tsx",
          getDynamicSourceCode("layout.tsx", appName)
        );
        shell.cp('-Rf', `${agentSnippetDir}/components`, './components');
        shell.cp('-Rf', `${agentSnippetDir}/hooks`, './hooks');
        shell.cp('-Rf', `${agentSnippetDir}/lib`, './lib');

        createFile('next.config.ts', getFileContent('next.config.ts'));
        createFile('tsconfig.json', getFileContent('tsconfig.json'));
        createFile('postcss.config.mjs', getFileContent('postcss.config.mjs'));
        createFile('eslint.config.mjs', getFileContent('eslint.config.mjs'));
      }



      if (!isAIAgentProject(projectType)) {
        log(chalk.green.bold("Installing App dependencies..."));
        moduleSetInstall("-S", [
          ...getModulesList(),
          ...(answers.hookForm ? ["form"] : []),
        ]);

        log(chalk.green.bold("Installing App dev dependencies..."));
        moduleSetInstall("-D", [
          ...getDevModulesList(),
          ...(answers.eslint ? ["eslint"] : []),
          ...(answers.prettier ? ["prettier"] : []),
          ...(answers.husky ? ["husky"] : []),
        ]);
      } else {
        log(chalk.green.bold("Installing Agent dependencies..."));
        moduleSetInstall("-S", agentConfig.getModulesList());

        log(chalk.green.bold("Installing Agent dev dependencies..."));
        moduleSetInstall("-D", agentConfig.getDevModulesList());
      }




      if (!isAIAgentProject(projectType)) {
        shell.cd("..");
      }
      const packageFileContent = shell.cat("package.json");
      const packageFileObject = JSON.parse(packageFileContent);
      packageFileObject.private = true;

      if (isAIAgentProject(projectType)) {
        delete packageFileObject.main;
        packageFileObject.scripts = {
          dev: "next dev",
          build: "next build",
          start: "next start",
          lint: "next lint",
          clean: "rm -rf node_modules",
        };
      } else {
        packageFileObject.main = `${baseConfig.sourceDir.main}/index.js`;
        packageFileObject.scripts = {
          dev: "webpack serve --mode development",
          build: "webpack --mode production --progress",
          ...(answers.eslint ? { lint: "eslint src --ext .js" } : {}),
          ...(answers.prettier ? { prettier: "prettier --write src" } : {}),
          clean: "rm -rf node_modules",
          ...(isTwixtUIProject(projectType) ? getTwixtUIScripts() : {}),
        };
      }

      shell.rm("package.json");
      createFile("package.json", JSON.stringify(packageFileObject, null, 2));
    })
    .catch((e) => {
      error(e, true);
    });
}

module.exports = install;