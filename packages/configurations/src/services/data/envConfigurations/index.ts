import { RESOURCE_PATH_ENV_CONFIGURATION } from '~/api';
import { requestFn } from '~/services/data';

import {
	AWSEnvConfiguration,
	AzureEnvConfiguration,
	AzureEnvConfigurationPayload,
	GCPEnvConfiguration,
	GCPEnvConfigurationPayload,
	KubernetesEnvConfiguration,
	KubernetesEnvConfigurationPayload,
} from './model';

//AWS
export const QUERY_ENV_CONFIGURATION_AWS_LIST = (lobId: string) =>
	requestFn<AWSEnvConfiguration[]>(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/aws`);

export const MUTATION_CREATE_ENV_CONFIGURATION_AWS = (
	payload: AWSEnvConfiguration,
	lobId: string,
) =>
	requestFn(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/aws`, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_UPDATE_ENV_CONFIGURATION_AWS = (
	payload: AWSEnvConfiguration,
	lobId: string,
) =>
	requestFn(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/aws/${payload.uuid}`, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_DELETE_ENV_CONFIGURATION_AWS = (payload: string, lobId: string) =>
	requestFn(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/aws/${payload}`, {
		method: 'DELETE',
	});

//GCP
export const QUERY_ENV_CONFIGURATION_GCP_LIST = (lobId: string) =>
	requestFn<GCPEnvConfiguration[]>(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/gcp`);

export const MUTATION_CREATE_ENV_CONFIGURATION_GCP = (
	payload: GCPEnvConfigurationPayload,
	lobId: string,
) =>
	requestFn(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/gcp`, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_UPDATE_ENV_CONFIGURATION_GCP = (
	payload: GCPEnvConfigurationPayload,
	lobId: string,
) =>
	requestFn(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/gcp/${payload.uuid}`, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_DELETE_ENV_CONFIGURATION_GCP = (payload: string, lobId: string) =>
	requestFn(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/gcp/${payload}`, {
		method: 'DELETE',
	});

//AZURE
export const QUERY_ENV_CONFIGURATION_AZURE_LIST = (lobId: string) =>
	requestFn<AzureEnvConfiguration[]>(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/azure`);

export const MUTATION_CREATE_ENV_CONFIGURATION_AZURE = (
	payload: AzureEnvConfigurationPayload,
	lobId: string,
) =>
	requestFn(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/azure`, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_UPDATE_ENV_CONFIGURATION_AZURE = (
	payload: AzureEnvConfigurationPayload,
	lobId: string,
) =>
	requestFn(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/azure/${payload.uuid}`, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_DELETE_ENV_CONFIGURATION_AZURE = (payload: string, lobId: string) =>
	requestFn(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/azure/${payload}`, {
		method: 'DELETE',
	});

//KUBERNETES
export const QUERY_ENV_CONFIGURATION_KUBERNETES_LIST = (lobId: string) =>
	requestFn<KubernetesEnvConfiguration[]>(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/kubernetes`);

export const MUTATION_CREATE_ENV_CONFIGURATION_KUBERNETES = (
	payload: KubernetesEnvConfigurationPayload,
	lobId: string,
) =>
	requestFn(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/kubernetes`, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_UPDATE_ENV_CONFIGURATION_KUBERNETES = (
	payload: KubernetesEnvConfigurationPayload,
	lobId: string,
) =>
	requestFn(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/kubernetes/${payload.uuid}`, {
		method: 'PUT',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const MUTATION_DELETE_ENV_CONFIGURATION_KUBERNETES = (payload: string, lobId: string) =>
	requestFn(`${RESOURCE_PATH_ENV_CONFIGURATION(lobId)}/kubernetes/${payload}`, {
		method: 'DELETE',
	});
