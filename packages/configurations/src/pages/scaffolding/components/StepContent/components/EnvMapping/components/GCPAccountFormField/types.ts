import { GCPEnvConfiguration } from '~/services/data/envConfigurations/model';
import { EnvMapping } from '~/services/data/envMapping/model';

export interface GCPAccountFormFieldProps {
	onClose: () => void;
	currentData: EnvMapping;
	gcpData: GCPEnvConfiguration[];
}
