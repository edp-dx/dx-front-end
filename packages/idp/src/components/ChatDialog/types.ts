import { ValueOf } from '~/types/common';

export interface ChatDialogProps {
	anchorEl?: any;
}

export const CHAT_MESSAGE_TYPE = {
	MESSAGE: 'message',
	ERROR: 'error',
} as const;

export const MESSAGE_FROM = {
	USER: 'user',
	ASSISTANT: 'assistant',
} as const;

interface SetIndex {
	index: number;
}

interface SetTemplate {
	categoriesName: string;
	templateName: string;
}

interface Redirect {
	to: string;
}

interface Events<T, G> {
	name: G;
	contentType: T;
}

interface Request {
	path: string;
	method: RequestInit['method'];
	payload: {
		[key: string]: any;
	};
	messages: {
		success: string;
		error: string;
	};
}

type EventsType =
	| Events<Message, 'message'>
	| Events<Redirect, 'redirect'>
	| Events<SetIndex, 'set-index'>
	| Events<SetTemplate, 'set-template'>
	| Events<Request, 'request'>;

interface Buttons {
	name: string;
	disabled?: boolean;
	events?: EventsType[];
}

export interface Message {
	contents?: string;
	buttons?: Buttons[];
	time?: Date;
	from?: ValueOf<typeof MESSAGE_FROM>;
	type?: ValueOf<typeof CHAT_MESSAGE_TYPE>;
}
