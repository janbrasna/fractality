import path from 'path';
import { globbySync } from 'globby';
import autoprefixer from 'autoprefixer';
import { fileURLToPath } from 'url';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const skins = globbySync('./assets/scss/skins/*.scss').reduce((acc, file) => {
    const fileName = path.basename(file, '.scss');

    return {
        ...acc,
        [fileName]: file,
    };
}, {});

export default {
    entry: {
        mandelbrot: ['./assets/js/mandelbrot.js'],
        highlight: ['./assets/scss/highlight.scss'],
        ...skins,
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve('./dist'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: './assets/img/**/*',
                    to: './img/[name][ext]',
                },
                {
                    from: './assets/favicon.ico',
                    to: '.',
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }]],
                    },
                },
            },
            {
                test: fileURLToPath(import.meta.resolve('jquery')),
                loader: 'expose-loader',
                options: {
                    exposes: ['$', 'jQuery'],
                },
            },
            {
                test: /\.(png|svg|jpg|gif|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer()],
                            },
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            api: 'modern',
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
};
