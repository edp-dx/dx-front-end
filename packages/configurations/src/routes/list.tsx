import { NavLinkProps } from 'react-router-dom';
import { Scaffolding } from '~/pages/scaffolding';
import { routeScaffolding } from '~/pages/scaffolding/route';
import { TemplatesManagement } from '~/pages/templates-management';
import { routeTemplatesManagement } from '~/pages/templates-management/route';

export const routesList: NavLinkProps[] = [
	{
		to: routeScaffolding.to,
		component: Scaffolding,
	},
	{
		to: routeTemplatesManagement.to,
		component: TemplatesManagement,
	},
];
