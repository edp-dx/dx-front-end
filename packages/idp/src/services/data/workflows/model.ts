import { Application } from '../applications/model';

export interface CreateWorkflowPayload {
	name: string;
	enterpriseOneID: string;
	businessUnitName: string;
	gitRepoURL: string;
	specification: string;
	document: string;
	owner: string;
}

export enum StepStatus {
	Created = 'created',
	InProgress = 'running',
	Finished = 'finished',
	Failed = 'failed',
	Skipped = 'skipped',
}

export enum StepCodes {
	DocGen = 'doc_gen',
	TechDiscovery = 'tech_discovery',
	ApiSpec = 'api_spec',
	TestCases = 'test_cases',
	IntegrationTest = 'integration_test',
}

export interface WorkflowStep {
	order: number;
	status: StepStatus;
	stepCode: StepCodes;
	stepName: string;
	details?: string;
}

export interface Workflow {
	workflowID: string;
	appName: string;
	jiraIssue: string;
	jiraIssueUrl: string;
	prLink?: string;
	steps: Array<WorkflowStep>;
}

export enum IssueStatus {
	Open = 'Open',
	Closed = 'Closed',
	InProgress = 'In Progress',
}

export interface Issue {
	appName: string;
	status: IssueStatus;
	title: string;
	bugNumber: string;
	bugUrl: string;
	jiraIssue: string;
	jiraIssueUrl: string;
}

export type OnboardingReportType = Record<StepCodes, string>;

export interface OnboardingApplication extends Application {
	onboardingReport?: OnboardingReportType;
}

export interface GenAITask {
	jiraIssue: string;
	jiraIssueUrl: string;
	summary: string;
}
export interface GenAITasks {
	[key: string]: Array<GenAITask>;
}
