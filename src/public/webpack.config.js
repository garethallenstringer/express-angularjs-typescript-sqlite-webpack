const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin/lib/index");
const TerserPlugin = require("terser-webpack-plugin");

const path = require("path");

const sourcePath = path.resolve(__dirname, "src");
const distPath = path.resolve(__dirname, "dist");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  const plugins = [
    new HtmlWebPackPlugin({
      template: sourcePath + "/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:4].css",
      chunkFilename: "[id].[contenthash:4].css",
    }),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      checkSyntacticErrors: true,
    }),
  ];

  if (isProd) {
    plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /\/environments\/environment\.ts/, `${sourcePath}/environments/environment.prod.ts`,
      ),
    );
  } else {
    plugins.push(new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin());
  }

  const config = {
    entry: {
      app: sourcePath + "/index.ts",
    },
    output: {
      path: distPath,
      filename: "[name].bundle.[hash:4].js",
      // publicPath: isProd ? "/" : "http://localhost:8080/",
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: "html-loader",
          options: { minimize: true },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "resolve-url-loader"],
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "resolve-url-loader", "sass-loader"],
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                configFile: sourcePath + "/tsconfig.app.json",
                // disable type checker - we will use it in fork plugin
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          loader: "file-loader",
          options: {
            name: "images/[name].[ext]",
          },
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".ts"],
      modules: [
        path.resolve(__dirname, "node_modules"),
        sourcePath,
      ],
    },
    plugins,
    optimization: {
      minimizer: [new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    // devtool: 'eval-source-map',
    devServer: {
      open: "Google Chrome",
      contentBase: distPath,
      hot: true,
      proxy: {
        "/api": {
          target: "http://localhost:3000", // change to https when backend is running over https
          secure: false,
        },
      },
    },
  };

  if (!isProd) {
    config.devtool = "source-map";
  }

  return config;
};
