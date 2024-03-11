import { CircularProgress } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_TERRAFORM } from '~/services/data/CDEnvConfiguration/requestKeys';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

import { CDEnvConfigurationForm } from './components/CDEnvConfigurationForm';

export const CDEnvConfiguration = () => {
	const { LOBSelection } = useCreateConfigurationScaffoldingStore();

	const { data: currentData, isLoading } = useQuery(
		REQUEST_KEY_GET_TERRAFORM,
		() => DataService.getTerraform(LOBSelection.uuid),
		{
			retry: false,
			cacheTime: 0,
			staleTime: Infinity,
			refetchOnWindowFocus: false,
		},
	);

	return isLoading ? <CircularProgress /> : <CDEnvConfigurationForm currentData={currentData} />;
};
