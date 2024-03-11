import { Box, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import { useStyles } from './styles';
import { BreadcrumbProps } from './types';

export const BreadcrumbComponent = ({ route, exact, icon, label }: BreadcrumbProps) => {
	const { classes } = useStyles();
	const theme = useTheme();
	const match = useRouteMatch({ path: route, exact: exact });

	return (
		<Stack direction={'row'} alignItems={'center'}>
			{match ? (
				<Stack direction={'row'} alignItems={'center'} spacing={2}>
					<Box className={classes.icon} sx={{ color: theme.palette.text.primary }}>
						{icon}
					</Box>
					{label ? (
						<Typography
							component={'span'}
							variant={'body1'}
							color={theme.palette.text.primary}
						>
							{label}
						</Typography>
					) : null}
				</Stack>
			) : route ? (
				<NavLink
					to={route}
					exact={exact}
					className={classes.navLink}
					activeClassName={classes.navLinkActive}
				>
					<Stack direction={'row'} alignItems={'center'} spacing={2}>
						<Box className={classes.icon}>{icon}</Box>
						{label ? (
							<Typography component={'span'} variant={'body1'}>
								{label}
							</Typography>
						) : null}
					</Stack>
				</NavLink>
			) : (
				<Stack direction={'row'} alignItems={'center'} spacing={2}>
					<Box className={classes.icon} sx={{ color: theme.palette.action.active }}>
						{icon}
					</Box>
					{label ? (
						<Typography
							component={'span'}
							variant={'body1'}
							color={theme.palette.action.active}
						>
							{label}
						</Typography>
					) : null}
				</Stack>
			)}
		</Stack>
	);
};
