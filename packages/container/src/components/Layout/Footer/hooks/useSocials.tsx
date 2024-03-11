import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import React, { ReactElement } from 'react';

interface Social {
	href: string;
	title: string;
	icon: ReactElement;
}

export const useSocials = (): { socials: Social[] } => {
	const theme = useTheme();

	const socialsProps = {
		sx: {
			color: blueGrey[200],
		},
		width: theme.typography.pxToRem(24),
		height: theme.typography.pxToRem(24),
	};

	const socials = [
		{
			href: '#',
			title: 'Facebook',
			icon: <FacebookRoundedIcon {...socialsProps} />,
		},
		{
			href: '#',
			title: 'Linkedin',
			icon: <LinkedInIcon {...socialsProps} />,
		},
		{
			href: '#',
			title: 'Youtube',
			icon: <YouTubeIcon {...socialsProps} />,
		},
		{
			href: '#',
			title: 'Instagram',
			icon: <InstagramIcon {...socialsProps} />,
		},
		{
			href: '#',
			title: 'Twitter',
			icon: <TwitterIcon {...socialsProps} />,
		},
	];

	return { socials };
};
