import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {
	Button,
	ButtonBase,
	CardActions,
	CardContent,
	CardMedia,
	Card as MuiCard,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import React, { FC, ReactElement, useCallback, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { useLearningCenterStore } from '~/store/LearningCenter';

import { LEARNING_CENTER_CARD_TYPES } from '../../constants';
import { CardProps } from './types';

export const Card: FC<CardProps> = ({
	id,
	type,
	title,
	description,
	imageURL,
	videoURL,
	videoThumbURL,
	href,
	category,
	noActions = false,
}): ReactElement => {
	const theme = useTheme();
	const videoRef: any = useRef();
	const { favorites, toggleFavorite, open, setOpen } = useLearningCenterStore(
		(state) => ({
			open: state.open,
			setOpen: state.setOpen,
			favorites: state.favorites,
			toggleFavorite: state.toggleFavorite,
		}),
		shallow,
	);

	const handleClose = () => {
		setOpen(false);
	};

	const handleToggleFavorite = useCallback(() => toggleFavorite(id), [id, toggleFavorite]);
	const isFavorite = useMemo(() => favorites.includes(id), [favorites, id]);

	useEffect(() => {
		if (!open) videoRef.current?.pause();
	}, [open]);

	return (
		<MuiCard
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{videoURL ? (
				<video
					ref={videoRef}
					controls
					preload='none'
					controlsList='nodownload'
					poster={videoThumbURL}
					style={{ width: '100%', minHeight: theme.typography.pxToRem(158) }}
				>
					<source src={videoURL} type={'video/mp4'} />
				</video>
			) : (
				<CardMedia
					sx={{ height: theme.typography.pxToRem(158) }}
					image={imageURL}
					title={title}
				/>
			)}

			<CardContent
				sx={{
					padding: `${theme.typography.pxToRem(18)} ${theme.typography.pxToRem(
						16,
					)} ${theme.typography.pxToRem(16)}`,
					flexGrow: 1,
				}}
			>
				<Stack
					direction={'row'}
					alignItems={'center'}
					spacing={2}
					justifyContent={'space-between'}
					sx={{ mb: theme.typography.pxToRem(8) }}
				>
					<Typography variant={'subtitle2'} color={theme.palette.primary.main}>
						{category}
					</Typography>
					<ButtonBase onClick={handleToggleFavorite} disableRipple disableTouchRipple>
						{isFavorite ? (
							<StarIcon
								sx={{
									width: theme.typography.pxToRem(20),
									height: theme.typography.pxToRem(20),
									color: theme.palette.action.active,
								}}
							/>
						) : (
							<StarOutlineIcon
								sx={{
									width: theme.typography.pxToRem(20),
									height: theme.typography.pxToRem(20),
									color: theme.palette.action.active,
								}}
							/>
						)}
					</ButtonBase>
				</Stack>
				<Typography variant='h6' sx={{ mb: theme.typography.pxToRem(8) }}>
					{title}
				</Typography>
				<Typography variant='body2' color={theme.palette.text.secondary}>
					{description}
				</Typography>
			</CardContent>
			{!noActions ? (
				<CardActions sx={{ justifyContent: 'center', pb: theme.typography.pxToRem(12) }}>
					{type === LEARNING_CENTER_CARD_TYPES.ACADEMY ? (
						<Button size='small' variant={'contained'} href={href} target={'_blank'}>
							start learning
						</Button>
					) : type === LEARNING_CENTER_CARD_TYPES.USE_CASE ? (
						<Link to={href || '#'}>
							<Button size='small' variant={'contained'} onClick={handleClose}>
								open case
							</Button>
						</Link>
					) : type === LEARNING_CENTER_CARD_TYPES.DOC_AS_CODE ? (
						<Link to={href || '#'}>
							<Button size='small' variant={'contained'} onClick={handleClose}>
								open article
							</Button>
						</Link>
					) : type === LEARNING_CENTER_CARD_TYPES.TOOL ? (
						<Button size='small' variant={'contained'}>
							read
						</Button>
					) : null}
				</CardActions>
			) : null}
		</MuiCard>
	);
};
