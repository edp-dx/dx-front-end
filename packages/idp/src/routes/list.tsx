import React from 'react';
import { NavLinkProps } from 'react-router-dom';
import { ApplicationCreationWizard } from '~/pages/application-creation-wizard';
import { routeApplicationCreateWizard } from '~/pages/application-creation-wizard/route';
import { Applications } from '~/pages/applications';
import { routeApplications } from '~/pages/applications/route';
import { ApplicationsSDLC } from '~/pages/sdlc';
import { routeSDLC } from '~/pages/sdlc/route';

export const routesList: NavLinkProps[] = [
	{
		to: routeApplications.to,
		component: React.memo(Applications),
		exact: true,
	},
	{
		to: routeApplicationCreateWizard.to,
		component: React.memo(ApplicationCreationWizard),
	},
	{
		to: routeSDLC.to,
		component: React.memo(ApplicationsSDLC),
	},
];
