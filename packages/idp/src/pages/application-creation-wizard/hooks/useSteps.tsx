import React from 'react';
import { useMemo } from 'react';
import { ConfirmationStep } from '~/pages/application-creation-wizard/components/StepContent/components/ConfirmationStep';
import { GeneralInfoStep } from '~/pages/application-creation-wizard/components/StepContent/components/GeneralInfoStep';
import { PreviewStep } from '~/pages/application-creation-wizard/components/StepContent/components/PreviewStep';
import { RunProcessStep } from '~/pages/application-creation-wizard/components/StepContent/components/RunProcessStep';

import { SelectTemplateStep } from '../components/StepContent/components/SelectTemplateStep';
import { WelcomeStep } from '../components/StepContent/components/WelcomeStep';
import { Step } from '../types';

export const useSteps = (): Step[] => {
	return useMemo(
		() => [
			{
				id: 'welcome',
				navLabel: 'Welcome',
				title: 'Welcome to Internal Developer Platform',
				component: <WelcomeStep />,
			},
			{
				id: 'selectTemplate',
				navLabel: 'Select Template',
				title: 'Select Template',
				description: 'Start by selecting an appropriate template for your application.',
				component: <SelectTemplateStep />,
			},
			{
				id: 'generalInformation',
				navLabel: 'General Information',
				title: 'Define Parameters',
				description:
					'Specify your application name with a description and indicate the application owner along with the other details.',
				component: <GeneralInfoStep />,
			},
			{
				id: 'preview',
				navLabel: 'Preview',
				title: 'App Details Preview',
				description: 'Revise the application details before its creation.',
				component: <PreviewStep />,
			},
			{
				id: 'runProcess',
				navLabel: 'Run Process',
				title: 'Running Scaffolding Process',
				description: 'The building process can take up to 20 sec…',
				component: <RunProcessStep />,
			},
			{
				id: 'confirmation',
				navLabel: 'Confirmation',
				title: 'Completed',
				component: <ConfirmationStep />,
			},
		],
		[],
	);
};
