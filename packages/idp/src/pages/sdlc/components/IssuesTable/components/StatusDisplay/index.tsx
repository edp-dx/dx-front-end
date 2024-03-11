import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { IssueStatus } from '~/services/data/workflows/model';

import { STATUS_ICON_MAPPING, STATUS_TEXT_MAPPING } from './constants';
import { StatusDisplayProps } from './types';

export const StatusDisplay = ({ status }: StatusDisplayProps) => {
	const theme = useTheme();
	if (!status) {
		return null;
	}
	return (
		<Stack
			direction='row'
			spacing={2}
			alignItems='center'
			sx={[
				status === IssueStatus.Closed && {
					color: theme.palette.success.light,
				},
				status === IssueStatus.InProgress && {
					color: theme.palette.primary.main,
				},
				status === IssueStatus.Open && {
					color: theme.palette.text.secondary,
				},
			]}
		>
			{STATUS_ICON_MAPPING[status] || STATUS_ICON_MAPPING.OTHER}
			<Typography variant={'body1'} fontWeight={500} fontSize={13} lineHeight='22px'>
				{STATUS_TEXT_MAPPING[status] || status.toUpperCase()}
			</Typography>
		</Stack>
	);
};
