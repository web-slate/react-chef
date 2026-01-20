const getConfig = () => ({
  framework: "nextjs",

  sourceDir: {
    main: "app",
    components: "components",
    hooks: "hooks",
    lib: "lib",
  },

  canAdd: {
    app: true,
    components: true,
    hooks: true,
    lib: true,    
  },

  buildDir: ".next",
});

const getModulesList = () => [
  "agent"
];

const getDevModulesList = () => [
  "agentDev"
];

module.exports = {
  getConfig,
  getModulesList,
  getDevModulesList,
};
