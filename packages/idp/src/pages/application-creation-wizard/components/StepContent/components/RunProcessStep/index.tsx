import { Button, LinearProgress, Link, Paper, Stack, Typography, useTheme } from '@mui/material';
import React, { ReactElement, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { shallow } from 'zustand/shallow';
import { CreateApplicationResponse } from '~/services/data/applications/model';
import { REQUEST_KEY_CREATE_APPLICATION_RESPONSE } from '~/services/data/applications/requestKeys';
import { useCreateApplicationWizardStore } from '~/store/CreateApplicationWizard';
import { sleep } from '~/utils/sleep';

export const RunProcessStep = () => {
	const theme = useTheme();
	const { activeStepIndex, setActiveStepIndex, setLastCompletedStepIndex } =
		useCreateApplicationWizardStore(
			(state) => ({
				activeStepIndex: state.activeStepIndex,
				setActiveStepIndex: state.setActiveStepIndex,
				setLastCompletedStepIndex: state.setLastCompletedStepIndex,
			}),
			shallow,
		);

	const handleClickPrev = useCallback(() => {
		setActiveStepIndex(activeStepIndex - 1);
	}, [activeStepIndex, setActiveStepIndex]);

	const handleClickNext = useCallback(() => {
		setLastCompletedStepIndex(activeStepIndex);
		setActiveStepIndex(activeStepIndex + 1);
	}, [activeStepIndex, setActiveStepIndex, setLastCompletedStepIndex]);

	const addMessage = useCallback(
		(message: any) =>
			setMessages((prev) => [
				...prev,
				<Typography
					variant={'caption'}
					fontWeight={500}
					fontFamily={theme.typography.fontFamilyThirdly}
					key={'message-1'}
				>
					{`[${new Intl.DateTimeFormat(globalThis.navigator.language, {
						hour: '2-digit',
						hour12: false,
						minute: '2-digit',
						second: '2-digit',
					}).format(new Date())}]`}{' '}
					Task: {message}
				</Typography>,
			]),
		[theme],
	);

	const printMessages = useCallback(
		async (data: CreateApplicationResponse) => {
			addMessage('Starting application scaffolding...');
			setProgress((prev) => prev + 10);
			await sleep(1000);
			addMessage('Project directory has been created.');
			setProgress((prev) => prev + 10);
			await sleep(1000);
			addMessage('Deployment templates have been added.');
			setProgress((prev) => prev + 10);
			await sleep(1000);
			addMessage(
				<>
					Git repository has been initialized:{' '}
					<Link href={data?.gitRepoURL} target={'_blank'}>
						{data?.gitRepoURL}
					</Link>
					.
				</>,
			);
			setProgress((prev) => prev + 10);
			await sleep(1000);
			addMessage(
				<>
					CI/CD pipelines have been configured:{' '}
					<Link href={data?.pipelineURL} target={'_blank'}>
						{data?.pipelineURL}
					</Link>
				</>,
			);
			setProgress((prev) => prev + 10);
			await sleep(5000);
			addMessage('Application scaffolding has been successfully completed.');
			setProgress((prev) => prev + 20);
			await sleep(1000);
			addMessage('Application has been registered on a platform.');
			setProgress((prev) => prev + 10);
			await sleep(1000);
			addMessage('Starting application deployment…');
			setProgress((prev) => prev + 10);
			await sleep(1000);
			addMessage('Application scaffolding has been finished.');
			setProgress((prev) => prev + 10);
		},
		[addMessage],
	);

	useQuery<CreateApplicationResponse>(REQUEST_KEY_CREATE_APPLICATION_RESPONSE, {
		onSuccess: (data) => printMessages(data),
	});

	const [messages, setMessages] = useState<ReactElement[]>([]);
	const [progress, setProgress] = useState<number>(0);

	return (
		<>
			<LinearProgress
				variant='determinate'
				value={progress}
				sx={{ mb: theme.typography.pxToRem(8) }}
			/>
			<Paper sx={{ p: theme.typography.pxToRem(16) }}>
				{messages.map((el, idx) => {
					const key = `message::${idx}`;

					return <div key={key}>{el}</div>;
				})}
			</Paper>

			<Stack
				direction={'row'}
				justifyContent={'flex-end'}
				spacing={2}
				sx={{ mt: 'auto', pt: theme.typography.pxToRem(16) }}
			>
				<Button size={'large'} variant={'text'} onClick={handleClickPrev} disabled>
					Back
				</Button>
				<Button
					size={'large'}
					variant={'contained'}
					onClick={handleClickNext}
					disabled={progress !== 100}
				>
					Next
				</Button>
			</Stack>
		</>
	);
};
