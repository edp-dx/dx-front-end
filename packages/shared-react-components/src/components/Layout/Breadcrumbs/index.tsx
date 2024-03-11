import { Stack, Typography, useTheme } from '@mui/material';
import React, { FC, ReactElement } from 'react';

import { BreadcrumbComponent } from './components/Breadcrumb';
import { BreadcrumbsProps } from './types';

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs }): ReactElement => {
	const theme = useTheme();

	return (
		<Stack direction={'row'} alignItems={'center'}>
			{breadcrumbs.map(({ icon, label, route, exact }, idx) => {
				const key = `${route}::${idx}`;

				return (
					<Stack key={key} direction={'row'} alignItems={'center'}>
						{idx !== 0 ? (
							<Typography variant={'body1'} sx={{ mx: theme.typography.pxToRem(8) }}>
								/
							</Typography>
						) : null}
						<BreadcrumbComponent
							route={route}
							exact={exact}
							icon={icon}
							label={label}
						/>
					</Stack>
				);
			})}
		</Stack>
	);
};
