import { PageRoute } from '~/types/common';

export const routeIDP: PageRoute = {
	to: '/idp',
	name: 'Applications',
};

export const routeIDPApplications: PageRoute = {
	to: '/idp/applications',
	name: 'Manage Applications',
};

export const routeIDPApplicationCreate: PageRoute = {
	to: '/idp/applications/create',
	name: 'Create New Application',
};

export const routeIDPAIEmpoweredSDLC: PageRoute = {
	to: '/idp/applications/sdlc',
	name: 'AI-Empowered SDLC',
};
