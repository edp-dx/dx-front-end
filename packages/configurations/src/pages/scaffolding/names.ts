export const FORM_NAMES = {
	LOB: {
		name: 'name',
	},
	ENV: {
		name: 'name',
		description: 'description',
		classification: 'classification',
	},
	AWS: {
		accountID: 'accountID',
		accessKeyID: 'accessKeyID',
		accessSecretKey: 'accessSecretKey',
		label: 'label',
	},
	GCP: {
		projectName: 'projectName',
		projectID: 'projectID',
	},
	Azure: {
		tenantID: 'tenantID',
		subscriptionID: 'subscriptionID',
		accountLabel: 'accountLabel',
	},
	Kubernetes: {
		clusterName: 'clusterName',
		clusterHost: 'clusterHost',
		clusterCert: 'clusterCert',
		clusterToken: 'clusterToken',
		namespace: 'namespace',
	},
	Mapping: {
		env: 'env',
		awsEnv: 'awsEnv',
		gcpEnv: 'gcpEnv',
		azureEnv: 'azureEnv',
		kubernetesEnv: 'kubernetesEnv',
	},
	CDEnvConfiguration: {
		sonarQubeURL: 'sonarQubeURL',
		nexusURL: 'nexusURL',
		blackDuckURL: 'blackDuckURL',
		apiToken: 'apiToken',
		hostURL: 'hostURL',
		namespace: 'namespace',
	},
} as const;
