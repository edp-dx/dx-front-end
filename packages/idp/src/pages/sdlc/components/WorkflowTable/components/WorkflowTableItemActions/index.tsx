import React, { ReactElement, useState } from 'react';
import { TableActionsMenu } from '~/shared-components/TableActionsMenu';
import { TableItemAction } from '~/shared-components/TableActionsMenu/types';

import { WorkflowReport } from '../WorkflowReport';
import { WorkflowTableItemActionsProps } from './types';

export const WorkflowTableItemActions = ({ data }: WorkflowTableItemActionsProps): ReactElement => {
	const [open, setOpen] = useState<boolean>(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	const actions: TableItemAction[] = [
		{
			label: 'View Full Report',
			onClick: handleOpen,
			disabled: true, // Disabled until requirements are clarified
		},
		{
			label: 'Stop Process',
			disabled: true,
		},
	];

	return (
		<>
			<TableActionsMenu actions={actions} />
			<WorkflowReport open={open} onClose={handleClose} data={data} />
		</>
	);
};
