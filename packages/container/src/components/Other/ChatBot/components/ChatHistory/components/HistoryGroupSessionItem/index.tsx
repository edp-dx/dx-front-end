import { Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React, { FC, useCallback } from 'react';
import { useQuery } from 'react-query';
import { ChatService } from '~/services/chat';
import { REQUEST_KEY_GET_CHAT_HISTORY_SESSION } from '~/services/chat/history/requestKeys';
import { useAIChatBotStore } from '~/store/AIChatBot';
import { getTimeByFormat } from '~/utils/getTimeByFormat';

import { StyledHistoryGroupSessionItem } from './styles';
import { HistoryGroupSessionItemProps } from './types';

export const HistoryGroupSessionItem: FC<HistoryGroupSessionItemProps> = ({ conversation }) => {
	const { header, session_id, last_msg_time } = conversation;
	const theme = useTheme();
	const {
		setHistorySession,
		setMessages,
		historySession,
		contextType,
		sessionIDS,
		setSessionIDS,
	} = useAIChatBotStore();

	const { refetch } = useQuery(
		REQUEST_KEY_GET_CHAT_HISTORY_SESSION,
		() => ChatService.getChatHistorySession({ session: session_id, type: contextType }),
		{
			enabled: false,
			onSuccess: (historyMessagesData) => {
				setMessages(historyMessagesData.messages);
			},
		},
	);

	const handleClickSession = useCallback(() => {
		refetch();
		setHistorySession(session_id);
		setSessionIDS({ ...sessionIDS, [contextType]: session_id });
	}, [refetch, setHistorySession, session_id, setSessionIDS, sessionIDS, contextType]);

	return (
		<Tooltip title={header} disableInteractive arrow placement='top'>
			<StyledHistoryGroupSessionItem
				sx={{ paddingY: 1, pl: 5 }}
				onClick={handleClickSession}
				selected={session_id === historySession}
			>
				<Stack direction={'column'}>
					<Typography
						sx={{
							fontWeight: 500,
							lineHeight: theme.typography.pxToRem(14),
							color: theme.palette.text.disabled,
							fontSize: theme.typography.pxToRem(10),
						}}
					>
						{getTimeByFormat(last_msg_time, {
							hour: '2-digit',
							hour12: true,
							minute: '2-digit',
						})}
					</Typography>
					<Typography
						variant='body2'
						sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
					>
						{header}
					</Typography>
				</Stack>
			</StyledHistoryGroupSessionItem>
		</Tooltip>
	);
};
