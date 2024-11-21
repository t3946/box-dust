const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './resources/css/main.scss', // Entry point for your SCSS file
    output: {
        filename: 'bundle.js', // Output JavaScript file
        path: path.resolve(__dirname, './public/dist'), // Output directory
    },
    module: {
        rules: [
            {
                test: /\.scss$/, // Match .scss files
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files
                    'css-loader', // Translates CSS into CommonJS
                    'sass-loader', // Compiles Sass to CSS
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css', // Output CSS file name
        }),
    ],
    mode: 'development', // Set to 'production' for production builds
};





const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // Set the mode to development
    entry: [
        'webpack-dev-server/client?http://localhost:8080/', // Connects to the dev server
        'webpack/hot/dev-server', // Enables HMR
        './resources/js/main.js' // Your main entry point
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist'),
        publicPath: '/', // Important for HMR
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true, // Enable HMR on the server
        port: 8080, // Port for the dev server
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Enables HMR globally
        new HtmlWebpackPlugin({
            template: './src/index.html', // Your HTML template
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // Load CSS files
            },
            {
                test: /\.scss$/, // If you're using SCSS
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            // Add other loaders as needed
        ],
    },
};
