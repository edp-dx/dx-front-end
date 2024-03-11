import { TechnologyComponent, Template } from '../categories/model';

export interface ApplicationDetails {
	businessUnitName: string;
	gitRepoURL: string;
	pipelineURL: string;
	owner: string;
	claim: string;
	template: Template;
	migrationTemplate: Template;
	specification?: string;
}

export interface Application {
	fake: false;
	application: {
		enterpriseID: number;
		system_id: number;
		name: string;
		document?: string;
		description: string;
		environment: string;
		status: string;
		details: ApplicationDetails;
	};
}

export interface CreateApplicationPayload {
	document: string;
	description: string;
	name: string;
	owner: string;
	businessUnitName: string;
	templateID: number;
	enterpriseOneID: number;
	systemID: number;
}

export interface UpdateApplicationPayload {
	name: string;
	description: string;
	document: string;
}

export interface CreateApplicationResponse {
	gitRepoURL: string;
	pipelineURL: string;
}

export interface Technology {
	buildTool: string;
	deploymentPlatform: string;
	framework: string;
	language: string;
	components: TechnologyComponent[];
}
