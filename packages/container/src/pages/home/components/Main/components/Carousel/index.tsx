import { IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { ReactElement, RefObject, useRef } from 'react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { NavigationOptions } from 'swiper/types';
import { shallow } from 'zustand/shallow';
import { ArrowLeft } from '~/icons/ArrowLeft';
import { ArrowRight } from '~/icons/ArrowRight';
import { useOnboardingTourStore } from '~/store/OnboardingTour';

import { useSlides } from './hooks/useSlides';
import {
	StyledCarouselCard,
	StyledCarouselCardBody,
	StyledCarouselWrapper,
	StyledSwiper,
	StyledSwiperSlide,
	useStyles,
} from './styles';

export const Carousel = (): ReactElement => {
	const { slides } = useSlides();
	const theme = useTheme();
	const { classes, cx } = useStyles();
	const { mainTutorial } = useOnboardingTourStore(
		(state) => ({
			mainTutorial: state.mainTutorial,
		}),
		shallow,
	);

	const navigationPrevRef = useRef<HTMLDivElement>(null);
	const navigationNextRef = useRef<HTMLDivElement>(null);

	return (
		<StyledCarouselWrapper ref={mainTutorial.refs.carouselRef as RefObject<HTMLDivElement>}>
			<div ref={navigationPrevRef}>
				<IconButton size={'large'} className={cx(classes.navButton, classes.navButtonPrev)}>
					<ArrowLeft
						color={theme.palette.primary.main}
						width={theme.typography.pxToRem(16)}
						height={theme.typography.pxToRem(16)}
					/>
				</IconButton>
			</div>
			<div ref={navigationNextRef}>
				<IconButton size={'large'} className={cx(classes.navButton, classes.navButtonNext)}>
					<ArrowRight
						color={theme.palette.primary.main}
						width={theme.typography.pxToRem(16)}
						height={theme.typography.pxToRem(16)}
					/>
				</IconButton>
			</div>
			<StyledSwiper
				slidesPerView={4}
				spaceBetween={26}
				navigation={{
					prevEl: navigationPrevRef.current,
					nextEl: navigationNextRef.current,
				}}
				onBeforeInit={(swiper) => {
					(swiper.params.navigation as NavigationOptions).prevEl =
						navigationPrevRef.current;
					(swiper.params.navigation as NavigationOptions).nextEl =
						navigationNextRef.current;
				}}
				modules={[Navigation]}
			>
				{slides.map(({ icon, title, description }, idx) => {
					const key = `${title}::${idx}`;

					return (
						<StyledSwiperSlide key={key}>
							<StyledCarouselCard>
								<Grid container rowSpacing={4}>
									<Grid xs={12} sx={{ pt: 0 }}>
										<Grid
											container
											columnSpacing={4}
											flexWrap={'nowrap'}
											alignItems={'center'}
										>
											<Grid>{icon}</Grid>
											<Grid>
												<Typography
													variant={'subtitle1'}
													fontWeight={500}
													color={theme.palette.info.main}
													sx={{
														lineHeight: theme.typography.pxToRem(19),
													}}
												>
													{title}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									<Grid xs={12} sx={{ pt: 0 }}>
										<StyledCarouselCardBody>
											<Tooltip title={description} arrow>
												<Typography
													variant={'body2'}
													color={theme.palette.text.secondary}
													className={classes.cardText}
												>
													{description}
												</Typography>
											</Tooltip>
										</StyledCarouselCardBody>
									</Grid>
								</Grid>
							</StyledCarouselCard>
						</StyledSwiperSlide>
					);
				})}
			</StyledSwiper>
		</StyledCarouselWrapper>
	);
};
