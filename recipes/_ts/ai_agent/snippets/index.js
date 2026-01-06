const shell = require("shelljs");

const layout = require("./sources/layout");

const sourceCodes = {
  layout,
};

const getFileContent = (fileName) => {
  return shell.cat(`${__dirname}/${fileName}`).toString();
};

const getDynamicSourceCode = (fileName, appName, baseConfig = {}) => {
  const key = fileName
    .replace(/\.(ts|tsx|js|css)$/, "")
    .split("/")
    .pop();

  const source = sourceCodes[key];

  if (!source) {
    throw new Error(`Source template not found: ${fileName}`);
  }

  return source.getSourceCode(appName, baseConfig);
};

module.exports = {
  getFileContent,
  getDynamicSourceCode,
};
