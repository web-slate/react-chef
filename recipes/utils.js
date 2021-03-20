const chalk = require("chalk");
const shell = require("shelljs");
const fs = require("fs");

const moduleMatrix = require("./moduleMatrix");

const log = console.log;

const multiLineLog = (lines= []) => {
  let allLines ="";
  for(const line of lines){
      allLines += `${" ".repeat(line.noOfSpacesInFront)}${line.content}${"\n".repeat(line.noOfTrailingLines)}`
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

module.exports = {
  log,
  multiLineLog,
  error,
  warn,
  createFile,
  tryAccess,
  moduleSetInstall
};
