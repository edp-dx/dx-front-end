import { Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

import { useCardList } from '../../hooks/useCardList';
import { Card } from '../Card';

export const SearchList = () => {
	const theme = useTheme();
	const list = useCardList();
	return (
		<>
			<Typography variant={'h5'} sx={{ mb: theme.typography.pxToRem(8) }}>
				Search result
			</Typography>
			<Typography
				variant={'body1'}
				color={theme.palette.text.secondary}
				sx={{ mb: theme.typography.pxToRem(24) }}
			>
				Let’s start with some of mostly used tools.
			</Typography>
			<Grid container spacing={4}>
				{list.map((props, idx) => {
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
