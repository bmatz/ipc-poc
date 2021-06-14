// eslint-disable-next-line
const path = require('path');
// eslint-disable-next-line
const HTMLWebpackPlugin = require('html-webpack-plugin');

// import path from 'path';
// import {fileURLToPath} from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

module.exports = {
    entry: './src/client/index.jsx',
    devtool: 'eval-source-map',
    target: 'web',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                include: path.resolve(__dirname, 'src/client'),
                exclude: /node_modules/,
                options: {
                    quiet: true,
                    failOnError: true,
                },
            },
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'entry',
                                corejs: 3,
                                bugfixes: true,
                            },
                        ],
                        '@babel/preset-react',
                        '@babel/preset-typescript',
                    ],
                },
                resolve: {extensions: ['.tsx', 'ts', '.jsx', '.js']},
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {test: /\.(png|jpg)$/, loader: 'file-loader'},
            {
                test: /\.ico$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/client/index.html',
        }),
    ],
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
    },
};
