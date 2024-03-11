import CloseIcon from '@mui/icons-material/Close';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { classificationsOptions } from '~/pages/scaffolding/constants';
import { FORM_NAMES } from '~/pages/scaffolding/names';
import { DataService } from '~/services/data';
import { EnvManagement, EnvManagementPayload } from '~/services/data/envManagement/model';
import {
	REQUEST_KEY_GET_ENV_MANAGEMENT_LIST,
	REQUEST_KEY_UPDATE_ENV_MANAGEMENT,
} from '~/services/data/envManagement/requestKeys';
import { EnvMappingPayload } from '~/services/data/envMapping/model';
import {
	REQUEST_KEY_GET_ENV_MAPPING_LIST,
	REQUEST_KEY_UPDATE_ENV_MAPPING,
} from '~/services/data/envMapping/requestKeys';
import { FormSelect } from '~/shared-components/FormSelect';
import { FormTextField } from '~/shared-components/FormTextField';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';
import { FormValues } from '~/types/common';

import { UpdateEnvManagementProps } from './types';

export const UpdateEnvManagement: React.FC<UpdateEnvManagementProps> = (props) => {
	const { data: currentData, open, onClose } = props;
	const { LOBSelection } = useCreateConfigurationScaffoldingStore();
	const theme = useTheme();
	const queryClient = useQueryClient();

	const { data: envMappingData } = useQuery(REQUEST_KEY_GET_ENV_MAPPING_LIST, () =>
		DataService.getEnvMappingList(LOBSelection.uuid),
	);

	const { data: envManagementData } = useQuery(REQUEST_KEY_GET_ENV_MANAGEMENT_LIST, () =>
		DataService.getEnvManagementList(LOBSelection.uuid),
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

	const mutationUpdate = useMutation({
		mutationKey: REQUEST_KEY_UPDATE_ENV_MANAGEMENT,
		mutationFn: (payload: EnvManagementPayload) =>
			DataService.updateEnvManagement(payload, LOBSelection.uuid),
		onSuccess: async (data: EnvManagement) => {
			queryClient.setQueryData(REQUEST_KEY_UPDATE_ENV_MANAGEMENT, data);
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_MANAGEMENT_LIST],
			});

			const envMappingItem = envMappingData.find((item) => item.env.uuid === data.uuid);
			if (envMappingItem) {
				mutationUpdateMapping.mutate({
					uuid: envMappingItem.uuid,
					env: data.uuid,
					awsEnv: envMappingItem?.awsEnv?.uuid || '',
					azureEnv: envMappingItem?.azureEnv?.uuid || '',
					gcpEnv: envMappingItem?.gcpEnv?.uuid || '',
					kubernetesEnv: envMappingItem?.kubernetesEnv?.uuid || '',
				});
			}

			onClose();
		},
	});

	const {
		watch,
		control,
		register,
		formState: { errors, isValid, isDirty },
		handleSubmit,
	} = useForm({ mode: 'onChange' });

	const descriptionFieldValue = watch(FORM_NAMES.ENV.description);

	const onSubmit = useCallback(
		(data: FormValues<typeof FORM_NAMES.ENV>) => {
			mutationUpdate.mutate({
				uuid: currentData.uuid,
				...data,
			});
		},
		[currentData.uuid, mutationUpdate],
	);

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth={'sm'}>
			<DialogTitle>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					spacing={4}
				>
					<Typography variant={'h4'}>Edit Environment</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Stack>
			</DialogTitle>
			<Box px={4}>
				<Divider />
			</Box>
			<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
				<DialogContent sx={{ px: theme.typography.pxToRem(24) }}>
					<Stack paddingBottom={5} paddingLeft={1}>
						<Typography fontSize={12} style={{ opacity: 0.6 }}>
							LOB name
						</Typography>
						<Typography>{LOBSelection.name}</Typography>
					</Stack>

					<Stack spacing={4}>
						<FormTextField
							label={'Environment Name'}
							defaultValue={currentData.name}
							errors={errors}
							control={control}
							{...register(FORM_NAMES.ENV.name, {
								required: 'Environment Name',
								maxLength: {
									value: 20,
									message: 'Environment Name must be less than 20 characters',
								},
								validate: (value) => {
									return (
										(envManagementData &&
											!envManagementData?.some(
												(item) =>
													item.name === value &&
													value !== currentData.name,
											)) ||
										`Environment Name ${value} already exists`
									);
								},
							})}
						/>
						<FormTextField
							label={'Description'}
							errors={errors}
							control={control}
							defaultValue={currentData.description}
							TextFieldProps={{
								multiline: true,
								rows: 4,
								helperText: `${
									descriptionFieldValue ? descriptionFieldValue.length : 0
								}/100`,
							}}
							{...register(FORM_NAMES.ENV.description, {
								validate: (value) => value.length <= 100,
							})}
						/>
						<FormSelect
							label={'Classification'}
							errors={errors}
							control={control}
							defaultValue={currentData.classification}
							options={classificationsOptions.map((el) => ({
								label: el,
								value: el,
							}))}
							{...register(FORM_NAMES.ENV.classification, {
								required: 'Classification',
							})}
						/>
					</Stack>
				</DialogContent>
				<DialogActions
					sx={{
						justifyContent: 'right',
						mb: theme.typography.pxToRem(16),
						px: theme.typography.pxToRem(24),
						pt: theme.typography.pxToRem(4),
					}}
				>
					<Stack direction={'row'} spacing={2}>
						<Button
							size={'medium'}
							style={{ color: theme.palette.action.disabled }}
							variant={'text'}
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							disabled={!isValid || !isDirty || mutationUpdate.isLoading}
							size={'medium'}
							variant={'contained'}
						>
							Save
						</Button>
					</Stack>
				</DialogActions>
			</form>
		</Dialog>
	);
};
