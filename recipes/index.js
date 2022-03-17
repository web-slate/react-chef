#! /usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const {
  multiLineLog,
  error,
  isRestrictedAppName
} = require("./utils");
const install = require('./install');

program.option("-d, --directory <value>", "Use directory");
program.parse();

const appName = program.args[0];
const directory = program.opts().directory;

if (!appName) {
  console.error("Please specify the app name:");
  multiLineLog([
    {
      content: `${chalk.cyan("react-chef")} ${chalk.green("<app-name>")}`,
      trailingNewLines: 2,
    },
    {
      content: "For example:",
      trailingNewLines: 1,
    },
    {
      content: `${chalk.cyan("npx react-chef")} ${chalk.green(
        "your-app-name"
      )}`,
      trailingNewLines: 1,
    },
  ]);
  error("App name is missing");
}

if(isRestrictedAppName(appName)){ 
 error(`App name '${appName}' is restricted. Please choose different app name.`);
}


install(directory, appName);
