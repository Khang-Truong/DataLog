var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    plugins: [new MiniCssExtractPlugin({
        filename: './src/build/styles.css'
    })],
    entry: './src/index.js',
    devtool: 'source-map',
    cache: true,
    mode: 'production',
    output: {
        path: __dirname,
        filename: './src/build/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.module.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    "sass-loader",
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /\.module.(s[ac]ss)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "sass-loader"
                ]
            }
        ]
    },
    resolve: {
        fallback: {
            fs: false,
            crypto: require.resolve("crypto-browserify")
        }
    }
};