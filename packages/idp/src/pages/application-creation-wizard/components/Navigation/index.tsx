import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionSummary, Box, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import React from 'react';
import { shallow } from 'zustand/shallow';
import { MagicWand } from '~/icons/MagicWand';
import { useCreateApplicationWizardStore } from '~/store/CreateApplicationWizard';

import { useSteps } from '../../hooks/useSteps';
import {
	StyledAccordion,
	StyledAccordionDetails,
	StyledNavItem,
	StyledNavItemIcon,
} from './styles';

const a11yProps = (index: number) => ({
	id: `tab-${index}`,
	'aria-controls': `tabpanel-${index}`,
});

export const Navigation = () => {
	const steps = useSteps();
	const theme = useTheme();
	const [expandedNavItem, setExpandedNavItem] = React.useState<string | false>('navItem1');
	const handleAccordionChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpandedNavItem(isExpanded ? panel : false);
		};
	const { activeStepIndex, lastCompletedStepIndex } = useCreateApplicationWizardStore(
		(state) => ({
			activeStepIndex: state.activeStepIndex,
			lastCompletedStepIndex: state.lastCompletedStepIndex,
		}),
		shallow,
	);

	return (
		<StyledAccordion
			expanded={expandedNavItem === 'navItem1'}
			onChange={handleAccordionChange('navItem1')}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls='panel1a-content'
				id='panel1a-header'
			>
				<StyledNavItem>
					<StyledNavItemIcon>
						<MagicWand />
					</StyledNavItemIcon>
					<Typography>Create Application</Typography>
				</StyledNavItem>
			</AccordionSummary>
			<StyledAccordionDetails>
				<Tabs
					orientation={'vertical'}
					variant={'scrollable'}
					value={activeStepIndex}
					aria-label={'Application creation wizard navigation'}
					TabIndicatorProps={{
						style: { display: 'none' },
					}}
				>
					{steps.map(({ id, navLabel }, idx) => {
						const key = `${id}::${idx}`;

						return (
							<Tab
								disableRipple
								key={key}
								disabled={true}
								label={
									<Stack direction={'row'} spacing={3} alignItems={'center'}>
										<Box
											sx={{
												width: theme.typography.pxToRem(24),
												height: theme.typography.pxToRem(24),
											}}
										>
											{lastCompletedStepIndex !== null &&
											idx <= lastCompletedStepIndex ? (
												<CheckCircleIcon color={'primary'} />
											) : null}
										</Box>
										<Typography
											variant={'body2'}
											color={theme.palette.text.primary}
										>
											{navLabel}
										</Typography>
									</Stack>
								}
								iconPosition={'start'}
								{...a11yProps(idx)}
							/>
						);
					})}
				</Tabs>
			</StyledAccordionDetails>
		</StyledAccordion>
	);
};
