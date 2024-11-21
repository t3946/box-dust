const {merge} = require("webpack-merge");
const path = require("path");
const commonConfig = require('./webpack.common.js');
const fs = require("fs");
const chalk = require("chalk");
const webpack = require("webpack");

const config = {
  entry: {
    app: [path.resolve(__dirname, 'js/index.js')]
  },

  output: {
    path: path.join(__dirname, '../public/dist'),
    publicPath: '/dist/',
    filename: '[name].js',
  },

  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, './css'),
      '@scripts': path.resolve(__dirname, './js'),
    },
  },

  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          const filename = path.join(config.output.path, "/hash");

          fs.writeFile(filename, compilation.hash, function (err) {
            if (err) {
              return console.log(chalk.red(`File write error (${filename})`));
            }
          });
        });
      }
    },
  ]
}

module.exports = merge(commonConfig, config);
