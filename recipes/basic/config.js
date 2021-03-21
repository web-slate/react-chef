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
      signIn: "SignIn",
      dashboard: "Dashboard",
    },
    canAdd: {
      eslint: true,
      prettier: true,
      husky: true,
      hookForm: true,
      routes: true,
      utils: true,
      static: true,
      i18n: true,
      modules: true,
      componentsCopy: false,
      fullComponents: true,
    },
  };
};

const getModulesList = () => {
  return [
    "reactWithI18n",
    "router",
    "utils"
  ];
};

const getDevModulesList = () => {
  return [
    "webpack",
    "webpackPlugins",
    "webpackLoaders",
    "babel"
  ];
};

module.exports = {
  getConfig,
  getModulesList,
  getDevModulesList,
};
