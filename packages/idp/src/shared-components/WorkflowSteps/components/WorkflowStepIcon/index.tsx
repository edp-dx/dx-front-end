import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';

import { StyledContainer } from './styles';
import { WorkflowStepIconProps } from './types';

export const WorkflowStepIcon = ({
	error,
	completed,
	icon,
	tooltip = '',
	pending,
	active,
	skipped,
}: WorkflowStepIconProps) => {
	const theme = useTheme();
	return (
		<Tooltip arrow placement='top' title={tooltip}>
			<StyledContainer
				sx={[
					completed && {
						backgroundColor: theme.palette.success.light,
					},
					active && {
						backgroundColor: theme.palette.primary.main,
					},
					pending && {
						backgroundColor: theme.palette.text.disabled,
					},
					error && {
						backgroundColor: theme.palette.error.main,
					},
					skipped && {
						backgroundColor: theme.palette.warning.light,
					},
				]}
			>
				{completed && <CheckOutlinedIcon fontSize='small' />}
				{error && <CloseOutlinedIcon fontSize='small' />}
				{active && <ScheduleOutlinedIcon fontSize='small' />}
				{pending && <Typography fontSize='small'>{icon}</Typography>}
				{skipped && <SkipNextIcon fontSize='small' />}
			</StyledContainer>
		</Tooltip>
	);
};
