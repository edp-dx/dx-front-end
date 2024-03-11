import { Alert, Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { v4 } from 'uuid';
import { initialCDEnvConfigurationFields as initialFields } from '~/pages/scaffolding/constants';
import { FORM_NAMES } from '~/pages/scaffolding/names';
import { DataService } from '~/services/data';
import { Terraform, TerraformPayload } from '~/services/data/CDEnvConfiguration/model';
import { REQUEST_KEY_CREATE_TERRAFORM } from '~/services/data/CDEnvConfiguration/requestKeys';
import { FormTextField } from '~/shared-components/FormTextField';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';
import { FormValues } from '~/types/common';

import { CDEnvConfigurationFormProps } from './types';

export const CDEnvConfigurationForm: FC<CDEnvConfigurationFormProps> = (props) => {
	const { currentData } = props;
	const theme = useTheme();
	const { LOBSelection } = useCreateConfigurationScaffoldingStore();

	const {
		control,
		register,
		reset,
		formState: { errors, isValid, isDirty },
		handleSubmit,
	} = useForm({ defaultValues: currentData });

	const mutationCreate = useMutation({
		mutationKey: REQUEST_KEY_CREATE_TERRAFORM,
		mutationFn: (payload: TerraformPayload) =>
			DataService.createTerraform(payload, LOBSelection.uuid),
		onSuccess: async (data: Terraform) => {
			reset(data);
		},
	});

	const onSubmit = useCallback(
		(data: FormValues<typeof FORM_NAMES.CDEnvConfiguration>) => {
			mutationCreate.mutate({
				uuid: v4(),
				...data,
			});
		},
		[mutationCreate],
	);

	const onReset = () => {
		reset(initialFields);
	};

	return (
		<>
			{(currentData || mutationCreate.data) && (
				<Alert severity='success' style={{ marginBottom: theme.typography.pxToRem(24) }}>
					{`Your Terraform Parameters for LOB “${LOBSelection.name}” are successfully saved!`}
				</Alert>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{
					paddingTop: theme.typography.pxToRem(6),
				}}
			>
				<Stack
					spacing={theme.typography.pxToRem(10)}
					style={{ width: theme.typography.pxToRem(564) }}
					pl={theme.typography.pxToRem(26)}
				>
					<Typography variant='h6'>Parameters for CI</Typography>
					<Typography variant='body2'>Add Parameters for CI</Typography>
					<Divider />
					<Stack spacing={4} p={4}>
						<FormTextField
							label={'SonarQube URL'}
							errors={errors}
							control={control}
							TextFieldProps={{
								size: 'small',
							}}
							{...register(FORM_NAMES.CDEnvConfiguration.sonarQubeURL, {
								required: 'Enter SonarQube URL',
							})}
						/>
						<FormTextField
							label={'Nexus URL'}
							errors={errors}
							control={control}
							TextFieldProps={{
								size: 'small',
							}}
							{...register(FORM_NAMES.CDEnvConfiguration.nexusURL, {
								required: 'Enter Nexus URL',
							})}
						/>
						<FormTextField
							label={'BlackDuck URL'}
							errors={errors}
							control={control}
							TextFieldProps={{
								size: 'small',
							}}
							{...register(FORM_NAMES.CDEnvConfiguration.blackDuckURL, {
								required: 'Enter BlackDuck URL',
							})}
						/>
					</Stack>
				</Stack>
				<Divider sx={{ my: 6 }} />
				<Stack
					spacing={theme.typography.pxToRem(10)}
					style={{ width: theme.typography.pxToRem(564) }}
					pt={theme.typography.pxToRem(16)}
					pl={theme.typography.pxToRem(26)}
				>
					<Typography variant='h6'>Terraform Parameters for CD</Typography>
					<Typography variant='body2'>Add Terraform Parameters for CD</Typography>
					<Divider />

					<Stack spacing={4} p={4}>
						<FormTextField
							label={'API Token'}
							errors={errors}
							control={control}
							TextFieldProps={{
								size: 'small',
							}}
							{...register(FORM_NAMES.CDEnvConfiguration.apiToken, {
								required: 'Enter API Token',
							})}
						/>
						<FormTextField
							label={'Host URL'}
							errors={errors}
							control={control}
							TextFieldProps={{
								size: 'small',
							}}
							{...register(FORM_NAMES.CDEnvConfiguration.hostURL, {
								required: 'Enter Host URL',
							})}
						/>
						<FormTextField
							label={'Namespace'}
							errors={errors}
							control={control}
							TextFieldProps={{
								size: 'small',
							}}
							{...register(FORM_NAMES.CDEnvConfiguration.namespace, {
								required: 'Enter Namespace',
							})}
						/>
						<Stack direction={'row'} justifyContent={'end'} spacing={2}>
							<Button
								size={'medium'}
								color='inherit'
								style={{ color: theme.palette.action.disabled }}
								variant={'text'}
								onClick={onReset}
							>
								Clear
							</Button>

							<Button
								type='submit'
								disabled={!isValid || !isDirty || mutationCreate.isLoading}
								size={'medium'}
								variant={'contained'}
							>
								Save
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</form>
		</>
	);
};
