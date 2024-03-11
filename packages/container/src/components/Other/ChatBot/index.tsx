import React, { useEffect, useRef } from 'react';
import { shallow } from 'zustand/shallow';
import { useAIChatBotStore } from '~/store/AIChatBot';

import { ChatDialog } from './components/ChatDialog';
import { ChatFloatingButton } from './components/ChatFloatingButton';

export const ChatBot = () => {
	const { setChatFabRef } = useAIChatBotStore(
		(state) => ({
			setChatFabRef: state.setChatFabRef,
		}),
		shallow,
	);

	const chatFabRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		setChatFabRef(chatFabRef);
	}, [setChatFabRef]);

	return (
		<>
			<ChatFloatingButton />
			<ChatDialog />
		</>
	);
};
