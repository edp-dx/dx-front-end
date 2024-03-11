import CloseIcon from '@mui/icons-material/Close';
import { Popover, Stack, Typography, useTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { Chat } from '~/icons/Chat';

import { useChatBotStore } from '../../store/ChatBot';
import { Message } from './components/Message';
import { useScrollToBottom } from './hooks/useScrollToBottom';
import {
	StyledChatBody,
	StyledChatButton,
	StyledChatContainer,
	StyledChatHeader,
	StyledChatMessagesList,
} from './styles';
import { ChatDialogProps } from './types';

export const ChatDialog: FC<ChatDialogProps> = ({ anchorEl }) => {
	const theme = useTheme();
	const scrollToBottom = useScrollToBottom();
	const { open, setOpen, messages, setChatMessagesListRef } = useChatBotStore();

	const messagesListRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setChatMessagesListRef(messagesListRef);
	}, [setChatMessagesListRef]);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	useEffect(() => {
		if (messagesListRef.current) scrollToBottom();
	}, [scrollToBottom]);

	const id = open ? 'simple-popover' : undefined;

	return (
		<Popover
			id={id}
			open={open}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			PaperProps={{
				sx: {
					marginTop: theme.typography.pxToRem(12),
					borderRadius: theme.typography.pxToRem(6),
					width: theme.typography.pxToRem(680),
					height: theme.typography.pxToRem(440),
					transform: anchorEl ? 'none' : 'translate(-70px, -70px) !important',
				},
			}}
		>
			<StyledChatContainer>
				<StyledChatHeader>
					<Stack
						direction={'row'}
						alignItems={'center'}
						justifyContent={'space-between'}
						spacing={2}
						flexGrow={1}
					>
						<Stack direction={'row'} alignItems={'center'} spacing={2}>
							<Chat
								color={blueGrey['500']}
								width={theme.typography.pxToRem(24)}
								height={theme.typography.pxToRem(24)}
							/>
							<Typography color={blueGrey['500']}>AI Assistant</Typography>
						</Stack>
						<StyledChatButton onClick={handleClose}>
							<CloseIcon sx={{ color: blueGrey['500'] }} />
						</StyledChatButton>
					</Stack>
				</StyledChatHeader>
				<StyledChatBody>
					<StyledChatMessagesList ref={messagesListRef}>
						{messages.map((message, idx) => {
							const key = `message::${idx}`;
							if (message.contents) {
								return <Message key={key} {...message} />;
							}
						})}
					</StyledChatMessagesList>
				</StyledChatBody>
			</StyledChatContainer>
		</Popover>
	);
};
