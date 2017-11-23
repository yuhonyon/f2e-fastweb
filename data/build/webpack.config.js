const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const packageInfo = JSON.parse(fs.readFileSync('./package.json'));

const plugins=[];
let outputFile="fastweb";
let outputDir="dist/"+packageInfo.project;

function resolve(dir) {
  return path.join(__dirname, dir);
}
plugins.push(new CleanWebpackPlugin(
            [outputDir+'/*'],
            {
                root: __dirname,
                verbose: true,
                dry: false
            }
        ));
plugins.push(new ExtractTextPlugin('fastweb.min.css'));

  plugins.push(new UglifyJSPlugin());
  plugins.push(new OptimizeCSSPlugin({
    cssProcessorOptions: {
      safe: true
    }
  }));
  outputFile +='.min.js';


module.exports = {
  entry: {
    app: resolve("./index.js")
  },
  output: {
    path: resolve(outputDir),
    filename: outputFile,
    library: 'fastweb',
    libraryTarget: 'umd',
    umdNamedDefine: true

  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map',
  module: {
    rules: [
     {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('index.js'),resolve('node_modules/@fastweb/')]
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('img/[name].[ext]')
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('media/[name].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolve('fonts/[name].[ext]')
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: plugins
};
