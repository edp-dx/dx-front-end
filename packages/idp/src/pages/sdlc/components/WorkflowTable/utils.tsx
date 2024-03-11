import { Link, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { GitPull } from '~/icons/GitPull';
import { CreatedApplicationDetails } from '~/pages/applications/components/CreatedApplicationsTable/components/CreatedApplicationDetails';
import { Application } from '~/services/data/applications/model';
import { Workflow } from '~/services/data/workflows/model';
import { TableCell } from '~/shared-components/TableCell';
import { WorkflowSteps } from '~/shared-components/WorkflowSteps';
import { StyledLinkWithDisabledStatus } from '~/shared-styles';
import { getAppData } from '~/utils/getAppData';

import { TableColumn } from '../../../../../../shared-react-components/src/components/Table/types';
import { WorkflowTableItemActions } from './components/WorkflowTableItemActions';

export const getWorkflowColumns = (applications: Array<Application>): TableColumn<Workflow>[] => {
	return [
		{
			id: 'jiraIssue',
			label: 'Task #',
			columnSortableValuePath: 'jiraIssue',
			width: '160px',
			render: ({ jiraIssue, jiraIssueUrl }) => {
				return (
					<Tooltip title={jiraIssueUrl}>
						<Link href={jiraIssueUrl} target='_blank' underline='none'>
							<Typography variant={'body1'}>{jiraIssue}</Typography>
						</Link>
					</Tooltip>
				);
			},
		},
		{
			id: 'appName',
			label: 'Application Name',
			columnSortableValuePath: 'appName',
			width: '300px',
			render: ({ appName, prLink }) => {
				const appData = getAppData(appName, applications);
				if (appData) {
					return (
						<TableCell
							shouldDisplayPrLink
							prLink={prLink}
							name={appName}
							data={appData}
							modal={CreatedApplicationDetails}
							maxWidth='250px'
						/>
					);
				}
				return (
					<Stack direction={'row'}>
						<Tooltip title={appName} placement={'top'} arrow>
							<Typography variant={'body1'}>{appName}</Typography>
						</Tooltip>
						<StyledLinkWithDisabledStatus
							target='_blank'
							href={prLink}
							disabled={!prLink}
						>
							<GitPull width='24px' height='24px' />
						</StyledLinkWithDisabledStatus>
					</Stack>
				);
			},
		},
		{
			id: 'workflowSteps',
			label: 'Workflow Steps',
			customizable: false,
			render: (data) => <WorkflowSteps steps={data.steps} />,
		},
		{
			id: 'actions',
			label: 'Actions',
			textAlign: 'center',
			width: '84px',
			render: (data) => <WorkflowTableItemActions data={data} />,
		},
	];
};
export const DEFAULT_TIMEOUT = 6000;
