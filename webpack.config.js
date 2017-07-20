const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeModules = {};
fs.readdirSync('node_modules')
	.filter( function (x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach( function (mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});


module.exports = {
	entry: {
		'frontend-entry': [ './server/dev-client.js', './src/js/index.js']
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'frontend-output.js'
	},
	devtool: '#inline-source-map',
	module: {
		rules: [
			{
		        test: /\.js$/,
		        loader: 'babel',
		        include: ['src']
		    },
		    {
	            test: /\.css$/,
	            use: ExtractTextPlugin.extract({
	                fallback: 'style-loader',
	                use: 'css-loader'
	            })
	        }
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	    new HtmlWebpackPlugin({
	      	filename: 'index.html',
	      	template: 'index.html',
	      	inject: true
	    }),
	    new ExtractTextPlugin('bundle.css')
  	]
};