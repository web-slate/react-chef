---
id: basic
title: Basic Package
---

**Description**:

- Create react basic package with simple steps.

1. npx react-chef sample (Project Name)
2. choose your project type (Basic)

   - Slim
   - Basic

3. choose your port number

   - 3000
   - 4000
   - 5000
   - 6000
   - 7000

4. do you want to add eslint? (Y/n)
5. do you want to add prettier? (y/N)
6. do you want to add husky which enables linting and prettier on pre-commit hook? (y/N)
7. do you want to add react-hook-form? (y/N)
8. run the app in development mode
   - npm run dev

**Project Structure**

```
sample
├── node_modules
├── package.json
├── .eslintrc.json
├── .prettierrc.json
├── .babelrc
├──  webpack.config.js
└── src
    ├── components
        ├── blocks
            ├── ErrorHandler
                ├── ErrorHandler.js
                ├── index.js
            ├── Loader
                ├── PageLoader
                    ├── PageLoader.js
                    ├── index.js
                ├── index.js
            ├── Region
                ├── Footer
                    ├── Footer.js
                    ├── index.js
                ├── Sidebar
                    ├── SidebarNav
                        ├── SidebarNav.js
                        ├── index.js
                    ├── index.js
                ├── TopBar
                    ├── TobBar.js
                    ├── index.js
            ├── index.js
        ├── widgets
            ├── Fields
                ├── InputTextField
                    ├── InputTextField.js
                    ├── index.js
                ├── index.js
            ├── Loader
                ├── BlockLoader
                    ├── BlockLoader.js
                    ├── index.js
                ├── Spinner
                    ├── Spinner.js
                    ├── index.js
                ├── index.js
            ├── index.js
    ├── i18n
        ├── withI18n.js
        ├── index.js
    ├── modules
        ├── Dashboard
            ├── Dashboard.js
            ├── index.js
        ├── NotFound
            ├── NotFound.js
            ├── index.js
        ├── SignIn
            ├── SignIn.js
            ├── index.js
        ├── index.js
    ├── static
       ├── images
       ├── translations
       ├── index.html
    ├── utils
        ├── RoutePaths.js
        ├── index.js
    ├── App.js
    ├── index.js
```

### `npm run build`

Run the app in production mode

- npm run build
