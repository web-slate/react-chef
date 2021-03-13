const getConfig = () => {
  return {
    bundler: "webpack",
    ui: "material-ui",
    state: "redux",
    buildDir: "public",
    sourceDir: {
      main: "src",
      static: "static",
      assets: "assets",
      images: "images",
      containers: "modules",
      i18n: "i18n",
      components: "components",
      businessLogic: "blocks",
      userInterface: "widgets",
      utility: "utils",
      hooks: "hooks",
      theme: "theme",
      store: "store",
      services: "services",
      locales: "translations",
    },
    modules: {
      signIn: "signIn",
      dashboard: "dashboard",
    },
  };
};

const getModulesList = () => {
  return [
    "react",
    "router",
    "utils",
    "form",
  ];
};

const getDevModulesList = () => {
  return [
    "webpack",
    "webpackPlugins",
    "webpackLoaders",
    "babel",
    "eslint",
    "prettier",
  ];
};

module.exports = {
  getConfig,
  getModulesList,
  getDevModulesList,
};
