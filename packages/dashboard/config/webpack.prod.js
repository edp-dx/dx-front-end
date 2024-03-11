const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packagesJson = require('../package.json');

const prodConfig = {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/dashboard/',
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'dashboard',
			filename: 'remoteEntry.js',
			remotes: {
				sharedReactComponents: 'sharedReactComponents@/shared-react-components/remoteEntry.js',
			},
			exposes: {
				'./DashboardApp': './src/bootstrap.tsx',
			},
			shared: packagesJson.dependencies,
		}),
	],
};

module.exports = merge(commonConfig, prodConfig);
