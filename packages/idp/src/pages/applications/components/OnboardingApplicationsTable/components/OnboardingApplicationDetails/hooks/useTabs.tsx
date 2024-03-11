import React from 'react';
import { ApplicationDetails, Technology } from '~/services/data/applications/model';
import { Template } from '~/services/data/categories/model';
import { OnboardingApplication } from '~/services/data/workflows/model';

import { GeneralInfo } from '../components/GeneralInfo';
import { OnboardingReport } from '../components/OnboardingReport';
import { Technologies } from '../components/Technologies';

export const useTabs = (application: OnboardingApplication, discoveredTechnology: Technology) => {
	return React.useMemo(() => {
		const appDetails: ApplicationDetails =
			application?.application?.details || ({} as ApplicationDetails);
		const {
			language,
			buildTool,
			framework,
			deploymentPlatform,
			components,
			name: templateName,
			categoryName,
		} = appDetails.migrationTemplate || ({} as Template);
		const recommendedTechnology = {
			language,
			buildTool,
			framework,
			deploymentPlatform,
			components,
		};
		return [
			{
				label: 'General info',
				key: 'generalInfo',
				component: <GeneralInfo application={application} />,
			},
			{
				label: 'Technologies Discovered',
				key: 'technologiesDiscovered',
				component: (
					<Technologies
						specification={appDetails.specification}
						businessUnitName={appDetails.businessUnitName}
						technology={discoveredTechnology}
					/>
				),
			},
			{
				label: 'Technologies Recommended',
				key: 'technologiesRecommended',
				component: (
					<Technologies
						specification={appDetails.specification}
						businessUnitName={appDetails.businessUnitName}
						technology={recommendedTechnology}
						templateName={templateName}
						categoryName={categoryName}
						shouldDisableSpecification
					/>
				),
			},
			{
				label: 'Onboarding report',
				key: 'onboardingReport',
				component: <OnboardingReport data={application?.onboardingReport} />,
			},
		];
	}, [application, discoveredTechnology]);
};
