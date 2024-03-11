import React, { ReactElement, useState } from 'react';
import { useModalContext } from '~/providers/ModalProvider';
import { TableActionsMenu } from '~/shared-components/TableActionsMenu';
import { TableItemAction } from '~/shared-components/TableActionsMenu/types';

import { CreatedApplicationDetails } from '../CreatedApplicationDetails';
import { CreatedTableItemActionsProps } from './types';

export const CreatedTableItemActions = ({ data }: CreatedTableItemActionsProps): ReactElement => {
	const { handleUpdateDetailsModalOpen } = useModalContext();

	const [appDetailsOpen, setAppDetailsOpen] = useState<boolean>(false);
	const handleAppDetailsClose = () => {
		setAppDetailsOpen(false);
	};
	const handleAppDetailsOpen = () => {
		setAppDetailsOpen(true);
	};

	const handleRunAIAssistant = () => {
		const event = new CustomEvent('dx_ai_assistant_activation', {
			detail: { data: data },
		});
		window.dispatchEvent(event);
	};

	const actions: TableItemAction[] = [
		{
			label: 'View Details',
			onClick: handleAppDetailsOpen,
		},
		{
			label: 'Edit Details',
			onClick: () => handleUpdateDetailsModalOpen({ data }),
		},
		{
			label: 'Request Permissions',
			disabled: true,
		},
		{
			label: 'Manage API',
			disabled: true,
		},
		{
			label: 'Run AI Assistant',
			onClick: handleRunAIAssistant,
		},
	];

	return (
		<>
			<TableActionsMenu actions={actions} />
			<CreatedApplicationDetails
				open={appDetailsOpen}
				onClose={handleAppDetailsClose}
				data={data}
			/>
		</>
	);
};
