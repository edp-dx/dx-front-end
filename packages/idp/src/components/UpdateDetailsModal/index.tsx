import CloseIcon from '@mui/icons-material/Close';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FORM_NAMES } from '~/pages/application-creation-wizard/names';
import { DataService } from '~/services/data';
import { UpdateApplicationPayload } from '~/services/data/applications/model';
import {
	REQUEST_KEY_GET_APPLICATIONS,
	REQUEST_KEY_UPDATE_APPLICATION_RESPONSE,
} from '~/services/data/applications/requestKeys';
import { REQUEST_KEY_GET_BUSINESS_UNIT_NAMES } from '~/services/data/business-unit-names/requestKeys';
import { FormSelect } from '~/shared-components/FormSelect';
import { FormTextField } from '~/shared-components/FormTextField';
import { FormValues } from '~/types/common';

import { StyledButton } from './styles';
import { UpdateDetailsModalProps } from './types';

export const UpdateDetailsModal: FC<UpdateDetailsModalProps> = (props) => {
	const { data: currentData, open, onClose } = props;
	const queryClient = useQueryClient();
	const { application } = currentData;
	const theme = useTheme();

	const { data: businessUnitNames } = useQuery(
		REQUEST_KEY_GET_BUSINESS_UNIT_NAMES,
		() => DataService.getBusinessUnitNames(),
		{
			staleTime: Infinity,
		},
	);

	const mutation = useMutation({
		mutationKey: 'updateApplication',
		mutationFn: (payload: UpdateApplicationPayload) => DataService.updateApplication(payload),
		onSuccess: async (data) => {
			queryClient.setQueryData(REQUEST_KEY_UPDATE_APPLICATION_RESPONSE, data);
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_APPLICATIONS],
			});
			onClose();
		},
	});

	const formMethods = useForm<FormValues<typeof FORM_NAMES>>({
		mode: 'onChange',
		defaultValues: {
			name: application.name,
			description: application.description,
			document: application.document,
			enterpriseOneID: application.enterpriseID,
			businessUnitName: application.details.businessUnitName,
			owner: application.details.owner,
		},
	});

	const {
		control,
		watch,
		register,
		formState: { isValid, isDirty, errors },
		handleSubmit,
	} = formMethods;

	const appDescriptionFieldValue = watch(FORM_NAMES.description);
	const nameRequirementLabel =
		'Application name must be not less than two characters long. It must contain only lowercase letters, numbers, and dashes. It cannot start or end with a dash, cannot have whitespaces and cannot have more than one dash between sub-strings';

	const onSubmit = (data: FormValues<typeof FORM_NAMES>) => {
		mutation.mutate({
			name: data.name,
			description: data.description,
			document: data.document,
		});
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth={'sm'}>
			<DialogTitle>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					spacing={4}
				>
					<Typography variant={'h4'}>Edit Application Details</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Stack>
			</DialogTitle>
			<DialogContent
				sx={{
					px: theme.typography.pxToRem(16),
					pb: 3,
					minHeight: theme.typography.pxToRem(470),
				}}
			>
				<form onSubmit={handleSubmit(onSubmit)} id='create-form' style={{ width: '100%' }}>
					<Stack spacing={4} pt={4} px={4}>
						<FormTextField
							label={'App Name'}
							errors={errors}
							control={control}
							disabled={true}
							TextFieldProps={{
								size: 'small',
							}}
							{...register(FORM_NAMES.name, {
								required: 'Enter The Application Name',
								pattern: {
									value: /^[a-z](?!.*--[^-])[a-z0-9-]*[a-z0-9]$/,
									message: nameRequirementLabel,
								},
							})}
						/>
						<FormTextField
							label={'App Description'}
							errors={errors}
							control={control}
							TextFieldProps={{
								rows: 3,
								multiline: true,
								helperText: `${
									appDescriptionFieldValue ? appDescriptionFieldValue.length : 0
								}/100`,
							}}
							{...register(FORM_NAMES.description, {
								validate: (value) => value.length <= 100,
							})}
						/>
						<FormTextField
							label={'App Documentation Link'}
							errors={errors}
							control={control}
							TextFieldProps={{
								size: 'small',
							}}
							{...register(FORM_NAMES.document, {
								required: 'Enter Documentation Link',
								pattern: {
									value: /^(ftp|http|https):\/\/[^ "]+$/,
									message: 'Unavailable URL',
								},
							})}
						/>
						<FormTextField
							label={'Enterprise Unique ID'}
							errors={errors}
							disabled
							control={control}
							TextFieldProps={{
								size: 'small',
							}}
							{...register(FORM_NAMES.enterpriseOneID, {
								required: 'Enter Enterprise Unique ID',
							})}
						/>
						<FormSelect
							label={'Business Unit Name'}
							errors={errors}
							disabled
							control={control}
							size='small'
							options={
								businessUnitNames
									? businessUnitNames.map((el) => ({
											label: el,
											value: el,
									  }))
									: []
							}
							{...register(FORM_NAMES.businessUnitName, {
								required: 'Select Business Unit Name',
							})}
						/>
						<FormTextField
							// eslint-disable-next-line quotes
							label={`Owner' Email`}
							errors={errors}
							control={control}
							disabled
							TextFieldProps={{
								size: 'small',
							}}
							{...register(FORM_NAMES.owner, {
								// eslint-disable-next-line quotes
								required: `Enter Owner' Email`,
								pattern: {
									value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
									message: 'Enter valid email',
								},
							})}
						/>
					</Stack>
				</form>
			</DialogContent>
			<DialogActions
				sx={{
					justifyContent: 'center',
					mb: theme.typography.pxToRem(16),
					px: theme.typography.pxToRem(24),
					pb: 0,
				}}
			>
				<Stack direction={'row'} spacing={2}>
					<StyledButton
						form='create-form'
						size={'large'}
						type={'submit'}
						variant={'contained'}
						disabled={!isValid || !isDirty}
					>
						Save
					</StyledButton>
				</Stack>
			</DialogActions>
		</Dialog>
	);
};
