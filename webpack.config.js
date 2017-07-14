const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeModules = {};
fs.readdirSync('node_modules')
	.filter( function (x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach( function (mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

const common = {
	plugins: [
	    new HtmlWebpackPlugin({
	      	filename: 'index.html',
	      	template: 'index.html',
	      	chunks: ['frontend-entry'],
	      	excludeChunks: ['backend-entry'],
	      	inject: true,
	      	hash: true
	    })
  	]
};

const frontend = {
	entry: {
		'frontend-entry': './src/index.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'frontend-output.js'
	}
};

const backend = {
	entry: {
		'backend-entry': './server/main.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'backend-output.js'
	},
	target: 'node',
	externals: nodeModules
};

module.exports = [
	Object.assign({}, common, frontend),
	Object.assign({}, common, backend)
];