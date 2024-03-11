import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React from 'react';
import { IssueStatus } from '~/services/data/workflows/model';

export const STATUS_ICON_MAPPING = {
	[IssueStatus.Open]: <BugReportOutlinedIcon fontSize='small' />,
	[IssueStatus.InProgress]: <AccessTimeOutlinedIcon fontSize='small' />,
	[IssueStatus.Closed]: <CheckCircleIcon fontSize='small' />,
	OTHER: <></>,
};

export const STATUS_TEXT_MAPPING = {
	[IssueStatus.Open]: 'OPEN',
	[IssueStatus.InProgress]: 'IN PROGRESS',
	[IssueStatus.Closed]: 'DONE',
};
