export const API_ROOT_URL = process.env.NODE_ENV === 'development' ? process.env.API_ROOT_URL : '';
export const API_BASE_URL = `${API_ROOT_URL}`;

export const RESOURCE_PATH_LOB = '/api/configuration/lob';
export const RESOURCE_PATH_ENV_MANAGEMENT = (lobId: string): string => {
	return `/api/configuration/lob/${lobId}/env`;
};
export const RESOURCE_PATH_ENV_CONFIGURATION = (lobId: string): string => {
	return `/api/configuration/lob/${lobId}`;
};
export const RESOURCE_PATH_ENV_MAPPING = (lobId: string): string => {
	return `/api/configuration/lob/${lobId}/envmap`;
};

export const RESOURCE_PATH_TERRAFORM = (lobId: string): string => {
	return `/api/configuration/lob/${lobId}/terraform`;
};

export const RESOURCE_PATH_TEMPLATES_MANAGEMENT = '/api/template/v1/templates';
