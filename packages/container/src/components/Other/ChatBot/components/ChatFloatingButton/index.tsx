import { Fab, useTheme } from '@mui/material';
import React, { RefObject, useCallback } from 'react';
import { ReactElement } from 'react';
import { shallow } from 'zustand/shallow';
import { useSendMessage } from '~/components/Other/ChatBot/hooks/useSendMessage';
import { Chat } from '~/icons/Chat';
import { useAIChatBotStore } from '~/store/AIChatBot';
import { CHAT_CONTEXT } from '~/store/AIChatBot/types';
import { useOnboardingTourStore } from '~/store/OnboardingTour';

import { StyledChatFloatingButton } from './styles';

export const ChatFloatingButton = (): ReactElement => {
	const theme = useTheme();
	const { mainTutorial } = useOnboardingTourStore(
		(state) => ({
			mainTutorial: state.mainTutorial,
		}),
		shallow,
	);

	const { chatFabRef, openChatDialog, setContextType } = useAIChatBotStore(
		(state) => ({
			chatFabRef: state.chatFabRef,
			openChatDialog: state.openChatDialog,
			setContextType: state.setContextType,
		}),
		shallow,
	);

	const sendMessage = useSendMessage();

	const handleFabClick = useCallback(() => {
		sendMessage({
			payload: {
				content: '',
				session: null,
			},
			context: CHAT_CONTEXT.PORTAL,
		});
		setContextType(CHAT_CONTEXT.PORTAL);
		openChatDialog();
	}, [sendMessage, setContextType, openChatDialog]);

	return (
		<>
			<StyledChatFloatingButton
				ref={mainTutorial.refs.chatFabRef as RefObject<HTMLDivElement>}
			>
				<Fab color={'info'} onClick={handleFabClick} ref={chatFabRef}>
					<Chat
						color={theme.palette.common.white}
						width={theme.typography.pxToRem(32)}
						height={theme.typography.pxToRem(32)}
					/>
				</Fab>
			</StyledChatFloatingButton>
		</>
	);
};
