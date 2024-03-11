import { useTheme } from '@mui/material';
import React from 'react';
import { Api } from '~/icons/Api';
import { Dashboard } from '~/icons/Dashboard';
import { DigitalPlatform } from '~/icons/DigitalPlatform';
import { Hat } from '~/icons/Hat';
import { KnowledgeBase } from '~/icons/KnowledgeBase';
import { Notification } from '~/icons/Notification';
import { OpenedBook } from '~/icons/OpenedBook';
import { SupplyChain } from '~/icons/SupplyChain';
import { CarouselSlide } from '~/pages/home/components/Main/types';

export const useSlides = (): {
	slides: CarouselSlide[];
} => {
	const theme = useTheme();

	const iconProps = {
		color: theme.palette.secondary.main,
		width: theme.typography.pxToRem(40),
		height: theme.typography.pxToRem(40),
	};

	const slides: CarouselSlide[] = [
		{
			icon: <DigitalPlatform {...iconProps} />,
			title: 'Internal Developer Platform',
			description:
				'Enable engineers’ productivity via automation of main development processes.',
		},
		{
			icon: <Dashboard {...iconProps} />,
			title: 'Dashboards & Metrics',
			description:
				'Provide joint 360 helicopter view on SDLC and other engineering processes in collaboration with enterprise logging and monitoring systems.',
		},
		{
			icon: <Hat {...iconProps} />,
			title: 'Learning Center',
			description:
				'Gain experience in communities in different IT areas. Provides recommendations about learning courses based on AI/ML to cover technology and soft skill gaps required for a project. Enables smooth onboarding of newcomers.',
		},

		{
			icon: <KnowledgeBase {...iconProps} />,
			title: 'Knowledge Management',
			description:
				'Enable communication across silos and enforces horizontal corporate connections between engineers.',
		},
		{
			icon: <SupplyChain {...iconProps} />,
			title: 'People & Project Management',
			description:
				'Enable integration of enterprise resources into delivery and other engineering processes.',
		},

		{
			icon: <Notification {...iconProps} />,
			title: 'Notifications Center',
			description:
				'Enable personalized comprehensive event view and delivery channel configuration for engineers.',
		},
		{
			icon: <Api {...iconProps} />,
			title: 'API Portal',
			description:
				'Stay connected with API portfolio management within development processes.',
		},
		{
			icon: <OpenedBook {...iconProps} />,
			title: 'Enterprise Taxonomy',
			description:
				'Enable unification of enterprise taxonomy use across enterprise processes for engineers.',
		},
	];

	return { slides };
};
