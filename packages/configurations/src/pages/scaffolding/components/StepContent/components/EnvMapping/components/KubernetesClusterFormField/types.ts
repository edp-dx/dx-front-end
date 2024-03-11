import { KubernetesEnvConfiguration } from '~/services/data/envConfigurations/model';
import { EnvMapping } from '~/services/data/envMapping/model';

export interface KubernetesClusterFormFieldProps {
	onClose: () => void;
	currentData: EnvMapping;
	kubernetesData: KubernetesEnvConfiguration[];
}
