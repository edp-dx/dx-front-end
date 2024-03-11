export interface TemplatesManagement {
	id: number;
	name: string;
	description: string;
	category: string;
	status: string;
	git_repo_url: string;
	ia_c_version: string;
	runtime_config_release_note_url: string;
	deployment_platform: string;
	language: string;
	framework: string;
	build_tool: string;
	technology_release_note_url: string;
	template_version: string;
	workflow_version: string;
	owners: string[];
}

export interface TemplatesManagementPayload {
	id?: number;
	name: string;
	description: string;
	category: string;
	status: string;
	git_repo_url: string;
	ia_c_version: string;
	runtime_config_release_note_url: string;
	deployment_platform: string;
	language: string;
	framework: string;
	build_tool: string;
	technology_release_note_url: string;
	template_version: string;
	workflow_version: string;
	owners: string[];
}
