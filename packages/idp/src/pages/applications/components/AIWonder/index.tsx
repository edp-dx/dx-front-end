import React, { useCallback } from 'react';
import { ChatDialog } from '~/components/ChatDialog';
import { AIWonderIcon } from '~/icons/AIWonder';

import { createMockMessages } from '../../../../components/ChatDialog/mock/messages';
import { useChatBotStore } from '../../../../store/ChatBot';
import { StyledAIButton } from './styles';

export const AIWonder = () => {
	const { open, setOpen, clearMessages, setMessage } = useChatBotStore();
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

	const handleAIWonderOpen = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			clearMessages();
			setOpen(true);
			setMessage(createMockMessages[0]);
			setAnchorEl(event.currentTarget);
		},
		[clearMessages, setOpen, setMessage],
	);

	return (
		<>
			<StyledAIButton
				variant={open ? 'contained' : 'text'}
				onClick={handleAIWonderOpen}
				startIcon={<AIWonderIcon width='24px' height='24px' />}
			/>
			{anchorEl && <ChatDialog anchorEl={anchorEl} />}
		</>
	);
};
