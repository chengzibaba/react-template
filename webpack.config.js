// const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = function config() {
  // console.log(arguments);
  return {
    output: {
      filename: '[id].[chunkhash].js',
    },
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
            {
              loader: 'eslint-loader',
              options: { fix: true },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64]',
                sourceMap: true,
                minimize: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.ejs',
        filename: './index.html',
      }),
      new CleanWebpackPlugin(['dist']),
      new CopyWebpackPlugin([
        {
          from: './public',
          to: './',
        },
      ]),
      new UglifyjsWebpackPlugin({
        uglifyOptions: {
          parallel: true,
          compress: {
            warnings: false, // 去除warning警告
            dead_code: true, // 去除不可达代码
            drop_debugger: true, // 发布时去除debugger语句
            drop_console: true, // 发布时去除console语句
          },
          sourceMap: true,
        },
      }),
    ],
  };
};
