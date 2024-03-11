const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packagesJson = require('../package.json');

const prodConfig = {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/idp/',
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'idp',
			filename: 'remoteEntry.js',
			remotes: {
				sharedReactComponents:
					'sharedReactComponents@/shared-react-components/remoteEntry.js',
			},
			exposes: {
				'./IDPApp': './src/bootstrap.tsx',
			},
			shared: {
				...packagesJson.dependencies,
				react: {
					singleton: true,
					requiredVersion: packagesJson.dependencies.react,
				},
				'react-dom': {
					singleton: true,
					requiredVersion: packagesJson.dependencies['react-dom'],
				},
				'react-router-dom': {
					singleton: true,
					requiredVersion: packagesJson.dependencies['react-router-dom'],
				},
			},
		}),
	],
};

module.exports = merge(commonConfig, prodConfig);
