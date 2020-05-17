const webpack = require("webpack");
const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssets = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output : {
        path : path.resolve(__dirname, "dist"),
        filename : "bundle.js"
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                //exclude: (node_modules|bower_components),
                //loader: "babel-loader"
                use: ["babel-loader"]
            }, 
            {
                test: /\.scss$/,
                //loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
                // use: ExtractTextWebpackPlugin.extract({
                //     fallback: 'style-loader',
                //     use: ['css-loader', 'sass-loader', 'postcss-loader'],
                // })
                use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader', 'postcss-loader'],
                }))
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin("styles.css"),
        //new webpack.HotModuleReplacementPlugin()
        //new UglifyJSPlugin()
        //new OptimizeCSSAssets()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        historyApiFallback: true,
        inline: true,
        open: true,
        hot: true
    },
    devtool: "eval-source-map"
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeCSSAssets()
    );
}