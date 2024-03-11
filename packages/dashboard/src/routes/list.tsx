import { NavLinkProps } from 'react-router-dom';
import { Dashboard } from '~/pages/dashboard';
import { routeDashboard } from '~/pages/dashboard/route';

export const routesList: NavLinkProps[] = [
	{
		to: routeDashboard.to,
		component: Dashboard,
		exact: true,
	},
];
