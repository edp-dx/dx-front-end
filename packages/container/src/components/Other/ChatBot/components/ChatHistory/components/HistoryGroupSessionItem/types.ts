import { Conversation } from '~/services/chat/history/model';

export interface HistoryGroupSessionItemProps {
	index: number;
	conversation: Conversation;
}
