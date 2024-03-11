import { useCallback, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DataService } from '~/services/data';
import {
	AWSEnvConfiguration,
	AzureEnvConfiguration,
	GCPEnvConfiguration,
	KubernetesEnvConfiguration,
} from '~/services/data/envConfigurations/model';
import { EnvMapping, EnvMappingPayload } from '~/services/data/envMapping/model';
import {
	REQUEST_KEY_DELETE_ENV_MAPPING,
	REQUEST_KEY_GET_ENV_MAPPING_LIST,
	REQUEST_KEY_UPDATE_ENV_MAPPING,
} from '~/services/data/envMapping/requestKeys';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

interface UseEnvMappingProps {
	item:
		| AWSEnvConfiguration
		| GCPEnvConfiguration
		| AzureEnvConfiguration
		| KubernetesEnvConfiguration;
	fieldName: string;
}

export const useEnvMapping = ({
	item,
	fieldName,
}: UseEnvMappingProps): [() => void, () => void, EnvMapping] => {
	const queryClient = useQueryClient();
	const { LOBSelection } = useCreateConfigurationScaffoldingStore();
	const { data: envMappingData } = useQuery(REQUEST_KEY_GET_ENV_MAPPING_LIST, () =>
		DataService.getEnvMappingList(LOBSelection.uuid),
	);

	const envMappingItem = useMemo(
		() =>
			envMappingData?.find((itemMapping: any) => itemMapping[fieldName]?.uuid === item.uuid),
		[envMappingData, fieldName, item.uuid],
	);

	const isListFilled = useMemo(
		() => Object.keys(envMappingItem || {}).filter((item) => item !== fieldName).length > 3,
		[envMappingItem, fieldName],
	);
	const mutationUpdateMapping = useMutation({
		mutationKey: REQUEST_KEY_UPDATE_ENV_MAPPING,
		mutationFn: (payload: EnvMappingPayload) =>
			DataService.updateEnvMapping(payload, LOBSelection.uuid),
		onSuccess: async (data) => {
			queryClient.setQueryData(REQUEST_KEY_UPDATE_ENV_MAPPING, data);
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_MAPPING_LIST],
			});
		},
	});

	const mutationDeleteMapping = useMutation({
		mutationKey: REQUEST_KEY_DELETE_ENV_MAPPING,
		mutationFn: (payload: string) => DataService.deleteEnvMapping(payload, item.lob.uuid),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_MAPPING_LIST],
			});
		},
	});

	const updateMapping = useCallback(() => {
		if (envMappingItem) {
			mutationUpdateMapping.mutate({
				uuid: envMappingItem.uuid,
				env: envMappingItem.env.uuid,
				awsEnv: envMappingItem?.awsEnv?.uuid || '',
				azureEnv: envMappingItem?.azureEnv?.uuid || '',
				gcpEnv: envMappingItem?.gcpEnv?.uuid || '',
				kubernetesEnv: envMappingItem?.kubernetesEnv?.uuid || '',
				[fieldName]: item?.uuid,
			});
		}
	}, [envMappingItem, fieldName, item?.uuid, mutationUpdateMapping]);

	const deleteMapping = useCallback(() => {
		if (envMappingItem && isListFilled) {
			mutationUpdateMapping.mutate({
				uuid: envMappingItem.uuid,
				env: envMappingItem.env.uuid,
				awsEnv: envMappingItem?.awsEnv?.uuid || '',
				azureEnv: envMappingItem?.azureEnv?.uuid || '',
				gcpEnv: envMappingItem?.gcpEnv?.uuid || '',
				kubernetesEnv: envMappingItem?.kubernetesEnv?.uuid || '',
				[fieldName]: '',
			});
		} else {
			mutationDeleteMapping.mutate(envMappingItem.uuid);
		}
	}, [envMappingItem, fieldName, isListFilled, mutationDeleteMapping, mutationUpdateMapping]);

	return [updateMapping, deleteMapping, envMappingItem];
};
