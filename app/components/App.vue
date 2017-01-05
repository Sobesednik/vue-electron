<template>
    <div>
        {{ message }}
        <br>

        <p v-if="loading">loading...</p>
        <p v-else>{{ rnd }}</p>

        <a href="#" @click.prevent="generateRndBrowser">Generate random number in browser</a>
        <br>
        <a href="#" @click.prevent="generateRndServer">Generate random number on server</a>
    </div>
</template>
<script>
    const api = require('../api')

    module.exports = {
        data: () => ({
            message: 'hello world!',
            rnd: null,
            loading: false,
        }),
        methods: {
            generateRndBrowser: async function () {
                this.loading = true
                const res = await new Promise(resolve =>
                    setTimeout(() =>
                        resolve(Math.random())
                    , 1000)
                )
                this.rnd = res
                this.loading = false
            },
            generateRndServer: async function () {
                this.loading = true
                const res = await api.send('generateRnd')
                this.rnd = res
                this.loading = false
            },
        },
        created: function () {
            this.generateRndBrowser()
        }
    }
</script>
