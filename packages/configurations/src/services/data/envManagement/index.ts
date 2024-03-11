import { RESOURCE_PATH_ENV_MANAGEMENT } from '~/api';
import { requestFn } from '~/services/data';

import { EnvManagement, EnvManagementPayload } from './model';

export const QUERY_ENV_MANAGEMENT_LIST = (lobId: string) =>
	requestFn<EnvManagement[]>(RESOURCE_PATH_ENV_MANAGEMENT(lobId));

export const MUTATION_CREATE_ENV_MANAGEMENT = (payload: EnvManagementPayload, lobId: string) =>
	requestFn(RESOURCE_PATH_ENV_MANAGEMENT(lobId), {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_UPDATE_ENV_MANAGEMENT = (payload: EnvManagementPayload, lobId: string) =>
	requestFn(`${RESOURCE_PATH_ENV_MANAGEMENT(lobId)}/${payload.uuid}`, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_DELETE_ENV_MANAGEMENT = (payload: string, lobId: string) =>
	requestFn(`${RESOURCE_PATH_ENV_MANAGEMENT(lobId)}/${payload}`, {
		method: 'DELETE',
	});
