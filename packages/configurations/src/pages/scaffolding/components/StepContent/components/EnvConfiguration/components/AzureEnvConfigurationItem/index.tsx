import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Stack, Tooltip, useTheme } from '@mui/material';
import React, { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { DeleteModal } from '~/components/DeleteModal';
import { FormAccordion } from '~/pages/scaffolding/components/FormAccordion';
import { useEnvMapping } from '~/pages/scaffolding/hooks/useEnvMapping';
import { FORM_NAMES } from '~/pages/scaffolding/names';
import { DataService } from '~/services/data';
import {
	AzureEnvConfiguration,
	AzureEnvConfigurationPayload,
} from '~/services/data/envConfigurations/model';
import {
	REQUEST_KEY_CREATE_ENV_CONFIGURATION_AZURE,
	REQUEST_KEY_DELETE_ENV_CONFIGURATION_AZURE,
	REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AZURE,
	REQUEST_KEY_UPDATE_ENV_CONFIGURATION_AZURE,
} from '~/services/data/envConfigurations/requestKeys';
import { FormTextField } from '~/shared-components/FormTextField';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';
import { FormValues } from '~/types/common';

import { AzureEnvConfigurationItemProps } from './types';

export const AzureEnvConfigurationItem: FC<AzureEnvConfigurationItemProps> = ({ item }) => {
	const queryClient = useQueryClient();
	const theme = useTheme();
	const [expanded, setExpanded] = useState(!!item?.active);

	const handleAccordionClose = useCallback(() => {
		setExpanded(false);
	}, []);

	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const handleModalOpen = useCallback(() => {
		setModalVisible(true);
	}, []);

	const handleModalClose = useCallback(() => {
		setModalVisible(false);
	}, []);

	const { LOBSelection, AzureEnvConfigurations, setAzureEnvConfigurationsTemplate } =
		useCreateConfigurationScaffoldingStore();

	const {
		control,
		register,
		reset,
		formState: { errors, isValid, isDirty },
		handleSubmit,
	} = useForm();

	const [updateMapping, deleteMapping, envMappingItem] = useEnvMapping({
		item,
		fieldName: 'azureEnv',
	});

	const mutationCreate = useMutation({
		mutationKey: REQUEST_KEY_CREATE_ENV_CONFIGURATION_AZURE,
		mutationFn: (payload: AzureEnvConfigurationPayload) =>
			DataService.createEnvConfigurationAzure(payload, LOBSelection.uuid),
		onSuccess: async (data: AzureEnvConfiguration) => {
			handleAccordionClose();
			setAzureEnvConfigurationsTemplate([]);
			reset(data);
			queryClient.setQueryData(REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AZURE, [
				...AzureEnvConfigurations,
				data,
			]);
		},
	});

	const mutationUpdate = useMutation({
		mutationKey: REQUEST_KEY_UPDATE_ENV_CONFIGURATION_AZURE,
		mutationFn: (payload: AzureEnvConfigurationPayload) =>
			DataService.updateEnvConfigurationAzure(payload, LOBSelection.uuid),
		onSuccess: async (data) => {
			handleAccordionClose();
			reset(data);
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AZURE],
			});

			updateMapping();
		},
	});

	const mutationDelete = useMutation({
		mutationKey: REQUEST_KEY_DELETE_ENV_CONFIGURATION_AZURE,
		mutationFn: (payload: string) =>
			DataService.deleteEnvConfigurationAzure(payload, item.lob.uuid),
		onSuccess: async () => {
			handleAccordionClose();
			handleModalClose();
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AZURE],
			});

			deleteMapping();
		},
	});

	const isLoading =
		mutationCreate.isLoading || mutationUpdate.isLoading || mutationDelete.isLoading;
	const formAccordionName = item.accountLabel;

	const onSubmit = useCallback(
		(data: FormValues<typeof FORM_NAMES.Azure>) => {
			if (item.active) {
				mutationCreate.mutate({
					uuid: item.uuid,
					...data,
				});
			} else {
				mutationUpdate.mutate({
					uuid: item.uuid,
					...data,
				});
			}
		},
		[item.active, item.uuid, mutationCreate, mutationUpdate],
	);

	const onDelete = () => {
		if (item.active) {
			setAzureEnvConfigurationsTemplate([]);
		} else {
			mutationDelete.mutate(item.uuid);
		}
	};

	return (
		<Box width={'100%'}>
			<FormAccordion
				name={item.accountLabel ? formAccordionName : 'New Azure Account'}
				expanded={expanded}
				disabled={isLoading}
				handleChange={setExpanded}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={6}>
						<Stack>
							<FormTextField
								label={'Tenant ID'}
								defaultValue={item.tenantID}
								errors={errors}
								control={control}
								TextFieldProps={{ size: 'small' }}
								{...register(FORM_NAMES.Azure.tenantID, {
									required: 'Tenant ID',
								})}
							/>
						</Stack>
						<Stack>
							<FormTextField
								label={'Subscription ID'}
								defaultValue={item.subscriptionID}
								errors={errors}
								control={control}
								TextFieldProps={{ size: 'small' }}
								{...register(FORM_NAMES.Azure.subscriptionID, {
									required: 'Subscription ID',
								})}
							/>
						</Stack>
						<Stack>
							<FormTextField
								label={'Azure Account Label'}
								defaultValue={item.accountLabel}
								errors={errors}
								control={control}
								TextFieldProps={{ size: 'small' }}
								{...register(FORM_NAMES.Azure.accountLabel, {
									required: 'Azure Account Label',
								})}
							/>
						</Stack>
						<Stack direction={'row'} justifyContent={'space-between'}>
							<DeleteModal
								name={`${formAccordionName || 'New'} Azure Account`}
								text={`from the current configuration${
									envMappingItem ? ' and from the Environment Mapping' : ''
								}`}
								open={modalVisible}
								handleConfirm={onDelete}
								onClose={handleModalClose}
							/>
							<Tooltip title='Remove' arrow placement='top'>
								<IconButton
									sx={{
										color:
											!isValid || !isDirty
												? theme.palette.action.disabled
												: theme.palette.action.active,
										':hover': { color: theme.palette.primary.main },
									}}
									onClick={handleModalOpen}
								>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
							<Button
								type='submit'
								variant='contained'
								disabled={!isValid || !isDirty || isLoading}
							>
								Save
							</Button>
						</Stack>
					</Stack>
				</form>
			</FormAccordion>
		</Box>
	);
};
