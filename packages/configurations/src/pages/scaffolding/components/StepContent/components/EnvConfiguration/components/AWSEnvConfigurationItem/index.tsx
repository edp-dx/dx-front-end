import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React, { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { v4 } from 'uuid';
import { DeleteModal } from '~/components/DeleteModal';
import { FormAccordion } from '~/pages/scaffolding/components/FormAccordion';
import { useEnvMapping } from '~/pages/scaffolding/hooks/useEnvMapping';
import { FORM_NAMES } from '~/pages/scaffolding/names';
import { DataService } from '~/services/data';
import { AWSEnvConfiguration } from '~/services/data/envConfigurations/model';
import {
	REQUEST_KEY_CREATE_ENV_CONFIGURATION_AWS,
	REQUEST_KEY_DELETE_ENV_CONFIGURATION_AWS,
	REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AWS,
	REQUEST_KEY_UPDATE_ENV_CONFIGURATION_AWS,
} from '~/services/data/envConfigurations/requestKeys';
import { FormTextField } from '~/shared-components/FormTextField';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';
import { FormValues } from '~/types/common';

import { AWSEnvConfigurationItemProps } from './types';

export const AWSEnvConfigurationItem: FC<AWSEnvConfigurationItemProps> = ({ item }) => {
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

	const { LOBSelection, AWSEnvConfigurations, setAWSEnvConfigurationsTemplate } =
		useCreateConfigurationScaffoldingStore();

	const {
		watch,
		control,
		register,
		reset,
		formState: { errors, isValid, isDirty },
		handleSubmit,
	} = useForm<FormValues<typeof FORM_NAMES.AWS>>();

	const [updateMapping, deleteMapping, envMappingItem] = useEnvMapping({
		item,
		fieldName: 'awsEnv',
	});

	const mutationCreate = useMutation({
		mutationKey: REQUEST_KEY_CREATE_ENV_CONFIGURATION_AWS,
		mutationFn: (payload: AWSEnvConfiguration) =>
			DataService.createEnvConfigurationAWS(payload, LOBSelection.uuid),
		onSuccess: async (data: AWSEnvConfiguration) => {
			setAWSEnvConfigurationsTemplate([]);
			reset(data);
			const newAWSEnvConfigurations = AWSEnvConfigurations.filter(
				(awsItem) => data.uuid !== awsItem.uuid,
			);
			queryClient.setQueryData(REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AWS, [
				...newAWSEnvConfigurations,
				data,
			]);
		},
	});

	const mutationUpdate = useMutation({
		mutationKey: REQUEST_KEY_UPDATE_ENV_CONFIGURATION_AWS,
		mutationFn: (payload: AWSEnvConfiguration) =>
			DataService.updateEnvConfigurationAWS(payload, LOBSelection.uuid),
		onSuccess: async (data: AWSEnvConfiguration) => {
			reset({
				...data,
				label: data.label.replace(`${data.accountID}-`, ''),
			});
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AWS],
			});

			updateMapping();
		},
	});

	const mutationDelete = useMutation({
		mutationKey: REQUEST_KEY_DELETE_ENV_CONFIGURATION_AWS,
		mutationFn: (payload: string) =>
			DataService.deleteEnvConfigurationAWS(payload, item.lob.uuid),
		onSuccess: async () => {
			handleAccordionClose();
			handleModalClose();
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AWS],
			});

			deleteMapping();
		},
	});

	const accountIDValue = watch(FORM_NAMES.AWS.accountID);
	const accountLabelValue = watch(FORM_NAMES.AWS.label);
	const isLoading =
		mutationCreate.isLoading || mutationUpdate.isLoading || mutationDelete.isLoading;

	const onSubmit = useCallback(
		(data: FormValues<typeof FORM_NAMES.AWS>) => {
			const { label, accountID } = data;
			handleAccordionClose();
			if (item.active) {
				mutationCreate.mutate({
					uuid: v4(),
					...data,
					label: `${accountID}-${label}`,
				});
			} else {
				mutationUpdate.mutate({
					uuid: item.uuid,
					...data,
					label: `${accountID}-${label}`,
				});
			}
		},
		[handleAccordionClose, item.active, item.uuid, mutationCreate, mutationUpdate],
	);

	const onDelete = () => {
		if (item.active) {
			setAWSEnvConfigurationsTemplate([]);
		} else {
			mutationDelete.mutate(item.uuid);
		}
	};

	return (
		<Box width={'100%'}>
			<FormAccordion
				name={item.label ? `${item.label}` : 'New AWS Account'}
				expanded={expanded}
				disabled={isLoading}
				handleChange={setExpanded}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={6}>
						<Stack>
							<FormTextField
								label={'Account ID'}
								defaultValue={item.accountID}
								errors={errors}
								control={control}
								TextFieldProps={{ size: 'small' }}
								{...register(FORM_NAMES.AWS.accountID, {
									required: 'Account ID',
								})}
							/>
						</Stack>
						<Stack>
							<FormTextField
								label={'Access Key ID'}
								defaultValue={item.accessKeyID}
								errors={errors}
								control={control}
								TextFieldProps={{ size: 'small' }}
								{...register(FORM_NAMES.AWS.accessKeyID, {
									required: 'Access Key ID',
								})}
							/>
						</Stack>
						<Stack>
							<FormTextField
								label={'Access Secret Key'}
								defaultValue={item.accessSecretKey}
								errors={errors}
								control={control}
								TextFieldProps={{ size: 'small' }}
								{...register(FORM_NAMES.AWS.accessSecretKey, {
									required: 'Access Secret Key',
								})}
							/>
						</Stack>
						<Stack>
							<FormTextField
								label={'AWS Account Label'}
								defaultValue={item.label.replace(`${item.accountID}-`, '')}
								errors={errors}
								control={control}
								InputProps={{
									startAdornment: accountIDValue ? (
										<Stack direction={'row'}>
											<Typography sx={{ color: theme.palette.text.disabled }}>
												{accountIDValue}
											</Typography>
											-
										</Stack>
									) : (
										!!accountLabelValue && (
											<Typography sx={{ color: theme.palette.text.disabled }}>
												{'[AccountID]'}
											</Typography>
										)
									),
								}}
								TextFieldProps={{
									size: 'small',
								}}
								{...register(FORM_NAMES.AWS.label, {
									required: 'AWS Account Label',
								})}
							/>
						</Stack>

						<Stack direction={'row'} justifyContent={'space-between'}>
							<DeleteModal
								name={`${item.label || 'New'} AWS Account`}
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
