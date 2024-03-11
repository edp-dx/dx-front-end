import {
	routeConfigurations,
	routeScaffolding,
	routeTemplatesManagement,
} from '~/pages/configurations/route';
import { routeDashboard } from '~/pages/dashboard/route';
import { routeHome } from '~/pages/home/route';
import {
	routeIDP,
	routeIDPAIEmpoweredSDLC,
	routeIDPApplicationCreate,
	routeIDPApplications,
} from '~/pages/idp/route';

import { NavLink } from './types';

export const headerNavLinks: NavLink[] = [
	{
		to: routeHome.to,
		name: routeHome.name,
		exact: true,
	},
	{
		to: routeDashboard.to,
		name: routeDashboard.name,
	},
	{
		to: routeIDP.to,
		name: routeIDP.name,
		subMenuList: [
			{
				to: routeIDPApplications.to,
				name: routeIDPApplications.name,
			},
			{
				to: routeIDPApplicationCreate.to,
				name: routeIDPApplicationCreate.name,
			},
			{
				to: routeIDPAIEmpoweredSDLC.to,
				name: routeIDPAIEmpoweredSDLC.name,
			},
		],
	},
	{
		to: routeConfigurations.to,
		name: routeConfigurations.name,
		subMenuList: [
			{
				to: routeScaffolding.to,
				name: routeScaffolding.name,
			},
			{
				to: routeTemplatesManagement.to,
				name: routeTemplatesManagement.name,
			},
		],
	},
];
