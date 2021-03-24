#! /usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const {
  multiLineLog,
  error,
} = require("./utils");
const install = require('./install');

program.option("-f, --app-name <value>", "App Name");
program.parse(process.argv);

//pre install check
const appName = program.args[0];

if (!appName) {
  console.error('Please specify the app name:')
  multiLineLog([{
    content: `${chalk.cyan('react-chef')} ${chalk.green('<app-name>')}`,
    trailingNewLines: 2
    },
    {
      content: "For example:",
      trailingNewLines: 1
    },
    {
      content: `${chalk.cyan('npx react-chef')} ${chalk.green('your-app-name')}`,
      trailingNewLines: 1
    }
  ])
  error("App name is missing")
}

install(appName);