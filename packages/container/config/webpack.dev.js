const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const { dependencies } = require('../package.json');
const { swiper, ...sharedDependencies } = dependencies;
const DefinePlugin = require('webpack/lib/DefinePlugin');

//TODO find a way to place swiper into shared dependencies

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
		publicPath: 'http://localhost:3000/',
	},
	devServer: {
		port: 3000,
		historyApiFallback: true,
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'container',
			remotes: {
				idp: 'idp@http://localhost:3001/remoteEntry.js',
				dashboard: 'dashboard@http://localhost:3002/remoteEntry.js',
				configurations: 'configurations@http://localhost:3003/remoteEntry.js',
				learningCenter: 'learningCenter@http://localhost:3004/remoteEntry.js',
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
		new DefinePlugin(envKeys),
	],
};

module.exports = merge(commonConfig, devConfig);
