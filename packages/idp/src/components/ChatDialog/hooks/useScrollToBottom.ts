import { useCallback } from 'react';
import { shallow } from 'zustand/shallow';

import { useChatBotStore } from '../../../store/ChatBot';

export const useScrollToBottom = () => {
	const { chatMessagesListRef } = useChatBotStore(
		(state) => ({
			chatMessagesListRef: state.chatMessagesListRef,
		}),
		shallow,
	);

	return useCallback(() => {
		setTimeout(
			() =>
				chatMessagesListRef.current.scroll({
					top: chatMessagesListRef.current.scrollHeight,
					behavior: 'smooth',
				}),
			0,
		);
	}, [chatMessagesListRef]);
};
