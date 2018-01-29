import * as path from "path";

const electronConfig = {
    node: {
        __filename: false,
        __dirname: false
    },
    target: "electron-renderer", // important
    entry: {
        electron: ["babel-polyfill", "./src/main/index.js"]
    },
    output: {
        filename: "[name].js",
        chunkFilename: "[id].js",
        path: path.resolve(__dirname, "../app/dist"),
        publicPath: "./",
        libraryTarget: "commonjs"
    },
    resolve: {
        extensions: [".js"]
    },
    externals: ["keytar"],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [["env", { targets: "node" }]]
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    }
};

export default electronConfig;
