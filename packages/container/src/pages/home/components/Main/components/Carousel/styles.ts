import { styled } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { makeStyles } from 'tss-react/mui';

export const StyledCarouselCard = styled('div')(({ theme }) => ({
	height: '100%',
	boxSizing: 'border-box',
	padding: `${theme.typography.pxToRem(16)} ${theme.typography.pxToRem(
		36,
	)} ${theme.typography.pxToRem(16)} ${theme.typography.pxToRem(16)}`,
	boxShadow: '0px 8px 16px rgba(117, 127, 153, 0.4)',
	borderRadius: theme.typography.pxToRem(8),
}));

export const StyledCarouselCardBody = styled('div')(() => ({}));
export const StyledCarouselWrapper = styled('div')(({ theme }) => ({
	translate: theme.typography.pxToRem(-12),
	position: 'relative',

	'& .swiper-button-disabled': {
		display: 'none',
	},
}));

// These values are used to make extra padding to fit in shadows and arrow buttons inside overflow safe area
const carouselHorizontalExtraPadding = 15;
const carouselBottomExtraPadding = 20;

export const StyledSwiper = styled(Swiper)(({ theme }) => ({
	padding: `0 ${theme.typography.pxToRem(
		carouselHorizontalExtraPadding,
	)} ${theme.typography.pxToRem(carouselBottomExtraPadding)} !important`,

	'& .swiper-button-disabled': {
		display: 'none',
	},
}));

export const StyledSwiperSlide = styled(SwiperSlide)(() => ({
	height: 'auto',
}));

export const useStyles = makeStyles()((theme) => ({
	navButton: {
		position: 'absolute',
		zIndex: 2,
		top: `calc(50% - ${theme.typography.pxToRem(carouselBottomExtraPadding)} / 2)`,
		width: theme.typography.pxToRem(35),
		height: theme.typography.pxToRem(35),
		backgroundColor: theme.palette.common.white,
		boxShadow:
			'0px 3px 5px -1px rgba(61, 71, 82, 0.2), 0px 6px 10px rgba(61, 71, 82, 0.14), 0px 1px 18px rgba(61, 71, 82, 0.12)',

		'&:hover': {
			backgroundColor: blueGrey['50'],
		},
	},
	navButtonPrev: {
		left: 0,
		translate: `calc(-50% + ${theme.typography.pxToRem(carouselHorizontalExtraPadding)}) -50%`,
	},
	navButtonNext: {
		right: 0,
		translate: `calc(50% - ${theme.typography.pxToRem(carouselHorizontalExtraPadding)}) -50%`,
	},

	cardText: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		lineClamp: '3',
		WebkitLineClamp: 3,
		WebkitBoxOrient: 'vertical',
	},
}));
