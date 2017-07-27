const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('[name].bundle.css')

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
    name: ['commons', 'vendor'],
    filename: 'commons.js',
    minChunks: Infinity
})

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './app.js',
        admin: './admin.js',
        vendor: ['jquery', 'bootstrap', 'angular', 'moment']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', {modules: false}]
                    ],
                    "plugins": ["angularjs-annotate"]
                }
            }]
        }, {
            test: /\.scss|\.css$/,
            loader: ['style-loader', 'css-loader', 'sass-loader'] /*extractCSS.extract(['css-loader','sass-loader'])*/
        }, {
            test: /\.(png|jpg)$/,
            use: [{
                loader: 'url-loader',
                options: {limit: 10000} // Convert images < 10k to base64 strings
            }]
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
            loader: 'url-loader?limit=10000',
        }, {
            test: /\.(eot|ttf|wav|mp3)$/,
            loader: 'file-loader',
        },
            {
                test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/,
                    /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
                loader: 'file?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        extractCommons,
        extractCSS,
        new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    devtool: "#inline-source-map",
    devServer: {
        port: 3000
    }
}

module.exports = config