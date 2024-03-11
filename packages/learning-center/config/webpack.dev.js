const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packagesJson = require('../package.json');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const dotenv = require('dotenv');
const path = require('path');

const currentPath = path.join(__dirname) + '/..';

const envPath = currentPath + '/.env';

const fileEnv = dotenv.config({ path: envPath }).parsed;

const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
	return prev;
}, {});

const devConfig = {
	mode: 'development',
	output: {
		publicPath: 'http://localhost:3004/',
	},
	devServer: {
		port: 3004,
		historyApiFallback: true,
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'learningCenter',
			filename: 'remoteEntry.js',
			remotes: {
				sharedReactComponents: 'sharedReactComponents@http://localhost:9999/remoteEntry.js',
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
		new DefinePlugin(envKeys),
	],
};

module.exports = merge(commonConfig, devConfig);
