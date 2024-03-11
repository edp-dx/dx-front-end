import { API_BASE_URL } from '~/api';

import {
	MUTATION_CREATE_TERRAFORM,
	MUTATION_DELETE_TERRAFORM,
	QUERY_GET_TERRAFORM,
} from './CDEnvConfiguration';
import { TerraformPayload } from './CDEnvConfiguration/model';
import { MUTATION_CREATE_LOB, QUERY_ENV_LOB_LIST } from './LOB';
import { LOBPayload } from './LOB/model';
import {
	MUTATION_CREATE_ENV_CONFIGURATION_AWS,
	MUTATION_CREATE_ENV_CONFIGURATION_AZURE,
	MUTATION_CREATE_ENV_CONFIGURATION_GCP,
	MUTATION_CREATE_ENV_CONFIGURATION_KUBERNETES,
	MUTATION_DELETE_ENV_CONFIGURATION_AWS,
	MUTATION_DELETE_ENV_CONFIGURATION_AZURE,
	MUTATION_DELETE_ENV_CONFIGURATION_GCP,
	MUTATION_DELETE_ENV_CONFIGURATION_KUBERNETES,
	MUTATION_UPDATE_ENV_CONFIGURATION_AWS,
	MUTATION_UPDATE_ENV_CONFIGURATION_AZURE,
	MUTATION_UPDATE_ENV_CONFIGURATION_GCP,
	MUTATION_UPDATE_ENV_CONFIGURATION_KUBERNETES,
	QUERY_ENV_CONFIGURATION_AWS_LIST,
	QUERY_ENV_CONFIGURATION_AZURE_LIST,
	QUERY_ENV_CONFIGURATION_GCP_LIST,
	QUERY_ENV_CONFIGURATION_KUBERNETES_LIST,
} from './envConfigurations';
import {
	AWSEnvConfiguration,
	AzureEnvConfigurationPayload,
	GCPEnvConfigurationPayload,
	KubernetesEnvConfigurationPayload,
} from './envConfigurations/model';
import {
	MUTATION_CREATE_ENV_MANAGEMENT,
	MUTATION_DELETE_ENV_MANAGEMENT,
	MUTATION_UPDATE_ENV_MANAGEMENT,
	QUERY_ENV_MANAGEMENT_LIST,
} from './envManagement';
import { EnvManagementPayload } from './envManagement/model';
import {
	MUTATION_CREATE_ENV_MAPPING,
	MUTATION_DELETE_ENV_MAPPING,
	MUTATION_UPDATE_ENV_MAPPING,
	QUERY_ENV_MAPPING_LIST,
} from './envMapping';
import { EnvMappingPayload } from './envMapping/model';
import {
	MUTATION_CREATE_TEMPLATES_MANAGEMENT,
	MUTATION_DELETE_TEMPLATES_MANAGEMENT,
	MUTATION_UPDATE_TEMPLATES_MANAGEMENT,
	QUERY_TEMPLATES_MANAGEMENT_LIST,
} from './templateManagement';
import { TemplatesManagementPayload } from './templateManagement/model';

//todo add Service tests

interface CustomError extends Error {
	status?: number;
	response?: any;
}

export const requestFn = async <T>(resourcePath: string, options: RequestInit = {}): Promise<T> => {
	const response = await fetch(`${API_BASE_URL}${resourcePath}`, options);

	if (!response.ok) {
		const error: CustomError = new Error(`Request failed with status ${response.status}`);
		error.status = response.status;
		error.response = await response.json();
		throw error;
	}

	return await response.json();
};

export const DataService = {
	async getLOBList() {
		return QUERY_ENV_LOB_LIST();
	},

	async createLOB(payload: LOBPayload) {
		return MUTATION_CREATE_LOB(payload);
	},

	async getEnvManagementList(lobId: string) {
		return QUERY_ENV_MANAGEMENT_LIST(lobId);
	},

	async createEnvManagement(payload: EnvManagementPayload, lobId: string) {
		return MUTATION_CREATE_ENV_MANAGEMENT(payload, lobId);
	},

	async updateEnvManagement(payload: EnvManagementPayload, lobId: string) {
		return MUTATION_UPDATE_ENV_MANAGEMENT(payload, lobId);
	},

	async deleteEnvManagement(payload: string, lobId: string) {
		return MUTATION_DELETE_ENV_MANAGEMENT(payload, lobId);
	},

	async getEnvConfigurationAWSList(lobId: string) {
		return QUERY_ENV_CONFIGURATION_AWS_LIST(lobId);
	},

	async createEnvConfigurationAWS(payload: AWSEnvConfiguration, lobId: string) {
		return MUTATION_CREATE_ENV_CONFIGURATION_AWS(payload, lobId);
	},

	async updateEnvConfigurationAWS(payload: AWSEnvConfiguration, lobId: string) {
		return MUTATION_UPDATE_ENV_CONFIGURATION_AWS(payload, lobId);
	},

	async deleteEnvConfigurationAWS(payload: string, lobId: string) {
		return MUTATION_DELETE_ENV_CONFIGURATION_AWS(payload, lobId);
	},

	async getEnvConfigurationGCPList(lobId: string) {
		return QUERY_ENV_CONFIGURATION_GCP_LIST(lobId);
	},

	async createEnvConfigurationGCP(payload: GCPEnvConfigurationPayload, lobId: string) {
		return MUTATION_CREATE_ENV_CONFIGURATION_GCP(payload, lobId);
	},

	async updateEnvConfigurationGCP(payload: GCPEnvConfigurationPayload, lobId: string) {
		return MUTATION_UPDATE_ENV_CONFIGURATION_GCP(payload, lobId);
	},

	async deleteEnvConfigurationGCP(payload: string, lobId: string) {
		return MUTATION_DELETE_ENV_CONFIGURATION_GCP(payload, lobId);
	},

	async getEnvConfigurationAzureList(lobId: string) {
		return QUERY_ENV_CONFIGURATION_AZURE_LIST(lobId);
	},

	async createEnvConfigurationAzure(payload: AzureEnvConfigurationPayload, lobId: string) {
		return MUTATION_CREATE_ENV_CONFIGURATION_AZURE(payload, lobId);
	},

	async updateEnvConfigurationAzure(payload: AzureEnvConfigurationPayload, lobId: string) {
		return MUTATION_UPDATE_ENV_CONFIGURATION_AZURE(payload, lobId);
	},

	async deleteEnvConfigurationAzure(payload: string, lobId: string) {
		return MUTATION_DELETE_ENV_CONFIGURATION_AZURE(payload, lobId);
	},

	async getEnvConfigurationKubernetesList(lobId: string) {
		return QUERY_ENV_CONFIGURATION_KUBERNETES_LIST(lobId);
	},

	async createEnvConfigurationKubernetes(
		payload: KubernetesEnvConfigurationPayload,
		lobId: string,
	) {
		return MUTATION_CREATE_ENV_CONFIGURATION_KUBERNETES(payload, lobId);
	},

	async updateEnvConfigurationKubernetes(
		payload: KubernetesEnvConfigurationPayload,
		lobId: string,
	) {
		return MUTATION_UPDATE_ENV_CONFIGURATION_KUBERNETES(payload, lobId);
	},

	async deleteEnvConfigurationKubernetes(payload: string, lobId: string) {
		return MUTATION_DELETE_ENV_CONFIGURATION_KUBERNETES(payload, lobId);
	},

	async getEnvMappingList(lobId: string) {
		return QUERY_ENV_MAPPING_LIST(lobId);
	},

	async createEnvMapping(payload: EnvMappingPayload, lobId: string) {
		return MUTATION_CREATE_ENV_MAPPING(payload, lobId);
	},

	async updateEnvMapping(payload: EnvMappingPayload, lobId: string) {
		return MUTATION_UPDATE_ENV_MAPPING(payload, lobId);
	},

	async deleteEnvMapping(payload: string, lobId: string) {
		return MUTATION_DELETE_ENV_MAPPING(payload, lobId);
	},

	async getTerraform(lobId: string) {
		return QUERY_GET_TERRAFORM(lobId);
	},

	async createTerraform(payload: TerraformPayload, lobId: string) {
		return MUTATION_CREATE_TERRAFORM(payload, lobId);
	},

	async deleteTerraform(lobId: string) {
		return MUTATION_DELETE_TERRAFORM(lobId);
	},

	async getTemplatesManagementList() {
		return QUERY_TEMPLATES_MANAGEMENT_LIST();
	},

	async createTemplatesManagement(payload: TemplatesManagementPayload) {
		return MUTATION_CREATE_TEMPLATES_MANAGEMENT(payload);
	},

	async updateTemplatesManagement(payload: TemplatesManagementPayload) {
		return MUTATION_UPDATE_TEMPLATES_MANAGEMENT(payload);
	},

	async deleteTemplatesManagement(payload: number) {
		return MUTATION_DELETE_TEMPLATES_MANAGEMENT(payload);
	},
};
