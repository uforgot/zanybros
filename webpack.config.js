const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const scssMixin = path.resolve(__dirname, './site/assets_src/scss/common/mixin.scss');

const config = {
    context: path.resolve(__dirname, './site/assets_src/'),
    entry: {
        'app':['./js/main.js']
    },

    output: {
        path: path.resolve(__dirname, './site/assets/'),
        filename: 'js/[name].bundle.js'
    },

    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            scssMixin
        }
    },

    plugins: [
        new CopyWebpackPlugin(
            [
                {from:"./js/bootstrap.js", to:"./js/bootstrap.js"},
                {from:"./js/vendor/modernizr.js", to:"./js/vendor/modernizr.js"},
                {from:"./js/vendor/detectizr.js", to:"./js/vendor/detectizr.js"},

                {from:"./css/**/*"},
                {from:"./fonts/**/*"},
                {from:"./images/**/*"},
                {from:"./video/**/*"},
                {from:"./data/**/*"}
            ]
        )
    ]
};

module.exports = config;


//https://github.com/vuejs-templates/webpack-simple/tree/master/template