import { Tab, Tabs, Typography, useTheme } from '@mui/material';
import React, { useCallback } from 'react';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

import { useSteps } from '../../hooks/useSteps';
import { NavigationProps } from './types';

const a11yProps = (index: number) => ({
	id: `tab-${index}`,
	'aria-controls': `tabpanel-${index}`,
});

export const Navigation: React.FC<NavigationProps> = (props) => {
	const { tab, setTab } = props;
	const theme = useTheme();

	const { LOBSelection } = useCreateConfigurationScaffoldingStore();
	const steps = useSteps(LOBSelection.name);

	const handleTab = useCallback(
		(_: React.SyntheticEvent, newValue: number) => {
			setTab(newValue);
		},
		[setTab],
	);

	return (
		<>
			<Tabs
				orientation={'vertical'}
				variant={'scrollable'}
				aria-label={'Scaffolding Configuration Management'}
				value={tab}
				onChange={handleTab}
				TabIndicatorProps={{
					style: { display: 'none' },
				}}
			>
				{steps.map(({ id, navLabel }, idx) => {
					const key = `${id}::${idx}`;
					const isDisableTab = idx !== 0 && !LOBSelection.name;

					return (
						<Tab
							key={key}
							disabled={isDisableTab}
							sx={{
								alignItems: 'flex-start',
								paddingLeft: idx
									? theme.typography.pxToRem(28)
									: theme.typography.pxToRem(20),
							}}
							label={
								<Typography
									variant={'body2'}
									style={{ opacity: isDisableTab ? 0.38 : 1 }}
									color={theme.palette.text.primary}
								>
									{navLabel}
								</Typography>
							}
							{...a11yProps(idx)}
						/>
					);
				})}
			</Tabs>
		</>
	);
};
