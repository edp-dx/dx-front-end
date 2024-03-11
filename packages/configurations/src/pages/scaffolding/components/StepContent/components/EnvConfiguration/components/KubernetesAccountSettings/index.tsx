import { Box, CircularProgress, Divider, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_KUBERNETES } from '~/services/data/envConfigurations/requestKeys';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

import { KubernetesEnvConfigurationItem } from '../KubernetesEnvConfigurationItem';

export const KubernetesAccountSettings = () => {
	const theme = useTheme();
	const {
		KubernetesEnvConfigurations,
		KubernetesEnvConfigurationsTemplate,
		setKubernetesEnvConfigurations,
		LOBSelection,
	} = useCreateConfigurationScaffoldingStore();
	const hasData = Boolean(
		KubernetesEnvConfigurations.length || KubernetesEnvConfigurationsTemplate.length,
	);

	const { isLoading } = useQuery(
		REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_KUBERNETES,
		() => DataService.getEnvConfigurationKubernetesList(LOBSelection.uuid),
		{
			onSuccess: (data) => {
				setKubernetesEnvConfigurations(data);
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
						KubernetesEnvConfigurations.map((item) => {
							return <KubernetesEnvConfigurationItem key={item.uuid} item={item} />;
						})
					)}
					{KubernetesEnvConfigurationsTemplate.map((item) => {
						return <KubernetesEnvConfigurationItem key={item.uuid} item={item} />;
					})}
				</Stack>
			</Box>
			{hasData && <Divider sx={{ ml: theme.typography.pxToRem(16) }} />}
		</>
	);
};
