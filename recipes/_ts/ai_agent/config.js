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
  "next",
  "react",
  "react-dom",
  "ai",
  "@ai-sdk/openai",
  "@assistant-ui/react",
  "@assistant-ui/react-ai-sdk",
  "@assistant-ui/react-markdown",
  "@radix-ui/react-avatar",
  "@radix-ui/react-collapsible",
  "@radix-ui/react-dialog",
  "@radix-ui/react-separator",
  "@radix-ui/react-slot",
  "@radix-ui/react-tooltip",
  "zustand",
  "clsx",
  "class-variance-authority",
  "tailwind-merge",
  "tw-animate-css",
  "framer-motion",
  "motion",
  "lucide-react",
  "remark-gfm",
];

const getDevModulesList = () => [
  "typescript",
  "@types/react",
  "@types/react-dom",
  "@types/node",
  "eslint",
  "eslint-config-next",
  "@eslint/eslintrc",
  "prettier",
  "prettier-plugin-tailwindcss",
  "tailwindcss",
  "@tailwindcss/postcss",
  "postcss",
  "autoprefixer",
];

module.exports = {
  getConfig,
  getModulesList,
  getDevModulesList,
};
