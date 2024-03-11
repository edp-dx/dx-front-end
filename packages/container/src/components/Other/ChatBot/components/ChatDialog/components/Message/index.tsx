import CachedIcon from '@mui/icons-material/Cached';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { Alert, AlertTitle, Divider, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import React, { FC, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSendMessage } from '~/components/Other/ChatBot/hooks/useSendMessage';
import { ThumbDown } from '~/icons/ThumbDown';
import { ThumbDownFilled } from '~/icons/ThumbDownFilled';
import { ThumbUp } from '~/icons/ThumbUp';
import { ThumbUpFilled } from '~/icons/ThumbUpFilled';
import { useAIChatBotStore } from '~/store/AIChatBot';
import { CHAT_MESSAGE_TYPE, MESSAGE_FROM } from '~/store/AIChatBot/types';
import { getTimeByFormat } from '~/utils/getTimeByFormat';

import {
	StyledActionButton,
	StyledButton,
	StyledCode,
	StyledCopyButton,
	StyledIconButton,
	StyledMessage,
	StyledMessageContent,
	StyledMessageWrapper,
} from './styles';
import { MessageProps } from './types';

export const Message: FC<MessageProps> = ({ type, contents, from, time, buttons }) => {
	const theme = useTheme();
	const [like, setLike] = useState(null);

	const { contextData, contextType } = useAIChatBotStore();
	const sendMessage = useSendMessage();

	const handleActionMessage = (message: string) => {
		sendMessage({
			payload: {
				content: message,
				...contextData,
			},
			context: contextType,
		});
	};

	const parser = new DOMParser();

	const parseOptions: HTMLReactParserOptions = {
		transform: (reactNode, domNode) => {
			if (domNode.type === 'tag' && domNode.name === 'code') {
				const element = parser.parseFromString(
					ReactDOMServer.renderToString(<div>{reactNode}</div>),
					'text/html',
				);

				return (
					<StyledCode>
						<StyledCopyButton
							size='extraSmall'
							variant='text'
							startIcon={<ContentCopyOutlinedIcon fontSize='small' />}
							onClick={() =>
								navigator.clipboard.writeText(element.documentElement.innerText)
							}
						>
							COPY
						</StyledCopyButton>
						{reactNode}
					</StyledCode>
				);
			}

			if (domNode.type === 'tag' && domNode.name === 'a') {
				return (
					<span>
						<Tooltip
							PopperProps={{
								sx: {
									'& .MuiTooltip-tooltip': {
										bgcolor: 'white',
										padding: 0,
										mb: '5px !important',
									},
								},
							}}
							title={
								<StyledActionButton
									size='extraSmall'
									variant='outlined'
									startIcon={<ContentCopyOutlinedIcon fontSize='small' />}
									onClick={() =>
										navigator.clipboard.writeText(domNode.attribs.href)
									}
								>
									COPY
								</StyledActionButton>
							}
							placement='top-end'
						>
							<span>{reactNode}</span>
						</Tooltip>
					</span>
				);
			}

			return reactNode as JSX.Element;
		},
	};

	return type === CHAT_MESSAGE_TYPE.ERROR ? (
		<Alert severity='warning' sx={{ maxWidth: '85%' }}>
			<AlertTitle>Warning</AlertTitle>
			<Typography
				variant={'body2'}
				component={'div'}
				sx={{ '& *:first-of-type': { margin: 0 } }}
				dangerouslySetInnerHTML={{ __html: contents }}
			/>
		</Alert>
	) : (
		<StyledMessageWrapper
			justifyContent={from === MESSAGE_FROM.ASSISTANT ? 'flex-start' : 'flex-end'}
		>
			<StyledMessage>
				<StyledMessageContent>
					<Typography
						variant={'caption'}
						component={'div'}
						sx={{ marginBottom: theme.typography.pxToRem(5) }}
						color={theme.palette.text.disabled}
						fontWeight={500}
					>
						<span>
							{`${getTimeByFormat(time, {
								day: 'numeric',
								month: 'short',
								hour: '2-digit',
								hour12: true,
								minute: '2-digit',
							})}`}{' '}
						</span>
						<span>{' - '}</span>
						<span>{from === MESSAGE_FROM.ASSISTANT ? 'AI Assistant' : 'Me'}</span>
					</Typography>
					<Typography
						variant={'body2'}
						component={'div'}
						sx={{ '& *:first-of-type': { margin: 0 } }}
					>
						{parse(contents, parseOptions)}
					</Typography>
				</StyledMessageContent>
				{from === MESSAGE_FROM.ASSISTANT &&
					(buttons ? (
						<>
							<Divider />
							<Stack
								direction='row'
								flexWrap={'wrap'}
								gap={theme.typography.pxToRem(8)}
								p={2}
							>
								{buttons.map((message) => (
									<StyledButton
										key={message}
										size='extraSmall'
										variant='outlined'
										onClick={() => handleActionMessage(message)}
									>
										{message}
									</StyledButton>
								))}
							</Stack>
						</>
					) : (
						<>
							<Divider />
							<Stack
								p={2}
								direction='row'
								alignItems={'center'}
								justifyContent={'space-between'}
								gap={theme.typography.pxToRem(8)}
							>
								<Stack
									direction='row'
									flexWrap={'wrap'}
									gap={theme.typography.pxToRem(8)}
								>
									<StyledActionButton
										disabled
										size='extraSmall'
										variant='outlined'
										startIcon={<CachedIcon fontSize='small' />}
									>
										REGENERATE
									</StyledActionButton>
								</Stack>
								<Stack direction='row' gap={theme.typography.pxToRem(20)}>
									<StyledIconButton>
										{like === 'like' ? (
											<ThumbUpFilled
												onClick={() => setLike(null)}
												width={theme.typography.pxToRem(15)}
												height={theme.typography.pxToRem(16)}
											/>
										) : (
											<ThumbUp
												onClick={() => setLike('like')}
												width={theme.typography.pxToRem(15)}
												height={theme.typography.pxToRem(16)}
											/>
										)}
									</StyledIconButton>
									<StyledIconButton>
										{like === 'dislike' ? (
											<ThumbDownFilled
												onClick={() => setLike(null)}
												width={theme.typography.pxToRem(15)}
												height={theme.typography.pxToRem(16)}
											/>
										) : (
											<ThumbDown
												onClick={() => setLike('dislike')}
												width={theme.typography.pxToRem(15)}
												height={theme.typography.pxToRem(16)}
											/>
										)}
									</StyledIconButton>
								</Stack>
							</Stack>
						</>
					))}
			</StyledMessage>
		</StyledMessageWrapper>
	);
};
