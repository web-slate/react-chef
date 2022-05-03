<p align="center">
    <a href="https://react-chef.js.org/"><img height="240" width="235" src="react-chef.svg"></a>
</p>

# ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react-chef)

React-Chef is a Node Module helps you to create react boiler plate apps instantly, prescribing best practices and tools to help you stay productive and mainly transparent React Boilerplate App.

This Module aims to helps developer to create react app instantly.

## Slim App Creation

Below is the screen cast to create Slim App in few minutes and expected command line output.

<p align="center">
    <img src="screenshots/slim-app.gif">
</p>

```
npx react-chef my-blog
npx: installed 83 in 8.745s


 ██████╗  ███████╗  █████╗   ██████╗ ████████╗      ██████╗ ██╗  ██╗ ███████╗ ███████╗
 ██╔══██╗ ██╔════╝ ██╔══██╗ ██╔════╝ ╚══██╔══╝     ██╔════╝ ██║  ██║ ██╔════╝ ██╔════╝
 ██████╔╝ █████╗   ███████║ ██║         ██║        ██║      ███████║ █████╗   █████╗
 ██╔══██╗ ██╔══╝   ██╔══██║ ██║         ██║        ██║      ██╔══██║ ██╔══╝   ██╔══╝
 ██║  ██║ ███████╗ ██║  ██║ ╚██████╗    ██║        ╚██████╗ ██║  ██║ ███████╗ ██║
 ╚═╝  ╚═╝ ╚══════╝ ╚═╝  ╚═╝  ╚═════╝    ╚═╝         ╚═════╝ ╚═╝  ╚═╝ ╚══════╝ ╚═╝


? choose your project type Slim
projectType: slim
? choose your port number 3000
Installing App dependencies...
Installing react, react-dom, prop-types modules
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN my-blog@1.0.0 No description
npm WARN my-blog@1.0.0 No repository field.

+ prop-types@15.8.1
+ react@18.1.0
+ react-dom@18.1.0
added 8 packages from 3 contributors and audited 8 packages in 1.009s
found 0 vulnerabilities

Installing App dev dependencies...
Installing webpack, webpack-cli, webpack-dev-server, html-webpack-plugin, copy-webpack-plugin, @svgr/webpack, babel-loader, file-loader, @babel/core, @babel/preset-env, @babel/preset-react modules
npm WARN my-blog@1.0.0 No description
npm WARN my-blog@1.0.0 No repository field.

+ html-webpack-plugin@5.5.0
+ babel-loader@8.2.5
+ webpack-cli@4.9.2
+ file-loader@6.2.0
+ copy-webpack-plugin@10.2.4
+ webpack-dev-server@4.8.1
+ @svgr/webpack@6.2.1
+ @babel/core@7.17.10
+ webpack@5.72.0
+ @babel/preset-react@7.16.7
+ @babel/preset-env@7.17.10
added 569 packages from 367 contributors and audited 580 packages in 37.79s

77 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Installation

Tool has been designed for gradual adoption from the start. below command creates directory and start create projects.

```
npx react-chef <your-app-name>
```

### Change the directory to your newly created app name

```
cd your-project-name
```

### Run the App. Happy Coding !

```
npm run dev
```

### License

React Chef is [MIT licensed](./LICENSE).
