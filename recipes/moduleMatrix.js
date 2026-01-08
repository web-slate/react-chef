const react = ['react', 'react-dom', 'prop-types'];
const webpack = ['webpack', 'webpack-cli', 'webpack-dev-server'];
const webpackPlugins = ['html-webpack-plugin', 'copy-webpack-plugin'];
const webpackLoaders = ['@svgr/webpack', 'babel-loader', 'file-loader'];
const babel = ['@babel/core', '@babel/preset-env', '@babel/preset-react'];
const babelWithTypeScript = [...babel, '@babel/preset-typescript'];
const typeScriptTooling = ['ts-loader','@types/react', '@types/react-dom'];
const typeScript = ['typescript', '@babel/runtime'];
const wepPackStyleLoaders = ['style-loader', 'css-loader']
const agent = ['next','react','react-dom','ai','@ai-sdk/openai','@assistant-ui/react','@assistant-ui/react-ai-sdk',
              '@assistant-ui/react-markdown','@radix-ui/react-avatar','@radix-ui/react-collapsible','@radix-ui/react-dialog',
              '@radix-ui/react-separator','@radix-ui/react-slot','@radix-ui/react-tooltip','zustand','clsx','class-variance-authority',
              'tailwind-merge','tw-animate-css','framer-motion','motion','lucide-react','remark-gfm'];
const agentDev = ['typescript','@types/react','@types/react-dom','@types/node','eslint','eslint-config-next',
                 '@eslint/eslintrc','prettier','prettier-plugin-tailwindcss','tailwindcss','@tailwindcss/postcss',
                 'postcss','autoprefixer'];


module.exports = {
  react: [...react],
  reactWithI18n: [...react, 'react-intl'],
  router: ['react-router-dom', 'history'],
  utils: ['lodash'],
  redux: ['redux', 'react-redux'],
  form: ['react-hook-form', '@hookform/resolvers', 'yup'],
  materialUi: ['@material-ui/core', '@material-ui/icons', '@material-ui/styles'],
  services: ['axios'],
  reactLib: ['react-content-loader'],
  webpack,
  webpackPlugins,
  webpackLoaders,
  babel,
  slimDev: [...webpack, ...webpackPlugins, ...webpackLoaders, ...babel],
  slimTypescriptDev: [...typeScriptTooling, ...webpack, ...webpackPlugins, ...webpackLoaders, ...babelWithTypeScript],
  basicTypescriptDev: [...typeScriptTooling, ...webpack, ...webpackPlugins, ...webpackLoaders, ...babelWithTypeScript],
  twixtUIDev: [...webpack, ...webpackPlugins, ...webpackLoaders, ...wepPackStyleLoaders, ...babel],
  agent,
  agentDev,
  husky: 'npm i -D husky',
  eslint: 'npx install-peerdeps --dev eslint-config-airbnb',
  prettier: 'npm install --save-dev --save-exact prettier && npm i -D eslint-config-prettier'
}