import { useCallback } from 'react';
import { shallow } from 'zustand/shallow';
import { useAIChatBotStore } from '~/store/AIChatBot';

export const useScrollToBottom = () => {
	const { chatMessagesListRef } = useAIChatBotStore(
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
