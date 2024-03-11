import { LOB } from '../LOB/model';

export interface AWSEnvConfiguration {
	uuid: string;
	accountID: string;
	accessKeyID: string;
	accessSecretKey: string;
	label: string;
	active?: boolean;
	lob?: LOB;
}

export interface AWSEnvConfigurationPayload {
	uuid: string;
	accountID: string;
	accessKeyID: string;
	accessSecretKey: string;
	label: string;
}

export interface GCPEnvConfiguration {
	uuid: string;
	projectName: string;
	projectID: string;
	active?: boolean;
	lob?: LOB;
}

export interface GCPEnvConfigurationPayload {
	uuid: string;
	projectName: string;
	projectID: string;
}

export interface AzureEnvConfiguration {
	uuid: string;
	tenantID: string;
	subscriptionID: string;
	accountLabel: string;
	active?: boolean;
	lob?: LOB;
}

export interface AzureEnvConfigurationPayload {
	uuid: string;
	tenantID: string;
	subscriptionID: string;
	accountLabel: string;
}

export interface KubernetesEnvConfiguration {
	uuid: string;
	clusterName: string;
	clusterHost: string;
	clusterCert: string;
	clusterToken: string;
	namespace: string;
	active?: boolean;
	lob?: LOB;
}

export interface KubernetesEnvConfigurationPayload {
	uuid: string;
	clusterName: string;
	clusterHost: string;
	clusterCert: string;
	clusterToken: string;
	namespace: string;
}
