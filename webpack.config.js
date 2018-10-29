const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use:['html-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        'loader':'css-loader',
                        options:{
                            name: '[path][name].[ext]'
                        }

                    },{
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 4 version']
                                })
                            ]
                        }
                    },
                        {
                        'loader':'sass-loader',
                         options:{
                                name: '[path][name].[ext]'
                            }
                        }]
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: '../img/'
                        }
                    }
                ]
            },
            {
                test: /\.(mov|mp4)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: '../img/'
                        }
                    }
                ]
            },

            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:[{
                    loader: "url-loader?limit=10000&mimetype=application/font-woff",
                    options:{
                        name: '[name].[ext]',
                        outputPath: 'font/',
                        publicPath: '../font/'
                    }
                }],
            },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:[{
                    loader: "file-loader?limit=10000&mimetype=application/font-woff",
                    options:{
                        name: '[name].[ext]',
                        outputPath: 'font/',
                        publicPath: '../font/'
                    }
                }],
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("./css/style.css"),new HtmlWebpackPlugin({
            title:"project",
            template:"./src/index.html"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]

};
