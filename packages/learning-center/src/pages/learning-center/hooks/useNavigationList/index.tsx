import FeedbackIcon from '@mui/icons-material/Feedback';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import SupportIcon from '@mui/icons-material/Support';
import WorkIcon from '@mui/icons-material/Work';
import { useTheme } from '@mui/material';
import React from 'react';
import { Flag } from '~/icons/Flag';
import { Gift } from '~/icons/Gift';
import { Hat } from '~/icons/Hat';

import { NavItem, UseNavigationListReturnType } from './types';

export const useNavigationList = (): UseNavigationListReturnType => {
	const theme = useTheme();

	const iconProps = {
		width: theme.typography.pxToRem(24),
		height: theme.typography.pxToRem(24),
		style: {
			marginRight: theme.typography.pxToRem(8),
			color: theme.palette.action.active,
		},
	};

	const list: NavItem[] = [
		{
			icon: <Flag {...iconProps} />,
			name: 'getting_started',
			label: 'Getting Started',
		},
		{
			icon: <WorkIcon {...iconProps} />,
			name: 'use_cases',
			label: 'Cases',
		},
		{
			icon: <StarIcon {...iconProps} />,
			name: 'my_favorite',
			label: 'My Favorite',
		},
		{
			name: 'divider',
		},
		{
			icon: <PeopleIcon {...iconProps} />,
			name: 'ask_community',
			label: 'Ask Community',
			disabled: true,
		},
		{
			icon: <LightbulbIcon {...iconProps} />,
			name: 'submit_your_idea',
			label: 'Submit Your Idea',
			disabled: true,
		},
		{
			icon: <SupportIcon {...iconProps} />,
			name: 'contact_support',
			label: 'Contact Support',
			disabled: true,
		},
		{
			name: 'divider',
		},
		{
			icon: <Gift {...iconProps} />,
			name: 'whats_new',
			label: 'What’s New',
			disabled: true,
		},
		{
			icon: <Hat {...iconProps} />,
			name: 'academy',
			label: 'Academy',
		},
		{
			name: 'divider',
		},
		{
			icon: <FeedbackIcon {...iconProps} />,
			name: 'give_your_feedback',
			label: 'Give Your Feedback',
			disabled: true,
		},
	];

	return { list };
};
