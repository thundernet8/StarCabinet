import path from "path";
import webpack from "webpack";
import SimpleProgressWebpackPlugin from "customized-progress-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import pkg from "../package.json";

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const vendersConfig = require("../venders-config.json");

const getPlugins = function(morePlugins) {
    let plugins = [
        new webpack.BannerPlugin(
            `Generated on ${new Date().toString()}\n\nCopyright 2017-present, WuXueqian. All rights reserved.\n\n@package   ${
                pkg.name
            }\n@version   v${pkg.version}\n@author    ${pkg.author}\n`
        ),
        new webpack.HashedModuleIdsPlugin(),
        new SimpleProgressWebpackPlugin({ format: "compact" }),
        new CopyWebpackPlugin([
            { from: "src/favicon.ico", to: path.resolve(__dirname, "../dist") },
            { from: "src/robots.txt", to: path.resolve(__dirname, "../dist") }
        ]),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("../manifest.json")
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "app"
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, "../dist/index.html"),
            template: "src/index.html",
            inject: true,
            vendersName: vendersConfig.venders.js,
            meta: "",
            htmlDom: "",
            state: ""
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, "../dist/index.ejs"),
            template: "src/index.html",
            inject: true,
            vendersName: vendersConfig.venders.js,
            meta: "<%- meta %>",
            htmlDom: "<%- markup %>",
            state: "<script>window.__INITIAL_STATE__ = <%- initialState %></script>"
        })
    ];

    if (!!process.env.ANALYZE_ENV) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    if (morePlugins) {
        plugins = plugins.concat(morePlugins);
    }

    return plugins;
};

const getRules = function(moreRules) {
    let rules = [
        {
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/
        },
        {
            test: /\.tsx?$/,
            loader: "babel-loader!ts-loader",
            exclude: /node_modules/
        },
        {
            test: /\.json$/,
            loader: "json-loader",
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpg|gif)$/,
            exclude: /node_modules/,
            loader: "url-loader",
            query: {
                limit: 2000,
                name: "img/[name].[ext]" // 'assets/img/[name].[ext]?[hash:7]'
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf|svg)/, // if /\.(woff|woff2|eot|ttf|svg)$/ the font-awesome with url like xx.woff?v=4.7.0 can not be loaded
            exclude: /node_modules/,
            loader: "url-loader",
            query: {
                limit: 10000,
                name: "fonts/[name].[ext]"
            }
        }
    ];

    if (moreRules) {
        rules = rules.concat(moreRules);
    }

    return rules;
};

export default function(morePlugins, moreRules) {
    let config = {
        node: {
            __filename: false,
            __dirname: false
        },
        resolve: {
            extensions: [".json", ".js", ".jsx", ".ts", ".tsx", ".css", ".less"],
            alias: {
                IMG: path.resolve(__dirname, "../src/renderer/assets/images/"),
                STYLES: path.resolve(__dirname, "../src/renderer/assets/styles"),
                FONTS: path.resolve(__dirname, "../src/renderer/assets/fonts")
            },
            modules: ["node_modules", path.resolve(__dirname, "../src/renderer")]
        },
        target: "electron-renderer",
        module: {
            rules: getRules(moreRules)
        },
        plugins: getPlugins(morePlugins)
    };

    return config;
}
