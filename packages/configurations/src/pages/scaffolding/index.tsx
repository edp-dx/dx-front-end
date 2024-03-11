import HomeIcon from '@mui/icons-material/Home';
import LayersIcon from '@mui/icons-material/Layers';
import { useTheme } from '@mui/material';
import React from 'react';
import { LinkConfigurations } from '~/icons/LinkConfiguration';
import { PageContent } from '~/shared-components/PageContent';
import { PageContentHead } from '~/shared-components/PageContentHead';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

import { Navigation } from './components/Navigation';
import { StepContent } from './components/StepContent';
import { useSteps } from './hooks/useSteps';
import { ModalProvider } from './providers/ModalProvider';
import { NotyProvider } from './providers/NotyProvider';
import { routeScaffolding } from './route';
import {
	StyledContainer,
	StyledScaffolding,
	StyledScaffoldingContent,
	StyledScaffoldingNav,
} from './styled';

export const Scaffolding: React.FC = () => {
	const theme = useTheme();
	const { LOBSelection, navigationTab, setNavigationTab } =
		useCreateConfigurationScaffoldingStore();
	const steps = useSteps(LOBSelection.name);

	const defaultBreadcrumbs = [
		{
			icon: (
				<HomeIcon
					sx={{
						width: theme.typography.pxToRem(16),
						height: theme.typography.pxToRem(16),
					}}
				/>
			),
			route: '/',
			exact: true,
		},
		{
			icon: (
				<LinkConfigurations
					sx={{
						width: theme.typography.pxToRem(16),
						height: theme.typography.pxToRem(16),
					}}
				/>
			),
			label: 'Configurations',
			disabled: true,
		},
		{
			route: !LOBSelection.name ? routeScaffolding.to : '',
			icon: (
				<LayersIcon
					sx={{
						width: theme.typography.pxToRem(16),
						height: theme.typography.pxToRem(16),
					}}
				/>
			),
			label: 'Scaffolding Configuration Management',
			exact: true,
		},
	];

	const customBreadcrumbs = [
		...defaultBreadcrumbs,
		{
			route: routeScaffolding.to,
			label: `LOB - ${LOBSelection.name}`,
			exact: true,
		},
	];

	return (
		<NotyProvider>
			<ModalProvider>
				<PageContentHead
					breadcrumbs={LOBSelection.name ? customBreadcrumbs : defaultBreadcrumbs}
				/>
				<PageContent>
					<StyledContainer maxWidth='lg'>
						<StyledScaffolding>
							<StyledScaffoldingNav>
								<Navigation tab={navigationTab} setTab={setNavigationTab} />
							</StyledScaffoldingNav>
							<StyledScaffoldingContent>
								{steps.map((step, idx) => {
									const key = `tabpanel::${step.id}`;

									return (
										<StepContent
											key={key}
											activeStepIndex={navigationTab}
											index={idx}
											step={step}
										/>
									);
								})}
							</StyledScaffoldingContent>
						</StyledScaffolding>
					</StyledContainer>
				</PageContent>
			</ModalProvider>
		</NotyProvider>
	);
};
