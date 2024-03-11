import { Container, Typography, useTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import bannerImage from 'public/assets/banner_image2337x1898.webp';
import React from 'react';
import { ReactElement } from 'react';

import {
	StyledBanner,
	StyledBannerContainerInner,
	StyledBannerContainerSubline,
	StyledBannerImage,
	StyledBannerOverPicture,
} from './styles';

export const Banner = (): ReactElement => {
	const theme = useTheme();

	return (
		<StyledBanner>
			<StyledBannerImage src={bannerImage} alt='' />
			<StyledBannerOverPicture>
				<Container maxWidth={'lg'} sx={{ height: '100%' }}>
					<StyledBannerContainerInner>
						<Typography
							variant={'h3'}
							fontWeight={'bold'}
							fontFamily={theme.typography.fontFamilySecondary}
							color={blueGrey[800]}
							lineHeight={theme.typography.pxToRem(48)}
							letterSpacing={theme.typography.pxToRem(1.5)}
						>
							Welcome to Developer Experience Demo Portal
						</Typography>
						<StyledBannerContainerSubline>
							<Typography variant={'body1'} color={theme.palette.common.white}>
								Apply world-class engineering best practices across all enterprises.
								Provide a trustful and convenient environment for engineers to do
								their daily routines. Build your “hello world” application according
								to all the policies and compliances within minutes not weeks.
								Measure and improve personal and team productivity via the
								implementation of best practices and enforcement of communication
								across silos.
							</Typography>
						</StyledBannerContainerSubline>
					</StyledBannerContainerInner>
				</Container>
			</StyledBannerOverPicture>
		</StyledBanner>
	);
};
