# vue-electron
A simple boilerplate to get started with Electron and Vue2 in seconds

## Components

- electron (_src_ directory)
- vue (_app_ directory)
- index.html
- webpack with vue-loader

## ipc api

You can send message to the main process with _app/api_:

```js
const api = require('../api')

methods: {
    sendRequest: async function () {
        const res = await api.send('getData')
        this.results = res
    },
},
```

Use _src/api_ to specify endpoints:

```js
if (message.method === 'getData') {
    const res = await new Promise(resolve =>
        setTimeout(() => resolve('foo-bar'), 1000)
    )
    return reply(res)
}
```

Every message gets a unique id, so that it is easy to communicate between the two processes,
but this happens behind the scenes and generally you should not be concerned about it.

<!--[electron-ipc-tunnel](https://github.com/Cu3PO42/electron-ipc-tunnel) is a good candidate
to replace current function.-->

## babel: transform-async-to-generator, syntax-async-functions

There's _.babelrc_ file which has the following:

```json
{
  "plugins": [
    "transform-async-to-generator",
    "syntax-async-functions"
  ]
}
```

So that it you can write _async_ functions both in browser -- with webpack, and on server -- using
_babel-register_ (but perhaps you shouldn't do it on the server, we should add a script to compile
_src_ source as well):

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

Welcome to the future.

## Commands

- webpack-build: compile _dist/build.js_ using _webpack.config.js_
- dev-server: serves and reloads vue components on changes to the _app_
- electron-watch: reloads electron with nodemon on changes to the _src_
- electron: run electron once
