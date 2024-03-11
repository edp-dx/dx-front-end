import React from 'react';
import { useMemo } from 'react';

import { CDEnvConfiguration } from '../components/StepContent/components/CDEnvConfiguration';
import { EnvConfiguration } from '../components/StepContent/components/EnvConfiguration';
import { EnvironmentManagement } from '../components/StepContent/components/EnvManagement';
import { EnvironmentMapping } from '../components/StepContent/components/EnvMapping';
import { LOBSelection } from '../components/StepContent/components/LOBSelection';
import { Step } from '../types';

export const useSteps = (currentLOB: string): Step[] => {
	return useMemo(
		() => [
			{
				id: 'lob-selection',
				navLabel: 'LOB Selection',
				title: 'LOB Selection',
				description: 'Start by selecting an appropriate LOB for configuration management.',
				component: <LOBSelection />,
			},
			{
				id: 'env-management',
				navLabel: 'Environment Management',
				title: `${currentLOB} Environment Management`,
				description: 'Start by adding a new LOB environment.',
				component: <EnvironmentManagement />,
			},
			{
				id: 'env-configuration',
				navLabel: 'Environment Configuration',
				title: `${currentLOB} Environment Configuration`,
				description: 'Add necessary components to set up your environment.',
				component: <EnvConfiguration />,
			},
			{
				id: 'env-mapping',
				navLabel: 'Environment Mapping',
				title: `${currentLOB} Environment Mapping`,
				description: 'Add the Environment Mapping.',
				component: <EnvironmentMapping />,
			},
			{
				id: 'cd-env-cfg',
				navLabel: 'CI/CD Environment Configuration',
				title: `${currentLOB} CI/CD Environment Configuration`,
				description: 'Define CI/CD Environment Configuration.',
				component: <CDEnvConfiguration />,
			},
		],
		[currentLOB],
	);
};
