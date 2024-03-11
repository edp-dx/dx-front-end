import React from 'react';
import { ValueOf } from '~/types/common';

export const CHAT_MESSAGE_TYPE = {
	MESSAGE: 'message',
	ERROR: 'error',
} as const;

export const MESSAGE_FROM = {
	USER: 'user',
	ASSISTANT: 'assistant',
} as const;

export const CHAT_CONTEXT = {
	PORTAL: 'portal',
	APP: 'app',
} as const;

export interface Message {
	contents?: string;
	buttons?: string[];
	time?: Date;
	from?: ValueOf<typeof MESSAGE_FROM>;
	type?: ValueOf<typeof CHAT_MESSAGE_TYPE>;
}

export type ChatContextType = ValueOf<typeof CHAT_CONTEXT>;

export interface AIChatBotStore {
	sessionIDS: {
		[CHAT_CONTEXT.PORTAL]: string;
		[CHAT_CONTEXT.APP]: string;
	};
	setSessionIDS: (sessions: AIChatBotStore['sessionIDS']) => void;
	resetSessionIDS: () => void;

	contextType: ChatContextType;
	setContextType: (contextType: ChatContextType) => void;

	contextData: any;
	setContextData: (data: any) => void;

	activeMessagesListIndex: number;
	setActiveMessagesListIndex: (activeMessagesListIndex: number) => void;

	messages: Message[];
	historyMessages: Message[];

	setHistoryMessages: (historyMessages: Message[]) => void;

	setMessage: (message: Message) => void;
	setMessages: (messages: Message[]) => void;
	clearMessages: () => void;

	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;

	chatFabRef: React.MutableRefObject<HTMLButtonElement>;
	setChatFabRef: (anchorRef: React.MutableRefObject<HTMLButtonElement>) => void;

	chatFabAnchorEl: HTMLButtonElement;
	setChatFabAnchorEl: (chatFabAnchorEl: HTMLButtonElement) => void;

	chatMessagesListRef: React.MutableRefObject<HTMLDivElement>;
	setChatMessagesListRef: (ref: React.MutableRefObject<HTMLDivElement>) => void;

	openChatDialog: () => void;

	historySession: string;
	setHistorySession: (historySession: string) => void;
}
