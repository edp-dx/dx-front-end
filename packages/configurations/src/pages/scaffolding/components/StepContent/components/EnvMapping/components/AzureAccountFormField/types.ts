import { AzureEnvConfiguration } from '~/services/data/envConfigurations/model';
import { EnvMapping } from '~/services/data/envMapping/model';

export interface AzureAccountFormFieldProps {
	onClose: () => void;
	currentData: EnvMapping;
	azureData: AzureEnvConfiguration[];
}
