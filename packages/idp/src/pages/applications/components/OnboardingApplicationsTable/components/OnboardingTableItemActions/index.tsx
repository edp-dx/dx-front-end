import React, { ReactElement, useCallback, useState } from 'react';
import { TableActionsMenu } from '~/shared-components/TableActionsMenu';
import { TableItemAction } from '~/shared-components/TableActionsMenu/types';

import { DeleteModal } from '../DeleteModal';
import { OnboardingApplicationDetails } from '../OnboardingApplicationDetails';
import { OnboardingTableItemActionsProps } from './types';

export const OnboardingTableItemActions = ({
	data,
	onWorkflowDeleteConfirm,
}: OnboardingTableItemActionsProps): ReactElement => {
	const [appDetailsOpen, setAppDetailsOpen] = useState<boolean>(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const handleAppDetailsClose = () => {
		setAppDetailsOpen(false);
	};

	const handleAppDetailsOpen = () => {
		setAppDetailsOpen(true);
	};

	const handleDeleteConfirm = useCallback(() => {
		onWorkflowDeleteConfirm(data?.application?.name);
		setDeleteOpen(false);
	}, [data, onWorkflowDeleteConfirm]);

	const handleDeleteClose = useCallback(() => {
		setDeleteOpen(false);
	}, []);

	const handleDeleteOpen = () => {
		setDeleteOpen(true);
	};

	const actions: TableItemAction[] = [
		{
			label: 'View Details',
			onClick: handleAppDetailsOpen,
			disabled: !data,
		},
		{
			label: 'View Onboarding Report',
			disabled: true,
		},
		{
			label: 'Delete',
			onClick: handleDeleteOpen,
			disabled: !data,
		},
	];

	return (
		<>
			<TableActionsMenu actions={actions} />
			<OnboardingApplicationDetails
				open={appDetailsOpen}
				onClose={handleAppDetailsClose}
				data={data}
			/>
			<DeleteModal
				open={deleteOpen}
				name={data?.application?.name}
				handleConfirm={handleDeleteConfirm}
				onClose={handleDeleteClose}
			/>
		</>
	);
};
