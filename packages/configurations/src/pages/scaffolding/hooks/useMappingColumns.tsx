import { Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { EnvMapping } from '~/services/data/envMapping/model';
import { TableColumn } from '~/types/common';

import { TableEnvMappingActions } from '../components/StepContent/components/EnvMapping/components/TableEnvMappingActions';

export const useMappingColumns = (): TableColumn<EnvMapping>[] => {
	return useMemo(
		() => [
			{
				id: 'name',
				label: 'Name',
				textAlign: 'left',
				columnSortableValuePath: 'env.name',
				render: (data) => <Typography variant={'body1'}>{data.env.name}</Typography>,
			},
			{
				id: 'aws',
				label: 'AWS',
				textAlign: 'left',
				columnSortableValuePath: 'awsEnv.label',
				render: (data) => <Typography variant={'body1'}>{data.awsEnv?.label}</Typography>,
			},
			{
				id: 'gcp',
				label: 'GCP',
				textAlign: 'left',
				columnSortableValuePath: 'gcpEnv.projectName',
				render: (data) => (
					<Typography variant={'body1'}>{data.gcpEnv?.projectName}</Typography>
				),
			},
			{
				id: 'azure',
				label: 'Azure',
				textAlign: 'left',
				columnSortableValuePath: 'azureEnv.accountLabel',
				render: (data) => (
					<Typography variant={'body1'}>{data.azureEnv?.accountLabel}</Typography>
				),
			},
			{
				id: 'kubernetes',
				label: 'Kubernetes',
				textAlign: 'left',
				columnSortableValuePath: 'kubernetes.clusterName',
				render: (data) => (
					<Typography variant={'body1'}>{data.kubernetesEnv?.clusterName}</Typography>
				),
			},
			{
				id: 'classification',
				label: 'Classification',
				textAlign: 'left',
				columnSortableValuePath: 'env.classification',
				render: (data) => (
					<Typography variant={'body1'}>{data.env.classification}</Typography>
				),
			},
			{
				id: 'actions',
				label: 'Actions',
				textAlign: 'center',
				render: (data) => <TableEnvMappingActions data={data} />,
			},
		],
		[],
	);
};
