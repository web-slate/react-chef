const react = ['react', 'react-dom', 'prop-types'];
const webpack = ['webpack', 'webpack-cli', 'webpack-dev-server'];
const webpackPlugins = ['html-webpack-plugin', 'copy-webpack-plugin'];
const webpackLoaders = ['@svgr/webpack', 'babel-loader', 'file-loader'];
const babel = ['@babel/core', '@babel/preset-env', '@babel/preset-react'];
const babelWithTypeScript = [...babel, '@babel/preset-typescript'];
const typeScriptTooling = ['ts-loader','@types/react', '@types/react-dom'];
const typeScript = ['typescript', '@babel/runtime'];
const wepPackStyleLoaders = ['style-loader', 'css-loader']

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
  husky: 'npm i -D husky',
  eslint: 'npx install-peerdeps --dev eslint-config-airbnb',
  prettier: 'npm install --save-dev --save-exact prettier && npm i -D eslint-config-prettier'
}