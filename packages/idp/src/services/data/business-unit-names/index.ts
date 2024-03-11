import { RESOURCE_PATH_BUSINESS_UNIT_NAMES } from '~/api';
import { requestFn } from '~/services/data';

import { BusinessUnitName } from './model';

export const QUERY_BUSINESS_UNIT_NAMES = () =>
	requestFn<BusinessUnitName>(RESOURCE_PATH_BUSINESS_UNIT_NAMES);
