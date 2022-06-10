const { DefinePlugin } = require("webpack");
const { merge }= require("webpack-merge");
const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const { server: electronConnect } = require("electron-connect");

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === "development";

const server = isDev
    ? electronConnect.create({
          path: path.join(__dirname, "dist", "main.js"),
          logLevel: 0,
          stopOnClose: true
      })
    : {};

const ConnectPlugin = (isMain = true) => {
    let isStarted = false;

    return {
        apply(compiler) {
            compiler.hooks.done.tap("ConnectPlugin", () => {
                if (isStarted) {
                    server[isMain ? "restart" : "reload"]();
                } else {
                    if (isMain) server.start();
                    isStarted = true;
                }
            });
        }
    };
};

const common = {
    mode: isDev ? "development" : "production",
    devtool: isDev ? "source-map" : false,
    output: {
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".ts"],
        alias: {
            "@": path.join(__dirname, "src"),
            "@@": __dirname
        }
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    plugins: [
        new DefinePlugin({
            NODE_ENV
        })
    ]
};

const main = merge(common, {
    target: "electron-main",
    entry: path.resolve(__dirname, "src", "main", "index.ts"),
    output: {
        filename: "main.js"
    },
    node: {
        __dirname: false,
        __filename: false
    },
    plugins: [...(isDev ? [ConnectPlugin()] : [])]
});

const preload = merge(common, {
    target: "electron-preload",
    entry: path.resolve(__dirname, "src", "preload", "index.ts"),
    output: {
        filename: "preload.js"
    },
    node: {
        __dirname: false,
        __filename: false
    },
    plugins: [...(isDev ? [ConnectPlugin(false)] : [])]
});

const renderer = merge(common, {
    target: "web",
    entry: path.resolve(__dirname, "src", "renderer", "index.ts"),
    output: {
        filename: "renderer.js"
    },
    resolve: {
        extensions: [".json", ".css"],
        alias: {
            "@assets": path.join(__dirname, "src", "renderer", "assets")
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|fnt)$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            title: "Phaser3 Tutorial Game",
            filename: "index.html",
            template: path.resolve(__dirname, "template", "index.html")
        }),
        ...(isDev ? [ConnectPlugin(false)] : [])
    ]
});

exports.default = [renderer, preload, main];
