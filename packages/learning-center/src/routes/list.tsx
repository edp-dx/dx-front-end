import { NavLinkProps } from 'react-router-dom';
import { LearningCenterApp } from '~/pages/learning-center';
import { routeLearningCenter, routeLearningCenterExact } from '~/pages/learning-center/route';

export const routesList: NavLinkProps[] = [
	{
		to: routeLearningCenter.to,
		component: LearningCenterApp,
		exact: true,
	},
	{
		to: routeLearningCenterExact.to,
		component: LearningCenterApp,
	},
];
