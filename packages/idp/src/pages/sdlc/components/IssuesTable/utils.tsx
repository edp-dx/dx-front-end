import { Link, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Issue } from '~/services/data/workflows/model';

import { TableColumn } from '../../../../../../shared-react-components/src/components/Table/types';
import { IssuesTableItemActions } from './components/IssuesTableItemActions';
import { StatusDisplay } from './components/StatusDisplay';

export const getIssuesColumns = (): TableColumn<Issue>[] => {
	return [
		{
			id: 'jiraIssue',
			label: 'Task #',
			columnSortableValuePath: 'jiraIssue',
			width: '160px',
			render: ({ jiraIssue, jiraIssueUrl }) => (
				<Tooltip title={jiraIssueUrl}>
					<Link href={jiraIssueUrl} target='_blank' underline='none'>
						<Typography variant={'body1'}>{jiraIssue}</Typography>
					</Link>
				</Tooltip>
			),
		},
		{
			id: 'appName',
			label: 'Application Name',
			columnSortableValuePath: 'appName',
			width: '320px',
			render: ({ appName }) => (
				<Tooltip title={appName} placement={'top'} arrow>
					<Typography variant={'body1'}> {appName} </Typography>
				</Tooltip>
			),
		},
		{
			id: 'title',
			label: 'Bug Ticket',
			columnSortableValuePath: 'title',
			render: ({ title, bugUrl }) => (
				<Tooltip title={bugUrl} placement={'top'} arrow>
					<Link href={bugUrl} target='_blank' underline='none'>
						<Typography variant={'body1'}> {title} </Typography>
					</Link>
				</Tooltip>
			),
		},
		{
			id: 'status',
			label: 'Issue Status',
			columnSortableValuePath: 'status',
			width: '220px',
			render: ({ status }) => <StatusDisplay status={status} />,
		},
		{
			id: 'actions',
			label: 'Actions',
			textAlign: 'center',
			width: '84px',
			render: () => <IssuesTableItemActions />,
		},
	];
};

export const DEFAULT_TIMEOUT = 6000;
