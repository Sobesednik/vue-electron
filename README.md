# vue-electron
A simple boilerplate to get started with Electron and Vue2 in seconds

## Components

- electron (_src_ directory)
- vue (_app_ directory)
- index.html
- webpack with vue-loader

### babel: transform-async-to-generator + syntax-async-functions

There's _.babelrc_ file which has the following:

```json
{
  "plugins": [
    "transform-async-to-generator",
    "syntax-async-functions"
  ]
}
```

So that it you can write _async_ functions:

```js
methods: {
    onClick: async function () {
        const res = await new Promise(resolve =>
            setTimeout(() =>
                resolve(Math.random())
            , 100)
        )
        console.log(res)
    },
},
```

## Commands

- webpack-build: compile _dist/build.js_ using _webpack.config.js_
- dev-server: serves and reloads vue components on changes to the _app_
- electron-watch: reloads electron with nodemon on changes to the _src_
- electron: run electron once
