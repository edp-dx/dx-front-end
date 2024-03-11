import { LOB } from '../LOB/model';
import {
	AWSEnvConfiguration,
	AzureEnvConfiguration,
	GCPEnvConfiguration,
	KubernetesEnvConfiguration,
} from '../envConfigurations/model';
import { EnvManagement } from '../envManagement/model';

export interface EnvMapping {
	uuid: string;
	env: EnvManagement;
	awsEnv?: AWSEnvConfiguration;
	gcpEnv?: GCPEnvConfiguration;
	azureEnv?: AzureEnvConfiguration;
	kubernetesEnv?: KubernetesEnvConfiguration;
	lob?: LOB;
}

export interface EnvMappingPayload {
	uuid: string;
	env: string;
	awsEnv?: string;
	gcpEnv?: string;
	azureEnv?: string;
	kubernetesEnv?: string;
}
