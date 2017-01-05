const { ipcRenderer } = require('electron')

function getRandomId() {
    return Math.floor(Math.random() * 1000000)
}

function sendMessage(message) {
    console.log('sending message', message)
    ipcRenderer.send('asynchronous-message', message)
}

function createIpcPromise(mid) {
    return new Promise((resolve, reject) => {
        const handler = (e, message) => {
            console.log(`${mid} response`, message)
            ipcRenderer.removeListener(mid, handler)
            if (message && message.error) {
                console.error(message.error)
                return reject(message.error)
            }
            return resolve(message)
        }
        ipcRenderer.on(mid, handler)
    })
}

function send(method, data) {
    const mid = String(getRandomId())
    const replyPromise = createIpcPromise(mid)
    const message = { mid, method, data }
    sendMessage(message)
    return replyPromise
}

module.exports = {
    send,
}
