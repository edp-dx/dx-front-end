import { Stack } from '@mui/material';
import Tab from '@mui/material/Tab';
import React, { useCallback } from 'react';

import { ApplicationsTabPanel } from './components/ApplicationsTabPanel';
import { StyledTabs } from './styles';
import { ApplicationsTabsProps } from './types';

export const ApplicationsTabs = ({
	tabs,
	onTabChange,
	currentValue,
	controls = <></>,
}: ApplicationsTabsProps) => {
	const handleChange = useCallback(
		(event: React.SyntheticEvent, newValue: number) => {
			onTabChange(newValue);
		},
		[onTabChange],
	);

	return (
		<div>
			<Stack sx={{ padding: '0 1rem' }} direction='row' justifyContent='space-between'>
				<Stack direction='row'>
					<StyledTabs value={currentValue} onChange={handleChange}>
						{tabs.map(({ label, value }) => (
							<Tab label={label.toUpperCase()} key={`applications-tab-${value}`} />
						))}
					</StyledTabs>
				</Stack>
				{controls}
			</Stack>
			{tabs.map(({ value, content }) => (
				<ApplicationsTabPanel
					value={currentValue}
					index={value}
					key={`applications-tab-content-${value}`}
				>
					{content}
				</ApplicationsTabPanel>
			))}
		</div>
	);
};
