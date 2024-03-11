import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import SendIcon from '@mui/icons-material/Send';
import { Box, Divider, IconButton, Popover, Stack, Typography, useTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';
import { Message } from '~/components/Other/ChatBot/components/ChatDialog/components/Message';
import { useSendMessage } from '~/components/Other/ChatBot/hooks/useSendMessage';
import { FormTextField } from '~/components/forms/FormTextField';
import { Chat } from '~/icons/Chat';
import { WindowCollapse } from '~/icons/WindowCollapse';
import { WindowExpand } from '~/icons/WindowExpand';
import { useAIChatBotStore } from '~/store/AIChatBot';
import { CHAT_CONTEXT } from '~/store/AIChatBot/types';
import { ValueOf } from '~/types/common';

import { ChatHistory } from '../ChatHistory';
import { VIEW_MODE } from './constants';
import {
	StyledChatBody,
	StyledChatBottomPanel,
	StyledChatButton,
	StyledChatContainer,
	StyledChatHeader,
	StyledChatMessagesList,
	StyledFormTextField,
	StyledLoadingDot,
} from './styles';

export const ChatDialog = () => {
	const theme = useTheme();
	const {
		historySession,
		setHistorySession,
		isLoading,
		messages,
		clearMessages,
		chatFabAnchorEl,
		chatFabRef,
		setChatFabAnchorEl,
		openChatDialog,
		setChatMessagesListRef,
		setContextType,
		setContextData,
		contextData,
		contextType,
		resetSessionIDS,
	} = useAIChatBotStore(
		(state) => ({
			sessionIDS: state.sessionIDS,
			historySession: state.historySession,
			setHistorySession: state.setHistorySession,
			isLoading: state.isLoading,
			historyMessages: state.historyMessages,
			messages: state.messages,
			setHistoryMessages: state.setHistoryMessages,
			clearMessages: state.clearMessages,
			chatFabAnchorEl: state.chatFabAnchorEl,
			chatFabRef: state.chatFabRef,
			setChatFabAnchorEl: state.setChatFabAnchorEl,
			openChatDialog: state.openChatDialog,
			setChatMessagesListRef: state.setChatMessagesListRef,
			setContextType: state.setContextType,
			setContextData: state.setContextData,
			contextData: state.contextData,
			contextType: state.contextType,
			resetSessionIDS: state.resetSessionIDS,
		}),
		shallow,
	);

	const open = useMemo(() => Boolean(chatFabAnchorEl), [chatFabAnchorEl]);
	const id = open ? 'simple-popper' : undefined;

	const messagesListRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		setChatMessagesListRef(messagesListRef);
	}, [setChatMessagesListRef]);

	const [mode, setMode] = useState<ValueOf<typeof VIEW_MODE>>(VIEW_MODE.MINIMIZED);
	const [showHistory, setShowHistory] = useState<boolean>(false);

	const form = useForm();
	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors },
	} = form;

	const sendMessage = useSendMessage();

	const onSubmit = useCallback(
		({ message }: any) =>
			sendMessage({
				payload: {
					content: message,
					...contextData,
				},
				context: contextType,
				callback: () => reset(),
			}),
		[contextData, contextType, reset, sendMessage],
	);

	const setHistoryClose = useCallback(() => {
		setShowHistory(false);
	}, []);

	const handleFinishCurrentConversation = useCallback(() => {
		setTimeout(() => {
			setMode(VIEW_MODE.MINIMIZED);
			clearMessages();
			resetSessionIDS();
		}, 500);
	}, [clearMessages, resetSessionIDS]);

	const handleClose = useCallback(() => {
		setHistoryClose();
		setHistorySession(null);
		setChatFabAnchorEl(null);
		handleFinishCurrentConversation();
	}, [handleFinishCurrentConversation, setChatFabAnchorEl, setHistoryClose, setHistorySession]);

	const toggleChatHistory = useCallback(async () => {
		setShowHistory((prev) => !prev);
	}, []);

	useEffect(() => {
		const appAIAssistantActivationEventListener = (event: CustomEvent<{ data: any }>) => {
			openChatDialog();

			setContextType(CHAT_CONTEXT.APP);
			setContextData({
				app_name: event.detail.data.application.name,
			});

			sendMessage({
				payload: {
					content: '',
					app_name: event.detail.data.application.name,
				},
				context: CHAT_CONTEXT.APP,
				callback: () => reset(),
			});
		};
		window.addEventListener(
			'dx_ai_assistant_activation',
			appAIAssistantActivationEventListener,
		);

		return () =>
			window.removeEventListener(
				'dx_ai_assistant_activation',
				appAIAssistantActivationEventListener,
			);
	}, [
		chatFabRef,
		openChatDialog,
		reset,
		sendMessage,
		setChatFabAnchorEl,
		setContextData,
		setContextType,
	]);

	return (
		<Popover
			id={id}
			open={open}
			anchorEl={chatFabAnchorEl}
			keepMounted
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			transformOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			PaperProps={{
				sx: {
					borderRadius: theme.typography.pxToRem(6),
					width: mode === VIEW_MODE.FULL ? '100%' : theme.typography.pxToRem(680),
					height: mode === VIEW_MODE.FULL ? '100%' : theme.typography.pxToRem(440),
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
						<StyledChatButton
							onClick={toggleChatHistory}
							sx={
								showHistory
									? {
											backgroundColor: theme.palette.action.hover,
									  }
									: {}
							}
						>
							<HistoryIcon
								sx={{
									color: showHistory
										? theme.palette.primary.main
										: blueGrey['500'],
								}}
							/>
						</StyledChatButton>
						<Stack direction={'row'} alignItems={'center'} spacing={2}>
							<Chat
								color={blueGrey['500']}
								width={theme.typography.pxToRem(24)}
								height={theme.typography.pxToRem(24)}
							/>
							<Typography color={blueGrey['500']}>AI Assistant Chat</Typography>
						</Stack>
						<Stack direction={'row'} alignItems={'center'} spacing={2}>
							{mode === VIEW_MODE.FULL ? (
								<StyledChatButton onClick={() => setMode(VIEW_MODE.MINIMIZED)}>
									<WindowCollapse color={blueGrey['500']} />
								</StyledChatButton>
							) : (
								<StyledChatButton onClick={() => setMode(VIEW_MODE.FULL)}>
									<WindowExpand color={blueGrey['500']} />
								</StyledChatButton>
							)}
							<StyledChatButton onClick={handleClose}>
								<CloseIcon sx={{ color: blueGrey['500'] }} />
							</StyledChatButton>
						</Stack>
					</Stack>
				</StyledChatHeader>
				<StyledChatBody>
					<ChatHistory showHistory={showHistory} setHistoryClose={setHistoryClose} />
					<StyledChatMessagesList ref={messagesListRef}>
						{messages.map((message, idx) => {
							const key = `message::${idx}`;
							if (message.contents) {
								return <Message key={key} {...message} />;
							}
						})}

						{isLoading && !historySession ? (
							<Stack spacing={1} direction={'row'} alignItems={'center'}>
								<StyledLoadingDot />
								<StyledLoadingDot />
								<StyledLoadingDot />
							</Stack>
						) : null}
					</StyledChatMessagesList>
				</StyledChatBody>
				<StyledChatBottomPanel>
					<Box sx={{ mb: theme.typography.pxToRem(8) }}>
						<FormProvider {...form}>
							<Box
								component='form'
								onSubmit={handleSubmit(onSubmit)}
								sx={{ display: 'flex', alignItems: 'center' }}
							>
								<StyledFormTextField>
									<FormTextField
										errors={errors}
										control={control}
										placeholder={'Type your message here...'}
										{...register('message')}
									/>
								</StyledFormTextField>
								<Divider orientation='vertical' />
								<IconButton
									color='primary'
									aria-label='directions'
									sx={{ flexShrink: 0 }}
									type={'submit'}
								>
									<SendIcon />
								</IconButton>
							</Box>
						</FormProvider>
					</Box>
					<Typography
						color={theme.palette.text.disabled}
						fontSize={theme.typography.pxToRem(10)}
						align={'center'}
						fontWeight={500}
					>
						AI-generated content may be incomplete or factually incorrect.
					</Typography>
				</StyledChatBottomPanel>
			</StyledChatContainer>
		</Popover>
	);
};
