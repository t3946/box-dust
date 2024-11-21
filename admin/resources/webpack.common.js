const autoprefixer = require('autoprefixer');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const config = {
  mode: 'development',
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['babel-loader', 'source-map-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require("tailwindcss"),
                  autoprefixer({
                    Browserslist: ['ie >= 8', 'last 4 version']
                  }),
                ],
                sourceMap: true
              }
            }
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  optimization: {
    minimizer: [
      // minify works only in production mode or use minimize: true,
      new CssMinimizerPlugin(),
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.sass'],
    modules: [path.join(__dirname, './src'), 'node_modules'],
  },

  plugins: [
    new MiniCssExtractPlugin(),
  ],
}

module.exports = config
