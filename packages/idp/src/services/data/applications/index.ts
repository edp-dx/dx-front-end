import { RESOURCE_PATH_APPLICATIONS } from '~/api';
import { requestFn } from '~/services/data';

import {
	Application,
	CreateApplicationPayload,
	Technology,
	UpdateApplicationPayload,
} from './model';

export const QUERY_APPLICATIONS = () => requestFn<Application[]>(RESOURCE_PATH_APPLICATIONS);
export const MUTATION_CREATE_APPLICATION = (payload: CreateApplicationPayload) =>
	requestFn(RESOURCE_PATH_APPLICATIONS, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_UPDATE_APPLICATION = (payload: UpdateApplicationPayload) =>
	requestFn(`app/${payload.name}`, {
		method: 'PUT',
		body: JSON.stringify({ description: payload.description, document: payload.document }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const QUERY_DISCOVERED_TECHNOLOGIES = (appName: string) =>
	requestFn<Technology>(`app/${appName}/discovered-technologies`);
