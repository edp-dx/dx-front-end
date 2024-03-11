import React, { ReactElement } from 'react';
import { Page } from '~/components/Layout/Page';
import { OnboardingTour } from '~/components/Other/OnboardingTour';

import { Banner } from './components/Banner';
import { Main } from './components/Main';

export const Home = (): ReactElement => {
	return (
		<Page documentTitle={'Developer Experience Portal'}>
			<Banner />
			<Main />
			<OnboardingTour />
		</Page>
	);
};
