import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { shallow } from 'zustand/shallow';
import { ChatService } from '~/services/chat';
import {
	AppAssistantSendMessagePayload,
	AppAssistantSendMessageResponse,
} from '~/services/chat/appAssistant/model';
import { REQUEST_KEY_APP_ASSISTANT_SEND_MESSAGE } from '~/services/chat/appAssistant/requestKeys';
import { REQUEST_KEY_GET_CHAT_HISTORY } from '~/services/chat/history/requestKeys';
import {
	PortalAssistantSendMessagePayload,
	PortalAssistantSendMessageResponse,
} from '~/services/chat/portalAssistant/model';
import { REQUEST_KEY_PORTAL_ASSISTANT_SEND_MESSAGE } from '~/services/chat/portalAssistant/requestKeys';
import { useAIChatBotStore } from '~/store/AIChatBot';
import {
	SESSION_STORAGE_CHAT_SESSION_ID_APP_ASSISTANT,
	SESSION_STORAGE_CHAT_SESSION_ID_PORTAL_ASSISTANT,
} from '~/store/AIChatBot/constants';
import {
	CHAT_CONTEXT,
	CHAT_MESSAGE_TYPE,
	ChatContextType,
	MESSAGE_FROM,
} from '~/store/AIChatBot/types';

import { useScrollToBottom } from './useScrollToBottom';

interface sendMessageProps {
	payload?: {
		content?: string;
		[key: string]: any;
	};
	context?: ChatContextType;
	callback?: () => void;
}

export const useSendMessage = () => {
	const { contextType, setMessage, setIsLoading, sessionIDS, setSessionIDS } = useAIChatBotStore(
		(state) => ({
			contextType: state.contextType,
			historySession: state.historySession,
			setMessage: state.setMessage,
			setIsLoading: state.setIsLoading,
			sessionIDS: state.sessionIDS,
			setSessionIDS: state.setSessionIDS,
		}),
		shallow,
	);
	const queryClient = useQueryClient();

	const sendPortalAssistantMessageMutation = useMutation<
		PortalAssistantSendMessageResponse,
		Error,
		PortalAssistantSendMessagePayload
	>(REQUEST_KEY_PORTAL_ASSISTANT_SEND_MESSAGE, async (payload) =>
		ChatService.portalAssistantSendMessage({
			session: sessionIDS.portal,
			...payload,
		}),
	);

	const sendAppAssistantMessageMutation = useMutation<
		AppAssistantSendMessageResponse,
		Error,
		AppAssistantSendMessagePayload
	>(REQUEST_KEY_APP_ASSISTANT_SEND_MESSAGE, async (payload) =>
		ChatService.appAssistantSendMessage({
			session: sessionIDS.app,
			...payload,
		}),
	);

	const scrollToBottom = useScrollToBottom();

	const onSendMessageSuccess = useCallback(
		async (answer: string, buttons: string[]) => {
			setIsLoading(false);
			setMessage({
				contents: answer,
				buttons,
				from: MESSAGE_FROM.ASSISTANT,
				time: new Date(),
			});
			scrollToBottom();
		},
		[scrollToBottom, setIsLoading, setMessage],
	);

	const onSendMessageError = useCallback(
		(error: any) => {
			setIsLoading(false);
			setMessage({
				contents: error,
				from: MESSAGE_FROM.ASSISTANT,
				type: CHAT_MESSAGE_TYPE.ERROR,
			});
			scrollToBottom();
		},
		[scrollToBottom, setIsLoading, setMessage],
	);

	const setUserMessage = useCallback(
		(message: string) => {
			setMessage({
				contents: `<p>${message}</p>`,
				from: MESSAGE_FROM.USER,
				time: new Date(),
			});
			scrollToBottom();
		},
		[scrollToBottom, setMessage],
	);

	const sendMessageByContext = useCallback(
		(payload: sendMessageProps['payload'], context: sendMessageProps['context']) => {
			switch (context) {
				case CHAT_CONTEXT.PORTAL:
					sendPortalAssistantMessageMutation.mutate(
						payload as PortalAssistantSendMessagePayload,
						{
							onSuccess: async ({ answer, session_id, buttons }) => {
								await onSendMessageSuccess(answer, buttons);
								sessionStorage.setItem(
									SESSION_STORAGE_CHAT_SESSION_ID_PORTAL_ASSISTANT,
									session_id,
								);
								setSessionIDS({
									...sessionIDS,
									[CHAT_CONTEXT.PORTAL]: session_id,
								});
								await queryClient.invalidateQueries({
									queryKey: [REQUEST_KEY_GET_CHAT_HISTORY],
								});
							},
							onError: (error) => onSendMessageError(error),
						},
					);
					break;
				case CHAT_CONTEXT.APP:
					sendAppAssistantMessageMutation.mutate(
						payload as AppAssistantSendMessagePayload,
						{
							onSuccess: async ({ answer, session_id, buttons }) => {
								await onSendMessageSuccess(answer, buttons);
								sessionStorage.setItem(
									SESSION_STORAGE_CHAT_SESSION_ID_APP_ASSISTANT,
									session_id,
								);
								setSessionIDS({
									...sessionIDS,
									[CHAT_CONTEXT.APP]: session_id,
								});
								await queryClient.invalidateQueries({
									queryKey: [REQUEST_KEY_GET_CHAT_HISTORY],
								});
							},
							onError: (error) => onSendMessageError(error),
						},
					);
					break;
				default:
					break;
			}
		},
		[
			onSendMessageError,
			onSendMessageSuccess,
			queryClient,
			sendAppAssistantMessageMutation,
			sendPortalAssistantMessageMutation,
			sessionIDS,
			setSessionIDS,
		],
	);

	return useCallback(
		({ payload, callback, context = contextType }: sendMessageProps) => {
			const { content } = payload;

			if (callback) {
				callback();
			}

			setIsLoading(true);

			if (content) {
				setUserMessage(content);
			}

			sendMessageByContext(payload, context);
		},
		[contextType, sendMessageByContext, setIsLoading, setUserMessage],
	);
};
