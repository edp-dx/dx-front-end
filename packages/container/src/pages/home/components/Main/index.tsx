import { Box, Container, Typography, useTheme } from '@mui/material';
import React from 'react';
import { ReactElement } from 'react';
import { Carousel } from '~/pages/home/components/Main/components/Carousel';
import {
	StyledCarouselSection,
	StyledGradient,
	StyledMain,
} from '~/pages/home/components/Main/styles';

import { Search } from './components/Search';

export const Main = (): ReactElement => {
	const theme = useTheme();

	return (
		<StyledMain>
			<Container maxWidth={'lg'}>
				<Box sx={{ mb: theme.typography.pxToRem(32) }}>
					<Search />
				</Box>
				<StyledCarouselSection>
					<StyledGradient />
					<Typography variant={'h4'} sx={{ letterSpacing: theme.typography.pxToRem(1) }}>
						Let’s get started!
					</Typography>
					<Typography
						variant={'h6'}
						fontWeight={'normal'}
						color={theme.palette.text.disabled}
						sx={{ mb: theme.typography.pxToRem(27) }}
						letterSpacing={theme.typography.pxToRem(-0.7)}
					>
						Choose a way you want to get deeper first...
					</Typography>
					<Carousel />
				</StyledCarouselSection>
			</Container>
		</StyledMain>
	);
};
