const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new webpack.BannerPlugin('#!/usr/bin/env node')
    ],
    target: "node"
}