import { create } from 'zustand';
import {
	SESSION_STORAGE_CHAT_SESSION_ID_APP_ASSISTANT,
	SESSION_STORAGE_CHAT_SESSION_ID_PORTAL_ASSISTANT,
} from '~/store/AIChatBot/constants';

import { AIChatBotStore, CHAT_CONTEXT, CHAT_MESSAGE_TYPE } from './types';

export const useAIChatBotStore = create<AIChatBotStore>((set) => ({
	sessionIDS: {
		[CHAT_CONTEXT.PORTAL]: sessionStorage.getItem(
			SESSION_STORAGE_CHAT_SESSION_ID_PORTAL_ASSISTANT,
		),
		[CHAT_CONTEXT.APP]: sessionStorage.getItem(SESSION_STORAGE_CHAT_SESSION_ID_APP_ASSISTANT),
	},
	setSessionIDS: (sessionIDS) => {
		set(() => ({
			sessionIDS,
		}));
	},
	resetSessionIDS: () => {
		sessionStorage.removeItem(SESSION_STORAGE_CHAT_SESSION_ID_PORTAL_ASSISTANT);
		sessionStorage.removeItem(SESSION_STORAGE_CHAT_SESSION_ID_APP_ASSISTANT);
		set(() => ({
			sessionIDS: {
				[CHAT_CONTEXT.PORTAL]: null,
				[CHAT_CONTEXT.APP]: null,
			},
		}));
	},

	contextType: null,
	setContextType: (contextType) => {
		set(() => ({
			contextType: contextType,
		}));
	},

	contextData: null,
	setContextData: (contextData) => {
		set(() => ({
			contextData: contextData,
		}));
	},

	activeMessagesListIndex: 0,
	setActiveMessagesListIndex: (activeMessagesListIndex) => {
		set(() => ({
			activeMessagesListIndex: activeMessagesListIndex,
		}));
	},

	messages: [],

	isLoading: false,
	setIsLoading: (isLoading) => {
		set(() => ({
			isLoading: isLoading,
		}));
	},

	historyMessages: [],
	setHistoryMessages: (historyMessages) => {
		set(() => ({
			historyMessages,
		}));
	},

	setMessage: (message) => {
		set((state) => ({
			messages: [
				...state.messages,
				{
					...message,
					type: message.type || CHAT_MESSAGE_TYPE.MESSAGE,
				},
			],
		}));
	},
	setMessages: (messages) => {
		set(() => ({
			messages,
		}));
	},
	clearMessages: () => {
		set(() => ({
			messages: [],
			historyMessages: [],
		}));
	},

	chatFabRef: null,
	setChatFabRef: (chatFabRef) => {
		set(() => ({
			chatFabRef: chatFabRef,
		}));
	},

	chatFabAnchorEl: null,
	setChatFabAnchorEl: (chatFabAnchorEl) => {
		set(() => ({
			chatFabAnchorEl: chatFabAnchorEl,
		}));
	},

	chatMessagesListRef: null,
	setChatMessagesListRef: (ref) => {
		set(() => ({
			chatMessagesListRef: ref,
		}));
	},

	openChatDialog: () => {
		set((state) => ({
			chatFabAnchorEl: state.chatFabRef.current,
		}));
	},

	historySession: null,
	setHistorySession: (historySession) => {
		set(() => ({
			historySession: historySession,
		}));
	},
}));
