const chalk = require("chalk");
const shell = require("shelljs");
const fs = require("fs");

const moduleMatrix = require("./moduleMatrix");

const log = console.log;

const multiLineLog = (lines = []) => {
  let allLines = "";
  for(const line of lines){
      allLines += `${line.content}${"\n".repeat(line.trailingNewLines)}`
  }
  log(allLines);
};

const error = (msg, canExit = true) => {
  console.error(chalk.white.bgRed(`Error: ${msg}`));
  canExit && process.exit();
};

const warning = chalk.keyword("orange");

const warn = (msg) => {
  console.warn(warning(`Warning: ${msg}`));
};

const createFile = (fileNameWithPath, content) => {
  shell.touch(fileNameWithPath);
  shell.ShellString(`${content}`).to(fileNameWithPath);
}

const tryAccess = (accessPath) => {
  return new Promise((resolve, reject) => {
    fs.access(accessPath, function (isAccessError) {
      const isGivenPathNotExist = isAccessError
      if (isGivenPathNotExist) {
        resolve()
      } else {
        reject()
      }
    })
  })
}
const moduleSetInstall = async (option = "", moduleListArray = []) => {
  if (!option || !Array.isArray(moduleListArray)) return;

  const directPackages = [];

  for (const item of moduleListArray) {
    if (!item) continue;

    const moduleList = moduleMatrix[item];

    // 1️⃣ matrix key → array of packages
    if (Array.isArray(moduleList)) {
      log(
        chalk.green.underline.bold(
          `Installing ${moduleList.join(", ")} modules`
        )
      );
      shell.exec(`npm i ${option} ${moduleList.join(" ")} --legacy-peer-deps`);
      continue;
    }

    // 2️⃣ matrix key → shell command
    if (typeof moduleList === "string") {
      log(chalk.green.underline.bold(`Executing: ${moduleList}`));
      shell.exec(moduleList);
      continue;
    }

    // 3️⃣ direct package name (not in matrix)
    if (typeof item === "string") {
      directPackages.push(item);
    }
  }

  // 4️⃣ install raw packages once
  if (directPackages.length) {
    log(
      chalk.green.underline.bold(
        `Installing ${directPackages.join(", ")} packages`
      )
    );
    shell.exec(
      `npm i ${option} ${directPackages.join(" ")} --legacy-peer-deps`
    );
  }
};



const isRestrictedAppName = (projectName) => {
  const modulesList = [];
  Object.keys(moduleMatrix).forEach(item=>{
     if(Array.isArray(moduleMatrix[item])){
      modulesList.push(...moduleMatrix[item])
     } else {
      modulesList.push(moduleMatrix[item])
     }
  })
 return modulesList.includes(projectName)
}

const getTwixtUIIndexPath = (isTypeScript) => {
  if (isTypeScript) {
    return `${__dirname}/_ts/twixtui/snippets/sources/pages/Home/index.tsx`;
  } else {
    return `${__dirname}/twixtui/snippets/sources/pages/Home/index.js`;
  }
};

const getTwixtUIHomePath = (isTypeScript) => {
  if (isTypeScript) {
    return `${__dirname}/_ts/twixtui/snippets/sources/pages/Home/Home.tsx`;
  } else {
    return `${__dirname}/twixtui/snippets/sources/pages/Home/Home.js`;
  }
};


const getTwixtUIScripts = (projectType) =>{
  return {
    "init-ui": "git submodule add --force https://github.com/web-slate/TwixtUI.git src/TwixtUI",
    "clear-ui": "rm -rf src/TwixtUI || true && rm -f .gitmodules",
    "clear-cache-ui": "git rm --cached client/config/src/TwixtUI -f || true && rm -rf .git/modules/TwixtUI || true",
    "ui": "npm run clear-ui && npm run init-ui"
  }
}

module.exports = {
  log,
  multiLineLog,
  error,
  warn,
  createFile,
  tryAccess,
  moduleSetInstall,
  isRestrictedAppName,
  getTwixtUIIndexPath,
  getTwixtUIHomePath,
  getTwixtUIScripts
};
