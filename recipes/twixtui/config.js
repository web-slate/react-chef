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
      pages: true
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
    "twixtUIDev"
  ];
};

module.exports = {
  getConfig,
  getModulesList,
  getDevModulesList,
};
