export enum TemplatesManagementTabs {
	generalInfoTab = 0,
	versionSetTab = 1,
	technologiesTab = 2,
	permissionsTab = 3,
}

export const TemplateCategoryList = [
	{
		name: 'CloudNative Serverless Application',
		deployment_platform: ['AWS', 'GCP', 'Azure'],
	},
	{
		name: 'Containerized UI Application',
		deployment_platform: ['Kubernetes'],
	},
	{
		name: 'Containerized Microservice',
		deployment_platform: ['Kubernetes'],
	},
	{
		name: 'Relation Database',
		disabled: true,
		deployment_platform: ['AWS', 'GCP', 'Azure'],
	},
	{
		name: 'NoSQL Database',
		disabled: true,
		deployment_platform: ['AWS', 'GCP', 'Azure'],
	},
	{
		name: 'ML and Data processing',
		disabled: true,
		deployment_platform: ['AWS', 'GCP', 'Azure'],
	},
	{
		name: 'Landing Zone',
		disabled: true,
		deployment_platform: ['AWS', 'GCP', 'Azure'],
	},
];

export const LanguageList = [
	{
		name: 'Java',
		frameworks: ['SpringBoot', 'Micronaut'],
		build_tool: ['Maven', 'Gradle'],
	},
	{
		name: 'Python',
		frameworks: ['SAM', 'FastAPI'],
		build_tool: ['SAM', 'Python'],
	},
	{
		name: 'JavaScript',
		frameworks: ['React', 'Angular'],
		build_tool: ['npm'],
	},
];
