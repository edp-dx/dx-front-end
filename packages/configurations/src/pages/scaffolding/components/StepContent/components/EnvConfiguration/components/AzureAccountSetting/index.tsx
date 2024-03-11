import { Box, CircularProgress, Divider, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AZURE } from '~/services/data/envConfigurations/requestKeys';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

import { AzureEnvConfigurationItem } from '../AzureEnvConfigurationItem';

export const AzureAccountSettings = () => {
	const theme = useTheme();
	const {
		AzureEnvConfigurations,
		AzureEnvConfigurationsTemplate,
		setAzureEnvConfigurations,
		LOBSelection,
	} = useCreateConfigurationScaffoldingStore();
	const hasData = Boolean(AzureEnvConfigurations.length || AzureEnvConfigurationsTemplate.length);

	const { isLoading } = useQuery(
		REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AZURE,
		() => DataService.getEnvConfigurationAzureList(LOBSelection.uuid),
		{
			onSuccess: (data) => {
				setAzureEnvConfigurations(data);
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
						AzureEnvConfigurations.map((item) => {
							return <AzureEnvConfigurationItem key={item.uuid} item={item} />;
						})
					)}
					{AzureEnvConfigurationsTemplate.map((item) => {
						return <AzureEnvConfigurationItem key={item.uuid} item={item} />;
					})}
				</Stack>
			</Box>
			{hasData && <Divider sx={{ ml: theme.typography.pxToRem(16) }} />}
		</>
	);
};
