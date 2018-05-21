// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {

//   entry: path.join(__dirname, './react-client/src/index.jsx'),
//   output: {
//     path: path.join(__dirname, './react-client/dist'),
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader'
//         },
//       }
//     ]
//   },
//   // entry: ['babel-polyfill', path.join(__dirname, './react-client/dist/index.html')],

//   // output: {
//   //   filename: 'bundle.js'       
//   // },

//   // module: {
//   //   loaders: [
//   //     { test: /\.jsx?$/, loader: 'babel', }
//   //   ]
//   // },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.join(__dirname, './react-client/src/index_template.html')
//     })
//   ]
// };