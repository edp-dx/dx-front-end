const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packagesJson = require('../package.json');
const exposes = require('./exposes');

const prodConfig = {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/shared-react-components/',
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'sharedReactComponents',
			filename: 'remoteEntry.js',
			exposes,
			shared: packagesJson.dependencies,
		}),
	],
};

module.exports = merge(commonConfig, prodConfig);
