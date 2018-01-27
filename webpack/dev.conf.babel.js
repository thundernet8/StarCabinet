import path from "path";
import webpack from "webpack";
import baseConf from "./base.conf.babel";
// import electronConfig from "./main.conf.babel";

const plugins = [
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("development")
        }
    }),
    new webpack.HotModuleReplacementPlugin()
];

const loaders = [
    {
        test: /\.css$/,
        include: [/global/, /node_modules/],
        loader: "style-loader!css-loader?sourceMap"
    },
    {
        test: /\.css$/,
        exclude: [/global/, /node_modules/],
        loader:
            "style-loader!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]_[name]__[hash:base64:5]"
    },
    {
        test: /\.less$/,
        include: [/global/, /node_modules/],
        loader: "style-loader!css-loader?sourceMap!less-loader"
    },
    {
        test: /\.less$/,
        exclude: [/global/, /node_modules/],
        loader:
            "style-loader!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]_[name]__[hash:base64:5]!less-loader"
    }
];

const entry = {
    app: ["babel-polyfill", path.resolve(__dirname, "../src/renderer/index.tsx")]
};

const output = {
    path: path.resolve(__dirname, "../app/dist/assets"),
    publicPath: "http://localhost:9001/assets/",
    filename: "js/[name].js",
    chunkFilename: "js/[name].chunk.js"
};

let config = baseConf(plugins, loaders);
config.devtool = "#source-map"; // '#eval-source-map'
config.entry = entry;
config.output = output;
config.devServer = {
    contentBase: path.resolve(__dirname, "../app/dist"),
    compress: true,
    host: "localhost",
    port: 9001,
    hot: true,
    open: true,
    historyApiFallback: {
        index: "index.html"
    }
};

export default config;
