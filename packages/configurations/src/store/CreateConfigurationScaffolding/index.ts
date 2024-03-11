import { create } from 'zustand';

import { CreateConfigurationScaffoldingStore } from './types';

export const useCreateConfigurationScaffoldingStore = create<CreateConfigurationScaffoldingStore>(
	(set) => ({
		navigationTab: 0,
		setNavigationTab: (value) => {
			set(() => ({
				navigationTab: value,
			}));
		},

		LOBSelection: {
			name: '',
			uuid: '',
		},
		setLOBSelection: (value) => {
			set(() => ({
				LOBSelection: value,
			}));
		},

		AWSEnvConfigurations: [],
		setAWSEnvConfigurations: (value) => {
			set(() => ({
				AWSEnvConfigurations: value,
			}));
		},
		AWSEnvConfigurationsTemplate: [],
		setAWSEnvConfigurationsTemplate: (value) => {
			set(() => ({
				AWSEnvConfigurationsTemplate: value,
			}));
		},

		GCPEnvConfigurations: [],
		setGCPEnvConfigurations: (value) => {
			set(() => ({
				GCPEnvConfigurations: value,
			}));
		},
		GCPEnvConfigurationsTemplate: [],
		setGCPEnvConfigurationsTemplate: (value) => {
			set(() => ({
				GCPEnvConfigurationsTemplate: value,
			}));
		},

		AzureEnvConfigurations: [],
		setAzureEnvConfigurations: (value) => {
			set(() => ({
				AzureEnvConfigurations: value,
			}));
		},
		AzureEnvConfigurationsTemplate: [],
		setAzureEnvConfigurationsTemplate: (value) => {
			set(() => ({
				AzureEnvConfigurationsTemplate: value,
			}));
		},

		KubernetesEnvConfigurations: [],
		setKubernetesEnvConfigurations: (value) => {
			set(() => ({
				KubernetesEnvConfigurations: value,
			}));
		},
		KubernetesEnvConfigurationsTemplate: [],
		setKubernetesEnvConfigurationsTemplate: (value) => {
			set(() => ({
				KubernetesEnvConfigurationsTemplate: value,
			}));
		},
	}),
);
