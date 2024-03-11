import { API_BASE_URL } from '~/api';
import { MUTATION_APP_ASSISTANT_SEND_MESSAGE } from '~/services/chat/appAssistant';
import { AppAssistantSendMessagePayload } from '~/services/chat/appAssistant/model';
import { MUTATION_PORTAL_ASSISTANT_SEND_MESSAGE } from '~/services/chat/portalAssistant';
import { PortalAssistantSendMessagePayload } from '~/services/chat/portalAssistant/model';

import { QUERY_GET_CHAT_HISTORY, QUERY_GET_CHAT_HISTORY_SESSION } from './history';
import { ChatHistoryPayload } from './history/model';

//todo add Service tests

interface CustomError extends Error {
	status?: number;
	response?: any;
}

export const requestFn = async <T>(resourcePath: string, options: RequestInit = {}): Promise<T> => {
	const response = await fetch(`${API_BASE_URL}/${resourcePath}`, options);

	if (!response.ok) {
		const error: CustomError = new Error(`Request failed with status ${response.status}`);
		error.status = response.status;
		error.response = await response.json();
		throw error;
	}

	return response.json();
};

export const ChatService = {
	portalAssistantSendMessage(payload: PortalAssistantSendMessagePayload) {
		return MUTATION_PORTAL_ASSISTANT_SEND_MESSAGE(payload);
	},

	appAssistantSendMessage(payload: AppAssistantSendMessagePayload) {
		return MUTATION_APP_ASSISTANT_SEND_MESSAGE(payload);
	},

	getChatHistory(payload: string) {
		return QUERY_GET_CHAT_HISTORY(payload);
	},

	getChatHistorySession(payload: ChatHistoryPayload) {
		return QUERY_GET_CHAT_HISTORY_SESSION(payload);
	},
};
