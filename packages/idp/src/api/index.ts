export const API_ROOT_URL = process.env.NODE_ENV === 'development' ? process.env.API_ROOT_URL : '';
export const API_BASE_URL = `${API_ROOT_URL}/api/idp/v1`;

export const RESOURCE_PATH_TEMPLATE_CATEGORIES = 'categories';
export const RESOURCE_PATH_APPLICATIONS = 'app';
export const RESOURCE_PATH_BUSINESS_UNIT_NAMES = 'app/business-units';
export const RESOURCE_PATH_WORKFLOWS = 'workflows';
export const RESOURCE_PATH_WORKFLOWS_SDLC = 'aiworkflows';
export const RESOURCE_PATH_ISSUES = 'jira/gen-ai-issues';
export const RESOURCE_PATH_GEN_AI_TASKS = 'jira/gen-ai-tasks';
