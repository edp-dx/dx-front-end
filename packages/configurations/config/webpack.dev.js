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
		publicPath: 'http://localhost:3003/',
	},
	devServer: {
		port: 3003,
		historyApiFallback: true,
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'configurations',
			filename: 'remoteEntry.js',
			remotes: {
				sharedReactComponents: 'sharedReactComponents@http://localhost:9999/remoteEntry.js',
			},
			exposes: {
				'./ConfigurationsApp': './src/bootstrap.tsx',
			},
			shared: packagesJson.dependencies,
		}),
		new DefinePlugin(envKeys),
	],
};

module.exports = merge(commonConfig, devConfig);
