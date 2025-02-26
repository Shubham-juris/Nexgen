const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // Entry point for your React application
    entry: './src/index.js',

    // Output settings
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[contenthash].js',
      publicPath: '/', // Important for client-side routing
    },

    // Resolve file extensions
    resolve: {
      extensions: ['.js', '.jsx'],
    },

    module: {
      rules: [
        // Babel loader to transpile JavaScript/JSX files
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        // CSS loader and style loader
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // File loader for images and fonts
        {
          test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/,
          use: 'file-loader',
        },
      ],
    },

    plugins: [
      // Plugin to generate the index.html file in /dist
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
      }),
    ],

    // Configuration for webpack-dev-server (used in development)
    // In production on your Plesk server, you'll be serving the built files
    devServer: {
      historyApiFallback: true, // This rewrites all routes to index.html for client-side routing
      compress: true,
      port: 3000,
      // Disable hot module replacement if you wish to remove live reload errors
      hot: false,
      liveReload: false,
      // Overlay for errors or warnings
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },

    // Source maps for easier debugging
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};
