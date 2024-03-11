import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Typography, useTheme } from '@mui/material';
import React, { FC, useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { ChatService } from '~/services/chat';
import { REQUEST_KEY_GET_CHAT_HISTORY } from '~/services/chat/history/requestKeys';
import { useAIChatBotStore } from '~/store/AIChatBot';

import { useSendMessage } from '../../hooks/useSendMessage';
import { HistoryGroupSessionItem } from './components/HistoryGroupSessionItem';
import {
	StyledAccordion,
	StyledAccordionDetails,
	StyledAccordionSummary,
	StyledChatHistory,
	StyledChatHistoryScroller,
} from './styles';
import { ChatHistoryProps } from './types';

export const ChatHistory: FC<ChatHistoryProps> = (props) => {
	const { showHistory, setHistoryClose } = props;
	const theme = useTheme();

	const { clearMessages, setHistorySession, contextData, contextType } = useAIChatBotStore();

	const sendMessage = useSendMessage();

	const [expandedCategoryAccordions, setExpandedCategoryAccordions] = React.useState<string[]>([
		'history-group::0',
	]);

	const { data: chatHistoryData, refetch } = useQuery(
		REQUEST_KEY_GET_CHAT_HISTORY,
		() => ChatService.getChatHistory(contextType),
		{ staleTime: Infinity },
	);

	useEffect(() => {
		refetch();
	}, [refetch, contextType]);

	const handleCreateNewDialog = useCallback(() => {
		setHistoryClose();
		setHistorySession(null);
		clearMessages();
		sendMessage({
			payload: {
				content: '',
				session: null,
				...contextData,
			},
		});
	}, [clearMessages, contextData, sendMessage, setHistoryClose, setHistorySession]);

	const handleAccordionChange = useCallback(
		(key: string) => () => {
			setExpandedCategoryAccordions((prev) => {
				if (!prev.includes(key)) {
					return [...prev, key];
				}

				return prev.filter((el) => el !== key);
			});
		},
		[],
	);

	return (
		<StyledChatHistory
			sx={{
				width: showHistory ? theme.typography.pxToRem(252) : 0,
				pointerEvents: showHistory ? 'auto' : 'none',
				visibility: showHistory ? 'visible' : 'hidden',
			}}
		>
			<Button fullWidth size={'small'} onClick={handleCreateNewDialog}>
				+ New Dialog
			</Button>
			<StyledChatHistoryScroller>
				{chatHistoryData?.conversation_groups?.map(({ conversations, date }, idx) => {
					const historyGroupKey = `history-group::${idx}`;

					return (
						<StyledAccordion
							key={historyGroupKey}
							expanded={expandedCategoryAccordions.includes(historyGroupKey)}
							onChange={handleAccordionChange(historyGroupKey)}
						>
							<StyledAccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls='panel1a-content'
								id='panel1a-header'
							>
								<Typography variant={'body2'} color={theme.palette.text.primary}>
									{new Intl.DateTimeFormat(globalThis.navigator.language, {
										day: 'numeric',
										month: 'short',
										year: 'numeric',
									}).format(date * 1000)}
								</Typography>
							</StyledAccordionSummary>
							<StyledAccordionDetails>
								{conversations?.map((conversation, index) => {
									const key = `group::${date}::session::${conversation.session_id}`;

									return (
										<HistoryGroupSessionItem
											key={key}
											conversation={conversation}
											index={index}
										/>
									);
								})}
							</StyledAccordionDetails>
						</StyledAccordion>
					);
				})}
			</StyledChatHistoryScroller>
		</StyledChatHistory>
	);
};
