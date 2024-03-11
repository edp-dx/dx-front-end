import React from 'react';
import { useMemo } from 'react';
import { v4 } from 'uuid';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

import { AWSAccountSettings } from '../components/StepContent/components/EnvConfiguration/components/AWSAccountSettings';
import { AzureAccountSettings } from '../components/StepContent/components/EnvConfiguration/components/AzureAccountSetting';
import { GCPAccountSettings } from '../components/StepContent/components/EnvConfiguration/components/GCPAccountSetting';
import { KubernetesAccountSettings } from '../components/StepContent/components/EnvConfiguration/components/KubernetesAccountSettings';

export const useConfigurations = () => {
	const {
		setAWSEnvConfigurationsTemplate,
		setGCPEnvConfigurationsTemplate,
		setAzureEnvConfigurationsTemplate,
		setKubernetesEnvConfigurationsTemplate,
	} = useCreateConfigurationScaffoldingStore();

	return useMemo(
		() => [
			{
				uuid: v4(),
				name: 'AWS Account Settings',
				description:
					'There are no accounts here. Click the Add Account button from the right to add a new account.',
				component: <AWSAccountSettings />,
				button: 'account',
				handleCreateForm: () =>
					setAWSEnvConfigurationsTemplate([
						{
							uuid: v4(),
							active: true,
							label: '',
							accessKeyID: '',
							accessSecretKey: '',
							accountID: '',
						},
					]),
			},
			{
				uuid: v4(),
				name: 'GCP Account Settings',
				description:
					'There are no accounts here. Click the Add Account button from the right to add a new account.',
				component: <GCPAccountSettings />,
				button: 'account',
				handleCreateForm: () =>
					setGCPEnvConfigurationsTemplate([
						{
							uuid: v4(),
							active: true,
							projectID: '',
							projectName: '',
						},
					]),
			},
			{
				uuid: v4(),
				name: 'Azure Account Settings',
				description:
					'There are no accounts here. Click the Add Account button from the right to add a new account.',
				component: <AzureAccountSettings />,
				button: 'account',
				handleCreateForm: () =>
					setAzureEnvConfigurationsTemplate([
						{
							uuid: v4(),
							active: true,
							subscriptionID: '',
							tenantID: '',
							accountLabel: '',
						},
					]),
			},
			{
				uuid: v4(),
				name: 'Kubernetes Cluster Settings',
				description:
					'There are no clusters here. Click the Add Cluster button from the right to add a new cluster.',
				component: <KubernetesAccountSettings />,
				button: 'cluster',
				handleCreateForm: () =>
					setKubernetesEnvConfigurationsTemplate([
						{
							uuid: v4(),
							active: true,
							clusterCert: '',
							clusterHost: '',
							clusterName: '',
							clusterToken: '',
							namespace: '',
						},
					]),
			},
		],
		[
			setAWSEnvConfigurationsTemplate,
			setAzureEnvConfigurationsTemplate,
			setGCPEnvConfigurationsTemplate,
			setKubernetesEnvConfigurationsTemplate,
		],
	);
};
