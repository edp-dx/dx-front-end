import { Message } from '~/components/ChatDialog/types';

export interface ChatBotStore {
	messages: Message[];
	setMessage: (message: Message) => void;
	clearMessages: () => void;

	chatMessagesListRef: React.MutableRefObject<HTMLDivElement>;
	setChatMessagesListRef: (ref: React.MutableRefObject<HTMLDivElement>) => void;

	open: boolean;
	setOpen: (value: boolean) => void;
}
