import { Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { shallow } from 'zustand/shallow';
import { useDashboardStore } from '~/store/Dashboard';
import { SelectOption } from '~/types/common';

export const usePresets = (): SelectOption[] => {
	const theme = useTheme();
	const { widgets } = useDashboardStore(
		(state) => ({
			widgets: state.widgets,
		}),
		shallow,
	);

	return useMemo(
		() => [
			{
				label: (
					<Typography color={theme.palette.text.primary}>Projects Health Map</Typography>
				),
				value: 'projects_health_map',
				disabled: !!widgets.find((el) => el.originName === 'Health Map'),
			},
			{
				label: (
					<Typography color={theme.palette.text.primary}>
						Project Status{' '}
						<Typography color={theme.palette.text.disabled} component={'span'}>
							HRZ
						</Typography>
					</Typography>
				),
				value: 'project_status',
				disabled: !!widgets.find((el) => el.originName === 'Project Status'),
			},
			{
				label: (
					<Typography color={theme.palette.text.primary}>
						Project Details{' '}
						<Typography color={theme.palette.text.disabled} component={'span'}>
							HRZ
						</Typography>
					</Typography>
				),
				value: 'project_details',
				disabled: !!widgets.find((el) => el.originName === 'Project Details'),
			},
			{
				label: (
					<Typography color={theme.palette.text.primary}>
						Project Roadmap{' '}
						<Typography color={theme.palette.text.disabled} component={'span'}>
							HRZ
						</Typography>
					</Typography>
				),
				value: 'project_roadmap',
				disabled: !!widgets.find((el) => el.originName === 'Project Roadmap'),
			},
			{
				label: (
					<Typography color={theme.palette.text.primary}>
						Project Candidates{' '}
						<Typography color={theme.palette.text.disabled} component={'span'}>
							HRZ
						</Typography>
					</Typography>
				),
				value: 'project_candidates',
				disabled: !!widgets.find((el) => el.originName === 'Project Candidates'),
			},
		],
		[theme, widgets],
	);
};
