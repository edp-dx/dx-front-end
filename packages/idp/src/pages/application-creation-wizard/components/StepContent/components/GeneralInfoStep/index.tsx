import { Button, Stack, useTheme } from '@mui/material';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { shallow } from 'zustand/shallow';
import { FORM_NAMES } from '~/pages/application-creation-wizard/names';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_APPLICATIONS } from '~/services/data/applications/requestKeys';
import { REQUEST_KEY_GET_BUSINESS_UNIT_NAMES } from '~/services/data/business-unit-names/requestKeys';
import { FormSelect } from '~/shared-components/FormSelect';
import { FormTextField } from '~/shared-components/FormTextField';
import { useCreateApplicationWizardStore } from '~/store/CreateApplicationWizard';

export const GeneralInfoStep = () => {
	const { data } = useQuery(REQUEST_KEY_GET_BUSINESS_UNIT_NAMES, () =>
		DataService.getBusinessUnitNames(),
	);

	const { isLoading, data: applicationData } = useQuery(
		REQUEST_KEY_GET_APPLICATIONS,
		() => DataService.getApplications(),
		{
			staleTime: Infinity,
		},
	);

	const theme = useTheme();

	const { activeStepIndex, setActiveStepIndex, setLastCompletedStepIndex } =
		useCreateApplicationWizardStore(
			(state) => ({
				activeStepIndex: state.activeStepIndex,
				setActiveStepIndex: state.setActiveStepIndex,
				setLastCompletedStepIndex: state.setLastCompletedStepIndex,
			}),
			shallow,
		);

	const handleClickPrev = useCallback(() => {
		setActiveStepIndex(activeStepIndex - 1);
	}, [activeStepIndex, setActiveStepIndex]);

	const handleClickNext = useCallback(() => {
		setLastCompletedStepIndex(activeStepIndex);
		setActiveStepIndex(activeStepIndex + 1);
	}, [activeStepIndex, setActiveStepIndex, setLastCompletedStepIndex]);

	const {
		watch,
		control,
		register,
		formState: { errors, isValid },
	} = useFormContext();

	const appDescriptionFieldValue = watch(FORM_NAMES.description);

	const nameRequirementLabel =
		'Application name must be not less than two characters long. It must contain only lowercase letters, numbers, and dashes. It cannot start or end with a dash, cannot have whitespaces and cannot have more than one dash between sub-strings';

	return (
		<>
			<Stack spacing={4}>
				<FormTextField
					label={'App Name'}
					errors={errors}
					disabled={isLoading}
					control={control}
					{...register(FORM_NAMES.name, {
						required: 'Enter The Application Name',
						pattern: {
							value: /^[a-z](?!.*--[^-])[a-z0-9-]*[a-z0-9]$/,
							message: nameRequirementLabel,
						},
						validate: (value) => {
							return (
								(applicationData &&
									!applicationData?.some(
										(item) => item.application.name === value,
									)) ||
								`Application name ${value} already exists`
							);
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
					{...register(FORM_NAMES.document, {
						required: 'Enter Documentation Link',
					})}
				/>
				<FormTextField
					label={'Enterprise Unique ID'}
					errors={errors}
					control={control}
					{...register(FORM_NAMES.enterpriseOneID, {
						required: 'Enter Enterprise Unique ID',
					})}
				/>
				<FormSelect
					label={'Business Unit Name'}
					errors={errors}
					control={control}
					options={
						data
							? data.map((el) => ({
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
			<Stack
				direction={'row'}
				justifyContent={'flex-end'}
				spacing={2}
				sx={{ mt: 'auto', pt: theme.typography.pxToRem(16) }}
			>
				<Button size={'large'} variant={'text'} onClick={handleClickPrev}>
					Back
				</Button>
				<Button
					size={'large'}
					variant={'contained'}
					onClick={handleClickNext}
					disabled={!isValid}
				>
					Next
				</Button>
			</Stack>
		</>
	);
};
