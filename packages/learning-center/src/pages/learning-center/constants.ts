export const LEARNING_CENTER_CARD_TYPES = {
	ACADEMY: 'academy',
	USE_CASE: 'use_case',
	DOC_AS_CODE: 'doc_as_code',
	TOOL: 'tool',
} as const;

export const LEARNING_CENTER_CARD_TAGS = {
	MANAGE_APP: 'Manage Applications',
	DASHBOARD: 'Dashboard',
} as const;

export enum LEARNING_CENTER_CARD_TABS {
	tool = 0,
	use_case = 1,
	doc_as_code = 0,
	academy = 7,
}
