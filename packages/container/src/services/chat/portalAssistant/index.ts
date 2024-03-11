import { RESOURCE_PATH_CHAT_PORTAL_ASSISTANT } from '~/api';
import { requestFn } from '~/services/chat';

import { PortalAssistantSendMessagePayload, PortalAssistantSendMessageResponse } from './model';

export const MUTATION_PORTAL_ASSISTANT_SEND_MESSAGE = (
	payload: PortalAssistantSendMessagePayload,
): Promise<PortalAssistantSendMessageResponse> =>
	requestFn(RESOURCE_PATH_CHAT_PORTAL_ASSISTANT, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers: {
			'Content-Type': 'application/json',
		},
	});
