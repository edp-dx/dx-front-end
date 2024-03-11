import { Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { ReactElement, useMemo } from 'react';
import { shallow } from 'zustand/shallow';
import { useLearningCenterStore } from '~/store/LearningCenter';

import { Card } from '../../components/Card';
import { list as academyList } from '../Academy/list';
import { list as gettingStartedList } from '../GettingStarted/list';
import { list as useCasesList } from '../UseCases/list';

export const MyFavorite = (): ReactElement => {
	const theme = useTheme();
	const { filter, favorites } = useLearningCenterStore(
		(state) => ({
			filter: state.filter,
			favorites: state.favorites,
		}),
		shallow,
	);
	const list = useMemo(
		() =>
			[...gettingStartedList, ...useCasesList, ...academyList].filter(({ id }) =>
				favorites.includes(id),
			),
		[favorites],
	);

	return (
		<>
			<Typography variant={'h5'} sx={{ mb: theme.typography.pxToRem(8) }}>
				My Favorite
			</Typography>
			<Typography
				variant={'body1'}
				color={theme.palette.text.secondary}
				sx={{ mb: theme.typography.pxToRem(24) }}
			>
				Try out several helpful workflows in action.
			</Typography>
			<Grid container spacing={4}>
				{(filter ? list.slice(-2) : list).map((props, idx) => {
					const key = `favorite-item-${idx}`;

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
