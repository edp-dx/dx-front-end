import { create } from 'zustand';
import { CHAT_MESSAGE_TYPE } from '~/components/ChatDialog/types';

import { ChatBotStore } from './types';

export const useChatBotStore = create<ChatBotStore>((set) => ({
	messages: [],
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

	clearMessages: () => {
		set(() => ({
			messages: [],
		}));
	},

	chatMessagesListRef: null,
	setChatMessagesListRef: (ref) => {
		set(() => ({
			chatMessagesListRef: ref,
		}));
	},

	open: false,
	setOpen: (value) => {
		set(() => ({
			open: value,
		}));
	},
}));
