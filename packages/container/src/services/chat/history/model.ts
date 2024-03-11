import { Message } from '~/store/AIChatBot/types';

export interface Conversation {
	header: string;
	session_id: string;
	last_msg_time: Date;
}

export interface ConversationsGroup {
	conversations: Conversation[];
	date: number;
}

export interface ChatHistoryResponse {
	conversation_groups: ConversationsGroup[];
}

export interface ChatHistoryMessages {
	messages: Message[];
}

export interface ChatHistoryPayload {
	session: string;
	type: string;
}
