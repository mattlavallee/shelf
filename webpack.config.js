var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var webpack = require('webpack');
module.exports = {
    entry: {
        shelf: ['./app/index.ts'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            // vue-loader: compile vue templates
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader',
                    },
                    esModule: true,
                },
            },
            // ts-loader: convert typescript (es6) to javascript (es6),
            // babel-loader: converts javascript (es6) to javascript (es5)
            {
                test: /\.(ts|tsx)?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.app.json',
                        appendTsSuffixTo: [/\.vue$/],
                    },
                }, ],
                exclude: /node_modules/,
            },
            // babel-loader for pure javascript (es6) => javascript (es5)
            {
                test: /\.(js?)$/,
                loaders: ['babel'],
                exclude: /node_modules/,
            }
        ]
    },
    externals: {},
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [],
};