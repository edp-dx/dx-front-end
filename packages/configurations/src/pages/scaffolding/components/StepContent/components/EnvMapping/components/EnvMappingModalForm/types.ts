import { EnvMapping } from '~/services/data/envMapping/model';

export interface EnvMappingModalFormProps {
	open?: boolean;
	onClose?: () => void;
	data?: EnvMapping;
}
