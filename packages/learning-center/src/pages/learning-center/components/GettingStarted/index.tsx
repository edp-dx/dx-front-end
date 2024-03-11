import { Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { ReactElement } from 'react';
import { shallow } from 'zustand/shallow';
import { useLearningCenterStore } from '~/store/LearningCenter';

import { Card } from '../../components/Card';
import { list } from './list';

export const GettingStarted = (): ReactElement => {
	const theme = useTheme();
	const { filter } = useLearningCenterStore(
		(state) => ({
			filter: state.filter,
		}),
		shallow,
	);

	return (
		<>
			<Typography variant={'h5'} sx={{ mb: theme.typography.pxToRem(8) }}>
				Getting Started
			</Typography>
			<Typography
				variant={'body1'}
				color={theme.palette.text.secondary}
				sx={{ mb: theme.typography.pxToRem(24) }}
			>
				Let’s start with some of mostly used tools.
			</Typography>
			<Grid container spacing={4}>
				{(filter ? list.slice(-2) : list).map((props, idx) => {
					const key = `tool-item-${idx}`;

					return (
						<Grid key={key} xs={4}>
							<Card {...props} />
						</Grid>
					);
				})}
			</Grid>
		</>
	);
};
