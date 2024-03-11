import { Tooltip, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { EnvManagement } from '~/services/data/envManagement/model';
import { TableColumn } from '~/types/common';

import { TableEnvManagementActions } from '../components/StepContent/components/EnvManagement/components/TableEnvManagementActions';

export const useColumns = (): TableColumn<EnvManagement>[] => {
	return useMemo(() => {
		return [
			{
				id: 'name',
				label: 'Environment Name',
				textAlign: 'left',
				columnSortableValuePath: 'name',
				render: (data) => <Typography variant={'body1'}>{data.name}</Typography>,
			},
			{
				id: 'description',
				label: 'Description',
				textAlign: 'left',
				columnSortableValuePath: 'description',
				render: (data) => (
					<Tooltip title={data.description} placement={'top'} arrow>
						<Typography variant={'body1'}>{data.description}</Typography>
					</Tooltip>
				),
			},
			{
				id: 'classification',
				label: 'Classification',
				textAlign: 'left',
				columnSortableValuePath: 'classification',
				render: (data) => <Typography variant={'body1'}>{data.classification}</Typography>,
			},
			{
				id: 'actions',
				label: 'Actions',
				textAlign: 'center',
				render: (data) => <TableEnvManagementActions data={data} />,
			},
		];
	}, []);
};
