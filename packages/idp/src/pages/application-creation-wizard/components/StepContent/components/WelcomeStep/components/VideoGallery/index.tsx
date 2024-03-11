import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Box, Stack, Tab, Typography, useTheme } from '@mui/material';
import React, { RefObject, createRef, useCallback, useMemo, useState } from 'react';
import { sleep } from '~/utils/sleep';

import { Video } from './mocks/types';
import videoList from './mocks/videos.mock.json';
import {
	StyledNavItem,
	StyledNavItemIcon,
	StyledVideo,
	StyledVideoGalleryGridItem,
	StyledVideoGalleryNavTabs,
	StyledVideoGalleryWrapper,
} from './styles';

const a11yProps = (index: number) => ({
	id: `tab-${index}`,
	'aria-controls': `tabpanel-${index}`,
});

export const VideoGallery = () => {
	const [activeVideoFragmentIndex, setActiveVideoFragmentIndex] = useState<number>(0);
	const { videos }: { videos: Video[] } = videoList;

	const theme = useTheme();

	const videoRefsById = useMemo(() => {
		const refs: {
			[key: number]: RefObject<HTMLVideoElement>;
		} = {};

		for (const index in videos) {
			refs[index] = createRef();
		}

		return refs;
	}, [videos]);

	const handleChange = useCallback(
		async (newIndex: number) => {
			setActiveVideoFragmentIndex(newIndex);
			videoRefsById[activeVideoFragmentIndex].current.pause();
			await sleep(500);
			await videoRefsById[newIndex].current.play();
		},
		[activeVideoFragmentIndex, videoRefsById],
	);

	return (
		<StyledVideoGalleryWrapper>
			<StyledVideoGalleryGridItem container alignItems={'center'}>
				<StyledVideoGalleryGridItem xs={6}>
					{videos.map(({ id, thumb, source, type }: Video, idx) => {
						const key = `video::${id}`;

						return (
							<Box
								key={key}
								role='tabpanel'
								id={`tabpanel-${id}`}
								aria-labelledby={`tab-${id}`}
								sx={{
									display: activeVideoFragmentIndex !== id ? 'none' : 'flex',
								}}
							>
								<StyledVideo
									controls
									preload='none'
									poster={thumb}
									controlsList='nodownload'
									ref={videoRefsById[idx]}
								>
									<source src={source} type={type} />
								</StyledVideo>
							</Box>
						);
					})}
				</StyledVideoGalleryGridItem>
				<StyledVideoGalleryGridItem xs={6}>
					<StyledNavItem>
						<StyledNavItemIcon>
							<PlayCircleOutlineIcon />
						</StyledNavItemIcon>
						<Typography>Onboarding Video Chapters List</Typography>
					</StyledNavItem>
					<StyledVideoGalleryNavTabs
						orientation={'vertical'}
						variant={'scrollable'}
						value={activeVideoFragmentIndex}
						aria-label={'Video fragments navigation'}
						TabIndicatorProps={{
							style: { display: 'none' },
						}}
					>
						{videos.map(({ id, title }: Video, idx: number) => {
							const key = `${id}::${idx}`;

							return (
								<Tab
									disableRipple
									key={key}
									sx={{
										padding: `${theme.typography.pxToRem(
											6,
										)} ${theme.typography.pxToRem(16)}`,
										maxWidth: 'initial',
									}}
									label={
										<Stack direction={'row'} spacing={3} alignItems={'center'}>
											<Box
												sx={{
													width: theme.typography.pxToRem(24),
													height: theme.typography.pxToRem(24),
												}}
											/>
											<Typography
												variant={'body2'}
												color={theme.palette.text.primary}
											>
												{title}
											</Typography>
										</Stack>
									}
									onClick={() => handleChange(idx)}
									iconPosition={'start'}
									{...a11yProps(idx)}
								/>
							);
						})}
					</StyledVideoGalleryNavTabs>
				</StyledVideoGalleryGridItem>
			</StyledVideoGalleryGridItem>
		</StyledVideoGalleryWrapper>
	);
};
