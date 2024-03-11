import { API_BASE_URL } from '~/api';

import {
	MUTATION_CREATE_APPLICATION,
	MUTATION_UPDATE_APPLICATION,
	QUERY_APPLICATIONS,
	QUERY_DISCOVERED_TECHNOLOGIES,
} from './applications';
import { CreateApplicationPayload, UpdateApplicationPayload } from './applications/model';
import { QUERY_BUSINESS_UNIT_NAMES } from './business-unit-names';
import { QUERY_TEMPLATE_CATEGORIES } from './categories';
import {
	MUTATION_CREATE_WORKFLOW,
	MUTATION_DELETE_WORKFLOW,
	QUERY_GEN_AI_ISSUES,
	QUERY_GEN_AI_TASKS,
	QUERY_WORKFLOWS,
	QUERY_WORKFLOWS_SDLC,
} from './workflows';
import { CreateWorkflowPayload } from './workflows/model';

//todo add Service tests

interface CustomError extends Error {
	status?: number;
	response?: any;
}

export const requestFn = async <T>(resourcePath: string, options: RequestInit = {}): Promise<T> => {
	const response = await fetch(`${API_BASE_URL}/${resourcePath}`, options);
	if (!response.ok) {
		const error: CustomError = new Error(`Request failed with status ${response.status}`);
		error.status = response.status;
		error.response = await response.json();
		throw error;
	}

	return response?.json?.();
};

export const DataService = {
	async getTemplateCategories() {
		return QUERY_TEMPLATE_CATEGORIES();
	},

	async getApplications() {
		return QUERY_APPLICATIONS();
	},

	async getBusinessUnitNames() {
		return QUERY_BUSINESS_UNIT_NAMES();
	},

	async createApplication(payload: CreateApplicationPayload) {
		return MUTATION_CREATE_APPLICATION(payload);
	},

	async updateApplication(payload: UpdateApplicationPayload) {
		return MUTATION_UPDATE_APPLICATION(payload);
	},

	async createWorkflow(payload: CreateWorkflowPayload) {
		return MUTATION_CREATE_WORKFLOW(payload);
	},

	async getWorkflows() {
		return QUERY_WORKFLOWS();
	},

	async getWorkflowsSDLC() {
		return QUERY_WORKFLOWS_SDLC();
	},

	async getGenAiIssues() {
		return QUERY_GEN_AI_ISSUES();
	},

	async getDiscoveredTechnologies(appName: string) {
		return QUERY_DISCOVERED_TECHNOLOGIES(appName);
	},

	async getGenAITasks() {
		return QUERY_GEN_AI_TASKS();
	},

	async deleteWorkflow(appName: string) {
		return MUTATION_DELETE_WORKFLOW(appName);
	},
};
