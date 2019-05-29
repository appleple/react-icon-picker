const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  mode: "production",
  entry: {
    'react-icon-picker': './demo'
  },
  output: {
    path: path.resolve(__dirname, 'bundle'),
    publicPath: "bundle",
    filename: '[name].js',
    library: ['ReactIconPicker'],
    libraryExport: "default",
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader'
    }]
  },
  plugins: [
    new CheckerPlugin
  ]
};