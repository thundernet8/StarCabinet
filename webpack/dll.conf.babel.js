import path from "path";
import webpack from "webpack";
const AssetsPlugin = require("assets-webpack-plugin");

const isDev = process.env.NODE_ENV !== "production";
const getPlugins = function() {
    let plugins = [
        new webpack.DllPlugin({
            context: __dirname,
            path: "manifest.json",
            name: isDev ? "[name]" : "[name]_[chunkhash:8]"
        }),
        new AssetsPlugin({
            filename: "venders-config.json",
            path: "./"
        }),
        new webpack.HashedModuleIdsPlugin()
    ];

    if (!isDev) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: true
            })
        );
    }
    return plugins;
};

const config = {
    entry: {
        venders: [
            "react",
            "react-dom",
            "react-router-dom",
            "babel-polyfill",
            "classnames",
            "react-document-meta",
            "moment",
            "bluebird",
            "mobx",
            "mobx-react"
        ]
    },
    output: {
        path: path.resolve(__dirname, "../app/dist/assets/js"),
        publicPath: isDev ? "http://localhost:9001/assets/js/" : "./assets/js/",
        filename: isDev ? "[name].js" : "[name].[chunkhash:8].js",
        library: isDev ? "[name]" : "[name]_[chunkhash:8]"
    },
    // target: "electron-renderer",
    resolve: {
        modules: ["node_modules", path.resolve(__dirname, "../src/renderer")]
    },
    plugins: getPlugins()
};

if (isDev) {
    config.devtool = "#source-map"; // '#eval-source-map'
}

export default config;
