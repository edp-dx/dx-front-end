import { Box, CircularProgress, Divider, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AWS } from '~/services/data/envConfigurations/requestKeys';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

import { AWSEnvConfigurationItem } from '../AWSEnvConfigurationItem';

export const AWSAccountSettings = () => {
	const theme = useTheme();
	const {
		AWSEnvConfigurations,
		AWSEnvConfigurationsTemplate,
		setAWSEnvConfigurations,
		LOBSelection,
	} = useCreateConfigurationScaffoldingStore();
	const hasData = Boolean(AWSEnvConfigurations.length || AWSEnvConfigurationsTemplate.length);

	const { isLoading } = useQuery(
		REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AWS,
		() => DataService.getEnvConfigurationAWSList(LOBSelection.uuid),
		{
			onSuccess: (data) => {
				setAWSEnvConfigurations(data);
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
						AWSEnvConfigurations?.map((item) => {
							return <AWSEnvConfigurationItem key={item.uuid} item={item} />;
						})
					)}
					{AWSEnvConfigurationsTemplate.map((item) => {
						return <AWSEnvConfigurationItem key={item.uuid} item={item} />;
					})}
				</Stack>
			</Box>
			{hasData && <Divider sx={{ ml: theme.typography.pxToRem(16) }} />}
		</>
	);
};
