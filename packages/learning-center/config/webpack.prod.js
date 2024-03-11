const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packagesJson = require('../package.json');

const prodConfig = {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].js',
		publicPath: '/learning-center/',
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'learningCenter',
			filename: 'remoteEntry.js',
			remotes: {
				sharedReactComponents: 'sharedReactComponents@/shared-react-components/remoteEntry.js',
			},
			exposes: {
				'./LearningCenterApp': './src/bootstrap.tsx',
				'./Search': './src/pages/learning-center/components/Search',
				'./SearchList': './src/pages/learning-center/components/SearchList',
				'./NavTabs': './src/pages/learning-center/components/NavTabs',
				'./NavContent': './src/pages/learning-center/components/NavContent',
				'./LearningCenter': './src/store/LearningCenter',
			},
			shared: packagesJson.dependencies,
		}),
	],
};

module.exports = merge(commonConfig, prodConfig);
