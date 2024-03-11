import { NavLinkProps } from 'react-router-dom';
import { ConfigurationsApp } from '~/pages/configurations';
import { routeConfigurations } from '~/pages/configurations/route';
import { DashboardApp } from '~/pages/dashboard';
import { routeDashboard } from '~/pages/dashboard/route';
import { Home } from '~/pages/home';
import { routeHome } from '~/pages/home/route';
import { IDPApp } from '~/pages/idp';
import { routeIDP } from '~/pages/idp/route';
import { LearningCenterApp } from '~/pages/learning-center';
import { routeLearningCenter } from '~/pages/learning-center/route';

export const routesList: NavLinkProps[] = [
	{
		to: routeHome.to,
		component: Home,
		exact: true,
	},
	{
		to: routeIDP.to,
		component: IDPApp,
	},
	{
		to: routeDashboard.to,
		component: DashboardApp,
	},
	{
		to: routeConfigurations.to,
		component: ConfigurationsApp,
	},
	{
		to: routeLearningCenter.to,
		component: LearningCenterApp,
	},
];
