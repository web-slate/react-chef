const getConfig = () => {
  return {
    bundler: "webpack",
    buildDir: "public",
    sourceDir: {
      main: "src",
      static: "static",
      assets: "assets",
      images: "images",
      components: "components",
      types: "types"
    },
    canAdd: {
      eslint: false,
      prettier: false,
      husky: false,
      hookForm: false,
      routes: false,
      utils: false,
      static: true,
      i18n: false,
      modules: false,
      componentsCopy: true,
      fullComponents: false,
      pages: true,
      buildDir: true,
      types: true
    },
  };
};

const getModulesList = () => {
  return [
    "react"
  ];
};

const getDevModulesList = () => {
  return [
    "webpack",
    "webpackPlugins",
    "webpackLoaders",
    "babel",
    "basicTypescriptDev"
  ];
};

module.exports = {
  getConfig,
  getModulesList,
  getDevModulesList,
};
