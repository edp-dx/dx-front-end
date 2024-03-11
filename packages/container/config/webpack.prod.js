const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const { dependencies } = require('../package.json');
const { swiper, ...sharedDependencies } = dependencies;

//TODO find a way to place swiper into shared dependencies

const prodConfig = {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/',
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'container',
			remotes: {
				idp: 'idp@/idp/remoteEntry.js',
				dashboard: 'dashboard@/dashboard/remoteEntry.js',
				configurations: 'configurations@/configurations/remoteEntry.js',
				learningCenter: 'learningCenter@/learning-center/remoteEntry.js',
			},
			shared: {
				...sharedDependencies,
				react: {
					singleton: true,
					requiredVersion: sharedDependencies.react,
				},
				'react-dom': {
					singleton: true,
					requiredVersion: sharedDependencies['react-dom'],
				},
				'react-router-dom': {
					singleton: true,
					requiredVersion: sharedDependencies['react-router-dom'],
				},
			},
		}),
	],
};

module.exports = merge(commonConfig, prodConfig);
