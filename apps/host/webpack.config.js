const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    context: __dirname,
    mode: "development",
    entry: "./src/index.tsx",
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    output: {
        publicPath: "auto",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "host",
            remotes: {
                remote: "remote@http://localhost:3001/remoteEntry.js",
            },
            shared: {
                react: { singleton: true, eager: true, requiredVersion: false },
                "react-dom": {
                    singleton: true,
                    eager: true,
                    requiredVersion: false,
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
