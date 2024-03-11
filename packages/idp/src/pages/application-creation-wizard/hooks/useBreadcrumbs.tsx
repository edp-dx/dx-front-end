import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { Molecules } from '~/icons/Molecules';
import { Breadcrumb } from '~/types/common';

import { routeApplicationCreateWizard } from '../route';

export const useBreadcrumbs = (): Breadcrumb[] => {
	const theme = useTheme();

	return useMemo(
		() => [
			{
				icon: (
					<HomeIcon
						sx={{
							width: theme.typography.pxToRem(16),
							height: theme.typography.pxToRem(16),
						}}
					/>
				),
				route: '/',
				exact: true,
			},
			{
				label: 'IDP: Applications',
				disabled: true,
				exact: true,
			},
			{
				route: routeApplicationCreateWizard.to,
				icon: (
					<Molecules
						sx={{
							width: theme.typography.pxToRem(16),
							height: theme.typography.pxToRem(16),
						}}
					/>
				),
				label: 'Create Application',
				exact: true,
			},
		],
		[theme.typography],
	);
};
