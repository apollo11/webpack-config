const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('./node_modules/vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require("./node_modules/babel-polyfill");

module.exports = {
    entry: {
        j_script:'./assets/js/jscript.js',
        v_script:['babel-polyfill','./assets/js/app.js'],
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, './assets/js/dist')
    },
    module:{
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],

            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.exec\.js$/,
                use: [ 'script-loader' ]
            }
        ]
    },
    plugins:[
        // make sure to include the plugin!
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CleanWebPackPlugin(['assets/js/dist']),
        new HtmlWebpackPlugin({
            title:'production'
        })
    ],
    optimization: {
        minimize:true,
        nodeEnv: 'production',
        mangleWasmImports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        providedExports: true,

        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]

    }
};