export interface TechnologyComponent {
	name: string;
	properties: {
		name: string;
		value: string;
	}[];
}
export interface Template {
	ID: number;
	categoryID: number;
	categoryName: string;
	buildTool: string;
	description: string;
	deploymentPlatform: string;
	framework: string;
	language: string;
	name: string;
	type: string;
	version: string;
	components: TechnologyComponent[];
	outputs: {
		'Subnets ID': string;
		'VPC ID': string;
	};
}

export interface TemplateCategory {
	ID: number;
	name: string;
	description: string;
	templates: Template[];
}
