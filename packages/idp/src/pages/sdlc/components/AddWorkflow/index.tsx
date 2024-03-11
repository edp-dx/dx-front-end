import { Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { ChatDialog } from '~/components/ChatDialog';
import { getWorkflowMessages } from '~/components/ChatDialog/mock/messages';
import { CHAT_MESSAGE_TYPE, MESSAGE_FROM } from '~/components/ChatDialog/types';
import { AIWonderIcon } from '~/icons/AIWonder';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_GEN_AI_TASKS } from '~/services/data/workflows/requestKeys';

import { useChatBotStore } from '../../../../store/ChatBot';

export const AddWorkflow = () => {
	const { setOpen, clearMessages, setMessage } = useChatBotStore();
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const { error, data } = useQuery(
		REQUEST_KEY_GET_GEN_AI_TASKS,
		() => DataService.getGenAITasks(),
		{
			staleTime: Infinity,
		},
	);

	const handleAddWorkflowOpen = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			clearMessages();
			setOpen(true);
			if (error || !data) {
				setMessage({
					contents:
						(error && JSON.stringify(error)) ||
						'Something went wrong. Please, try again.',
					from: MESSAGE_FROM.ASSISTANT,
					type: CHAT_MESSAGE_TYPE.ERROR,
				});
			} else {
				const messages = getWorkflowMessages(data);
				setMessage(messages[0]);
			}
			setAnchorEl(event.currentTarget);
		},
		[clearMessages, data, error, setMessage, setOpen],
	);

	return (
		<>
			<Button
				variant='contained'
				onClick={handleAddWorkflowOpen}
				startIcon={<AIWonderIcon width='20px' height='20px' />}
			>
				Add Workflow
			</Button>
			{anchorEl && <ChatDialog anchorEl={anchorEl} />}
		</>
	);
};
