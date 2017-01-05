const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './app/app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.common.js',
        },
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     exclude: /node_modules/
            // },
            // {
            //     test: /\.(png|jpg|gif|svg)$/,
            //     loader: 'file',
            //     query: {
            //         name: '[name].[ext]?[hash]'
            //     }
            // }
        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map',
    performance: {
        hints: false
    },
    target: 'electron-renderer',
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
} else {
    module.exports.devtool = '#source-map'
}
