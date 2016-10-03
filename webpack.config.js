var path=require("path");

module.exports  = {
  entry: path.join(__dirname, 'webpack', 'index.js'), // We'll create this file later, when we write the frontend code
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/, // Use the style-loader for all .css files
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, // Use the file-loader for fonts
        loaders: ['file-loader']
      }
    ]
  }
};

