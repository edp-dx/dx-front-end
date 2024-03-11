import { RESOURCE_PATH_TEMPLATES_MANAGEMENT } from '~/api';
import { requestFn } from '~/services/data';

import { TemplatesManagement, TemplatesManagementPayload } from './model';

export const QUERY_TEMPLATES_MANAGEMENT_LIST = () =>
	requestFn<TemplatesManagement[]>(RESOURCE_PATH_TEMPLATES_MANAGEMENT);

export const MUTATION_CREATE_TEMPLATES_MANAGEMENT = (payload: TemplatesManagementPayload) =>
	requestFn(RESOURCE_PATH_TEMPLATES_MANAGEMENT, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_UPDATE_TEMPLATES_MANAGEMENT = (payload: TemplatesManagementPayload) =>
	requestFn(`${RESOURCE_PATH_TEMPLATES_MANAGEMENT}/${payload.id}`, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_DELETE_TEMPLATES_MANAGEMENT = (payload: number) =>
	requestFn(`${RESOURCE_PATH_TEMPLATES_MANAGEMENT}/${payload}`, {
		method: 'DELETE',
	});
