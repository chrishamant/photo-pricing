const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isDev = process.env.NODE_ENV !== 'production'

/*****************
 * 
 *    PLUGINS
 * 
 *****************/

//this is the magic that creates the `index.html` page
var html_base =  new HtmlWebpackPlugin({
  template : "!!apply-loader!pug-loader!templates/base.pug"
})

var extract_css = new MiniCssExtractPlugin({
//  filename: isDev ? '[name].css' : '[name].[hash].css',
//  chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
})

var vue_plugin = new VueLoaderPlugin()


var plugins = [html_base,extract_css,vue_plugin]


/*****************
 * 
 *    Loader Rules
 * 
 *****************/

var css_rule = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    },
    "css-loader",
    "sass-loader",
  ]
}
var stylus_rule = {
  test: /\.styl$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: "../"
      }
    },
    "css-loader",
    "stylus-loader"
  ]
}

var template_rule = {
  test: /\.pug$/,
  oneOf: [
    // this applies to `<template lang="pug">` in Vue components
    {
      resourceQuery: /^\?vue/,
      use: ["pug-plain-loader"]
    },
    // this applies to pug imports inside JavaScript
    {
      use: {loader: "pug-loader"}
    }
  ]
}

var javascript_rule = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"]
    }
  }
}

var vue_rule = {
  test: /\.vue$/,
  loader: 'vue-loader'
}

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./src/app.js",
    output: {
      filename: "main.js"
    },
    resolve: {
      extensions: [".pug",".js",".vue","styl","scss"]
    },
    module: {
      rules: [
        template_rule,
        css_rule,
        javascript_rule,
        stylus_rule,
        vue_rule
      ]
    },
    plugins: plugins
  };