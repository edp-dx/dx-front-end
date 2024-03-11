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
		publicPath: 'http://localhost:3002/',
	},
	devServer: {
		port: 3002,
		historyApiFallback: true,
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'dashboard',
			filename: 'remoteEntry.js',
			remotes: {
				sharedReactComponents: 'sharedReactComponents@http://localhost:9999/remoteEntry.js',
			},
			exposes: {
				'./DashboardApp': './src/bootstrap.tsx',
			},
			shared: packagesJson.dependencies,
		}),
		new DefinePlugin(envKeys),
	],
};

module.exports = merge(commonConfig, devConfig);
