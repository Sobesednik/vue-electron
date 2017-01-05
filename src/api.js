/**
 * Communicate with the renderer process via this interface.
 * message: { mid, method, data }
 */
async function onAsyncMessage(event, message) {
    console.log('received async message', message)
    if (!message.mid) {
        return
    }
    const mid = message.mid
    const reply = event.sender.send.bind(event.sender, mid)

    try {
        const data = message.data

        if (message.method === 'foo') {
            const res = await new Promise(resolve =>
                setTimeout(() => resolve('bar'), 1000)
            )
            return reply(res)
        }

        if (message.method === 'generateRnd') {
            const res = await new Promise(resolve =>
                setTimeout(() => resolve(Math.random()), 1000)
            )
            return reply(res)
        }

        throw new Error('Method not found')
    } catch (err) {
        console.error(err)
        reply({ error: err.message })
    }
}

module.exports = onAsyncMessage
