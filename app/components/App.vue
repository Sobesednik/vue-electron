<template>
    <div>
        {{ message }}
        <br>

        <p v-if="loading">loading...</p>
        <p v-else>{{ rnd }}</p>

        <a href="#" @click.prevent="generateRnd">Generate random number</a>
    </div>
</template>
<script>
    module.exports = {
        data: () => ({
            message: 'hello world!',
            rnd: null,
            loading: false,
        }),
        methods: {
            generateRnd: async function () {
                this.loading = true
                const res = await new Promise(resolve =>
                    setTimeout(() =>
                        resolve(Math.random())
                    , 1000)
                )
                this.rnd = res
                this.loading = false
            },
        },
        created: function () {
            this.generateRnd()
        }
    }
</script>
