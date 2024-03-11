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
import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { classificationsOptions } from '~/pages/scaffolding/constants';
import { FORM_NAMES } from '~/pages/scaffolding/names';
import { DataService } from '~/services/data';
import { EnvManagementPayload } from '~/services/data/envManagement/model';
import {
	REQUEST_KEY_CREATE_ENV_MANAGEMENT,
	REQUEST_KEY_GET_ENV_MANAGEMENT_LIST,
} from '~/services/data/envManagement/requestKeys';
import { FormSelect } from '~/shared-components/FormSelect';
import { FormTextField } from '~/shared-components/FormTextField';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';
import { FormValues } from '~/types/common';

import { CreateEnvManagementProps } from './types';

export const CreateEnvManagement: FC<CreateEnvManagementProps> = (props) => {
	const { open, onClose } = props;

	const { LOBSelection } = useCreateConfigurationScaffoldingStore();
	const theme = useTheme();
	const queryClient = useQueryClient();

	const {
		watch,
		control,
		register,
		reset,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({ mode: 'onChange' });

	const { data: envManagementData } = useQuery(REQUEST_KEY_GET_ENV_MANAGEMENT_LIST, () =>
		DataService.getEnvManagementList(LOBSelection.uuid),
	);

	const mutation = useMutation({
		mutationKey: REQUEST_KEY_CREATE_ENV_MANAGEMENT,
		mutationFn: (payload: EnvManagementPayload) =>
			DataService.createEnvManagement(payload, LOBSelection.uuid),
		onSuccess: async (data) => {
			onClose();
			reset();
			queryClient.setQueryData(REQUEST_KEY_CREATE_ENV_MANAGEMENT, data);
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_MANAGEMENT_LIST],
			});
		},
	});

	const descriptionFieldValue = watch(FORM_NAMES.ENV.description);

	const onSubmit = useCallback(
		(data: FormValues<typeof FORM_NAMES.ENV>) => {
			const uuid = uuidv4();
			mutation.mutate({ uuid, ...data });
		},
		[mutation],
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
					<Typography variant={'h4'}>Add New Environment</Typography>
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
						<Typography variant='caption' sx={{ color: theme.palette.text.secondary }}>
							LOB name
						</Typography>
						<Typography>{LOBSelection.name}</Typography>
					</Stack>

					<Stack spacing={4}>
						<FormTextField
							label={'Environment Name'}
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
												(item) => item.name === value,
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
							disabled={!isValid || mutation.isLoading}
							size={'medium'}
							variant={'contained'}
						>
							Add
						</Button>
					</Stack>
				</DialogActions>
			</form>
		</Dialog>
	);
};
