import { Divider, Stack, Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useScrollToBottom } from '~/components/ChatDialog/hooks/useScrollToBottom';
import { DataService, requestFn } from '~/services/data';
import { REQUEST_KEY_GET_TEMPLATE_CATEGORIES } from '~/services/data/categories/requestKeys';
import { useCreateApplicationWizardStore } from '~/store/CreateApplicationWizard';
import { getTimeByFormat } from '~/utils/getTimeByFormat';

import { useChatBotStore } from '../../../../store/ChatBot';
import { MESSAGE_FROM } from '../../types';
import { StyledButton, StyledMessage, StyledMessageContent, StyledMessageWrapper } from './styles';
import { MessageProps } from './types';
import { modifyMessage } from './utils';

export const Message: FC<MessageProps> = ({ contents, from, time, buttons }) => {
	const theme = useTheme();
	const history = useHistory();
	const scrollToBottom = useScrollToBottom();
	const { setActiveStepIndex, setLastCompletedStepIndex, setDefaultValues } =
		useCreateApplicationWizardStore();

	const { setMessage } = useChatBotStore();

	const { data: categoriesData } = useQuery(
		REQUEST_KEY_GET_TEMPLATE_CATEGORIES,
		() => DataService.getTemplateCategories(),
		{
			staleTime: Infinity,
		},
	);

	return (
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
						<div dangerouslySetInnerHTML={{ __html: contents }}></div>
					</Typography>
				</StyledMessageContent>
				{from === MESSAGE_FROM.ASSISTANT && buttons && (
					<>
						<Divider />
						<Stack
							direction='row'
							flexWrap={'wrap'}
							gap={theme.typography.pxToRem(8)}
							p={2}
						>
							{buttons.map(({ name, disabled, events }) => (
								<StyledButton
									key={name}
									disabled={disabled}
									size='extraSmall'
									variant='outlined'
									onClick={() => {
										events.forEach((event) => {
											if (event.name === 'message')
												setMessage(event.contentType);
											scrollToBottom();
											if (event.name === 'set-index') {
												setLastCompletedStepIndex(
													event.contentType.index - 1,
												);
												setActiveStepIndex(event.contentType.index);
											}
											if (event.name === 'set-template') {
												const { categoriesName, templateName } =
													event.contentType;
												const template = categoriesData
													.find((item) => item.name === categoriesName)
													?.templates.find(
														(template) =>
															template.name === templateName,
													);

												setDefaultValues({
													templateID: template.ID,
												});
											}
											if (event.name === 'redirect') {
												setTimeout(
													() => history.push(event.contentType.to),
													3000,
												);
											}

											if (event.name === 'request') {
												const {
													path,
													method,
													payload,
													messages: { success, error },
												} = event.contentType;

												requestFn(path, {
													method,
													body: JSON.stringify(payload),
													headers: {
														'Content-Type': 'application/json',
													},
												})
													.then(() =>
														setMessage({
															from: 'assistant',
															contents: success,
														}),
													)
													.catch((err) => {
														setMessage({
															from: 'assistant',
															contents: `${error} ${modifyMessage(
																err.response.error ||
																	err.response ||
																	err,
															)}`,
														});
													})
													.finally(() => scrollToBottom());
											}
										});
									}}
								>
									{name}
								</StyledButton>
							))}
						</Stack>
					</>
				)}
			</StyledMessage>
		</StyledMessageWrapper>
	);
};
