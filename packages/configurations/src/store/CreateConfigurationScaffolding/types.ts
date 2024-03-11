import { LOB } from '~/services/data/LOB/model';
import {
	AWSEnvConfiguration,
	AzureEnvConfiguration,
	GCPEnvConfiguration,
	KubernetesEnvConfiguration,
} from '~/services/data/envConfigurations/model';

export interface CreateConfigurationScaffoldingStore {
	navigationTab: number;
	setNavigationTab: (value: number) => void;

	LOBSelection: LOB;
	setLOBSelection: (value: LOB) => void;

	AWSEnvConfigurations: AWSEnvConfiguration[];
	setAWSEnvConfigurations: (value: AWSEnvConfiguration[]) => void;
	AWSEnvConfigurationsTemplate: AWSEnvConfiguration[];
	setAWSEnvConfigurationsTemplate: (value: AWSEnvConfiguration[]) => void;

	GCPEnvConfigurations: GCPEnvConfiguration[];
	setGCPEnvConfigurations: (value: GCPEnvConfiguration[]) => void;
	GCPEnvConfigurationsTemplate: GCPEnvConfiguration[];
	setGCPEnvConfigurationsTemplate: (value: GCPEnvConfiguration[]) => void;

	AzureEnvConfigurations: AzureEnvConfiguration[];
	setAzureEnvConfigurations: (value: AzureEnvConfiguration[]) => void;
	AzureEnvConfigurationsTemplate: AzureEnvConfiguration[];
	setAzureEnvConfigurationsTemplate: (value: AzureEnvConfiguration[]) => void;

	KubernetesEnvConfigurations: KubernetesEnvConfiguration[];
	setKubernetesEnvConfigurations: (value: KubernetesEnvConfiguration[]) => void;
	KubernetesEnvConfigurationsTemplate: KubernetesEnvConfiguration[];
	setKubernetesEnvConfigurationsTemplate: (value: KubernetesEnvConfiguration[]) => void;
}
