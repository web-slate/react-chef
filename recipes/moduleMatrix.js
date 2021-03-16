module.exports = {
  react: ['react', 'react-dom', 'react-intl', 'prop-types'],
  router: ['react-router-dom', 'history'],
  utils: ['axios', 'lodash'],
  redux: ['redux', 'react-redux'],
  form: ['react-hook-form', '@hookform/resolvers', 'yup'],
  materialUi: ['@material-ui/core', '@material-ui/icons', '@material-ui/styles'],
  reactLib: ['react-content-loader'],
  webpack: ['webpack', 'webpack-cli', 'webpack-dev-server'],
  webpackPlugins: ['html-webpack-plugin', 'copy-webpack-plugin'],
  webpackLoaders: ['@svgr/webpack', 'babel-loader', 'file-loader'],
  babel: ['@babel/core', '@babel/preset-env', '@babel/preset-react'],
  husky: 'npm i -D husky',
  eslint: 'npx install-peerdeps --dev eslint-config-airbnb',
  prettier: 'npm install --save-dev --save-exact prettier && npm i -D eslint-config-prettier'
}