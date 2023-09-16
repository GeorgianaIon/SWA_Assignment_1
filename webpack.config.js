// webpack.config.js

const path = require('path');

module.exports = {
  entry: {
        latest: './src/scripts/weather-data.js',
        forecast: './src/scripts/weather-forecast.js',
        sender:'./src/scripts/send-weather-data.js'
    }, // Specify your entry point
  output: {
    filename: '[name].js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply loader to .js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for transpilation
          options: {
            presets: ['@babel/preset-env'], // Babel preset
          },
        },
      },
    ],
  },
};
