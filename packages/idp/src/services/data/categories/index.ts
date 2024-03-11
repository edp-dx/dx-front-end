import { RESOURCE_PATH_TEMPLATE_CATEGORIES } from '~/api';
import { requestFn } from '~/services/data';
import { TemplateCategory } from '~/services/data/categories/model';

export const QUERY_TEMPLATE_CATEGORIES = () =>
	requestFn<TemplateCategory[]>(RESOURCE_PATH_TEMPLATE_CATEGORIES);
