import { RESOURCE_PATH_CHAT_APP_ASSISTANT } from '~/api';
import { requestFn } from '~/services/chat';

import { AppAssistantSendMessagePayload, AppAssistantSendMessageResponse } from './model';

export const MUTATION_APP_ASSISTANT_SEND_MESSAGE = (
	payload: AppAssistantSendMessagePayload,
): Promise<AppAssistantSendMessageResponse> =>
	requestFn(RESOURCE_PATH_CHAT_APP_ASSISTANT, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});
