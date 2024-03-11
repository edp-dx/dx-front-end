import { RESOURCE_PATH_ENV_MAPPING } from '~/api';
import { requestFn } from '~/services/data';

import { EnvMapping, EnvMappingPayload } from './model';

export const QUERY_ENV_MAPPING_LIST = (lobId: string) =>
	requestFn<EnvMapping[]>(RESOURCE_PATH_ENV_MAPPING(lobId));

export const MUTATION_CREATE_ENV_MAPPING = (payload: EnvMappingPayload, lobId: string) =>
	requestFn(RESOURCE_PATH_ENV_MAPPING(lobId), {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_UPDATE_ENV_MAPPING = (payload: EnvMappingPayload, lobId: string) =>
	requestFn(`${RESOURCE_PATH_ENV_MAPPING(lobId)}/${payload.uuid}`, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_DELETE_ENV_MAPPING = (payload: string, lobId: string) =>
	requestFn(`${RESOURCE_PATH_ENV_MAPPING(lobId)}/${payload}`, {
		method: 'DELETE',
	});
