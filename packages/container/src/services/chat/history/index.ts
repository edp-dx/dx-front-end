import { RESOURCE_PATH_CHAT_HISTORY_APP, RESOURCE_PATH_CHAT_HISTORY_PORTAL } from '~/api';
import { requestFn } from '~/services/chat';

import { ChatHistoryMessages, ChatHistoryPayload, ChatHistoryResponse } from './model';

export const QUERY_GET_CHAT_HISTORY = (payload: string): Promise<ChatHistoryResponse> => {
	return requestFn(
		payload === 'app' ? RESOURCE_PATH_CHAT_HISTORY_APP : RESOURCE_PATH_CHAT_HISTORY_PORTAL,
	);
};

export const QUERY_GET_CHAT_HISTORY_SESSION = (
	payload: ChatHistoryPayload,
): Promise<ChatHistoryMessages> =>
	requestFn(
		`${
			payload.type === 'app'
				? RESOURCE_PATH_CHAT_HISTORY_APP
				: RESOURCE_PATH_CHAT_HISTORY_PORTAL
		}/${payload.session}`,
	);
