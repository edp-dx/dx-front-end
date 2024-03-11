import { CreateWorkflowPayload } from '~/services/data/workflows/model';

export const SPECIFICATION_LENGTH = 6000;

export const URL_VALIDATION_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;
export const EMAIL_VALIDATION_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const NAME_VALIDATION_REGEX = /^[a-z](?!.*--[^-])[a-z0-9-]*[a-z0-9]$/;

export const FORM_LABELS = {
	NAME: 'Application name',
	ENTERPRISE_ID: 'Enterprise UID',
	BUSINESS_UNIT_NAME: 'Business Unit Name',
	GIT_REPO_URL: 'Git Repo URL',
	SPECIFICATION: 'Functional & NFR Specification',
	CONFLUENCE_URL: 'Confluence Namespace URL',
	OWNER: 'Owner Email',
};

export const FORM_KEYS: Record<string, keyof CreateWorkflowPayload> = {
	NAME: 'name',
	ENTERPRISE_ID: 'enterpriseOneID',
	BUSINESS_UNIT_NAME: 'businessUnitName',
	GIT_REPO_URL: 'gitRepoURL',
	SPECIFICATION: 'specification',
	CONFLUENCE_URL: 'document',
	OWNER: 'owner',
};

export const VALIDATION_MESSAGES = {
	NAME: {
		REQUIRED: 'Enter The Application Name',
		PATTERN:
			'Application name must be not less than two characters long. It must contain only lowercase letters, numbers, and dashes. It cannot start or end with a dash, cannot have whitespaces and cannot have more than one dash between sub-strings',
	},
	REPO_URL: {
		REQUIRED: 'Enter Git Repository Link',
		PATTERN: 'Unavailable URL',
	},
	ENTERPRISE_ID: {
		REQUIRED: 'Enter Enterprise Unique ID',
	},
	BUSINESS_UNIT_NAME: {
		REQUIRED: 'Select Business Unit Name',
	},
	OWNER: {
		REQUIRED: 'Enter Owner Email',
		PATTERN: 'Enter valid email',
	},
};
