import { RESOURCE_PATH_TERRAFORM } from '~/api';
import { requestFn } from '~/services/data';

import { Terraform, TerraformPayload } from './model';

export const QUERY_GET_TERRAFORM = (lobId: string) =>
	requestFn<Terraform>(RESOURCE_PATH_TERRAFORM(lobId));

export const MUTATION_CREATE_TERRAFORM = (payload: TerraformPayload, lobId: string) =>
	requestFn(RESOURCE_PATH_TERRAFORM(lobId), {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_DELETE_TERRAFORM = (lobId: string) =>
	requestFn(RESOURCE_PATH_TERRAFORM(lobId), {
		method: 'DELETE',
	});
