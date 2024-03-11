import {
	RESOURCE_PATH_GEN_AI_TASKS,
	RESOURCE_PATH_ISSUES,
	RESOURCE_PATH_WORKFLOWS,
	RESOURCE_PATH_WORKFLOWS_SDLC,
} from '~/api';

import { requestFn } from '..';
import { CreateWorkflowPayload, GenAITasks, Issue, Workflow } from './model';

export const MUTATION_CREATE_WORKFLOW = (payload: CreateWorkflowPayload) => {
	requestFn(RESOURCE_PATH_WORKFLOWS, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const MUTATION_DELETE_WORKFLOW = (appName: string) =>
	requestFn(`${RESOURCE_PATH_WORKFLOWS}/${appName}`, {
		method: 'DELETE',
	});

export const QUERY_WORKFLOWS = () => requestFn<Workflow[]>(RESOURCE_PATH_WORKFLOWS);

export const QUERY_WORKFLOWS_SDLC = () => requestFn<Workflow[]>(RESOURCE_PATH_WORKFLOWS_SDLC);

export const QUERY_GEN_AI_ISSUES = () => requestFn<Issue[]>(RESOURCE_PATH_ISSUES);

export const QUERY_GEN_AI_TASKS = () => requestFn<GenAITasks>(RESOURCE_PATH_GEN_AI_TASKS);
