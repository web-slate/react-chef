export default {
  appName: "google-clone-app",
  bundler: "webpack",
  buildDir: "public",
  sourceDir: {
    main: "src",
    internalAlias: "@google-clone-app",
    containers: "modules",
    businessLogic: "blocks",
    userInterface: "widgets",
    utility: "utils",
  },
  modules: {
    signIn: "SignIn",
    dashboard: "Dashboard",
  },
};
