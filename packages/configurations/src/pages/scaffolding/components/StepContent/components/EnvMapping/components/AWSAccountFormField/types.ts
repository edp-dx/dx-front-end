import { AWSEnvConfiguration } from '~/services/data/envConfigurations/model';
import { EnvMapping } from '~/services/data/envMapping/model';

export interface AWSAccountFormFieldProps {
	onClose: () => void;
	currentData: EnvMapping;
	awsData: AWSEnvConfiguration[];
}
