import { Box, CircularProgress, Divider, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_GCP } from '~/services/data/envConfigurations/requestKeys';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

import { GCPEnvConfigurationItem } from '../GCPEnvConfigurationItem';

export const GCPAccountSettings = () => {
	const theme = useTheme();
	const {
		GCPEnvConfigurations,
		GCPEnvConfigurationsTemplate,
		setGCPEnvConfigurations,
		LOBSelection,
	} = useCreateConfigurationScaffoldingStore();
	const hasData = Boolean(GCPEnvConfigurations.length || GCPEnvConfigurationsTemplate.length);

	const { isLoading } = useQuery(
		REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_GCP,
		() => DataService.getEnvConfigurationGCPList(LOBSelection.uuid),
		{
			onSuccess: (data) => {
				setGCPEnvConfigurations(data);
			},
		},
	);

	return (
		<>
			<Box maxWidth={theme.typography.pxToRem(560)}>
				<Stack spacing={4} alignItems={'center'}>
					{isLoading ? (
						<CircularProgress />
					) : (
						GCPEnvConfigurations.map((item) => {
							return <GCPEnvConfigurationItem key={item.uuid} item={item} />;
						})
					)}
					{GCPEnvConfigurationsTemplate.map((item) => {
						return <GCPEnvConfigurationItem key={item.uuid} item={item} />;
					})}
				</Stack>
			</Box>
			{hasData && <Divider sx={{ ml: theme.typography.pxToRem(16) }} />}
		</>
	);
};
