const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/javascripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
   new CopyWebpackPlugin([
     { from: './app/index.html', to: "index.html" },
     { from: './app/index1.html', to: "index1.html" },
     { from: './app/view.html', to: "view.html"},
     {from: './app/manage.html', to: "manage.html"},
     {from: './app/manage_advanced.html', to: "manage_advanced.html"},
     {from: './app/Transaction.html', to: "Transaction.html"}
   ])
  ],
    module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}
