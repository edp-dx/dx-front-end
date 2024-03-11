import CloseIcon from '@mui/icons-material/Close';
import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Stack,
	Tabs,
	Typography,
	useTheme,
} from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { useQuery } from 'react-query';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_DISCOVERED_TECHNOLOGIES } from '~/services/data/applications/requestKeys';

import { SharedTabPanel } from '../../../../../../shared-components/TabPanel';
import { useTabs } from './hooks/useTabs';
import { StyledDialog, StyledTab } from './styles';
import { OnboardingApplicationDetailsProps } from './types';

export const OnboardingApplicationDetails: FC<OnboardingApplicationDetailsProps> = ({
	open,
	onClose,
	data,
}): ReactElement => {
	const theme = useTheme();
	const { data: discoveredTechnology } = useQuery(
		[REQUEST_KEY_GET_DISCOVERED_TECHNOLOGIES, data],
		() => DataService.getDiscoveredTechnologies(data?.application?.name),
		{
			staleTime: Infinity,
		},
	);

	const [activeTabIdx, setActiveTabIdx] = React.useState(0);

	const handleChangeActiveTabIdx = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTabIdx(newValue);
	};

	const tabs = useTabs(data, discoveredTechnology);

	if (!data) {
		return <></>;
	}

	return (
		<>
			<StyledDialog open={open} onClose={onClose} maxWidth={'lgDefault'} fullWidth>
				<DialogTitle>
					<Stack
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
						spacing={4}
					>
						<Typography variant={'h4'}>Application Details</Typography>
						<IconButton onClick={onClose}>
							<CloseIcon />
						</IconButton>
					</Stack>
				</DialogTitle>
				<Divider sx={{}} />
				<DialogContent>
					<Tabs
						value={activeTabIdx}
						onChange={handleChangeActiveTabIdx}
						sx={{ borderColor: 'divider', minHeight: 'initial' }}
					>
						{tabs.map(({ label, key }) => (
							<StyledTab label={label} key={key} />
						))}
					</Tabs>
					<Box sx={{ pt: theme.typography.pxToRem(24) }}>
						{tabs.map(({ key, component }, idx) => (
							<SharedTabPanel index={idx} value={activeTabIdx} key={key}>
								{component}
							</SharedTabPanel>
						))}
					</Box>
				</DialogContent>
				<DialogActions sx={{ justifyContent: 'center', mb: theme.typography.pxToRem(8) }}>
					<Button
						size={'large'}
						variant={'contained'}
						onClick={onClose}
						sx={{ minWidth: theme.typography.pxToRem(160) }}
					>
						OK
					</Button>
				</DialogActions>
			</StyledDialog>
		</>
	);
};
