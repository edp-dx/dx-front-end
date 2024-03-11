import { Technology } from '~/services/data/applications/model';
import { Template } from '~/services/data/categories/model';

export interface TechnologiesProps {
	businessUnitName: string;
	specification?: string;
	technology: Technology | Template;
	templateName?: string;
	categoryName?: string;
	shouldDisableSpecification?: boolean;
}
