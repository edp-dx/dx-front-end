import { RESOURCE_PATH_LOB } from '~/api';
import { requestFn } from '~/services/data';

import { LOB, LOBPayload } from './model';

export const QUERY_ENV_LOB_LIST = () => requestFn<LOB[]>(RESOURCE_PATH_LOB);

export const MUTATION_CREATE_LOB = (payload: LOBPayload) =>
	requestFn(RESOURCE_PATH_LOB, {
		method: 'POST',
		body: JSON.stringify(payload),
	});
