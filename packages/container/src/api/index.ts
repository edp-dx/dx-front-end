export const API_ROOT_URL = process.env.NODE_ENV === 'development' ? process.env.API_ROOT_URL : '';
export const API_BASE_URL = `${API_ROOT_URL}/api/chatbot/v1`;

export const RESOURCE_PATH_CHAT_PORTAL_ASSISTANT = 'portalassistant';
export const RESOURCE_PATH_CHAT_APP_ASSISTANT = 'appassistant';
export const RESOURCE_PATH_CHAT_HISTORY_APP = 'appassistant/history';
export const RESOURCE_PATH_CHAT_HISTORY_PORTAL = 'portalassistant/history';
