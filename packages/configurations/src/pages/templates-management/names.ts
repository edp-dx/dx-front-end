import { TemplatesManagementTabs } from './constants';

export const FORM_NAMES = {
	TemplatesManagement: [
		{
			name: 'name',
			category: 'category',
			git_repo_url: 'git_repo_url',
			description: 'description',
			status: 'status',
		},
		{
			template_version: 'template_version',
			workflow_version: 'workflow_version',
			runtime_config_release_note_url: 'runtime_config_release_note_url',
			ia_c_version: 'ia_c_version',
			technology_release_note_url: 'technology_release_note_url',
		},
		{
			deployment_platform: 'deployment_platform',
			language: 'language',
			framework: 'framework',
			build_tool: 'build_tool',
		},
		{
			owners: 'owners',
		},
	],
} as const;

export const FORM_NAMES_TYPES = {
	...FORM_NAMES.TemplatesManagement[TemplatesManagementTabs.generalInfoTab],
	...FORM_NAMES.TemplatesManagement[TemplatesManagementTabs.versionSetTab],
	...FORM_NAMES.TemplatesManagement[TemplatesManagementTabs.technologiesTab],
	...FORM_NAMES.TemplatesManagement[TemplatesManagementTabs.permissionsTab],
} as const;
