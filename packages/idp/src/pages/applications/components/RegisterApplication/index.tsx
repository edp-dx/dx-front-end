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
import React, { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_APPLICATIONS } from '~/services/data/applications/requestKeys';
import { REQUEST_KEY_GET_BUSINESS_UNIT_NAMES } from '~/services/data/business-unit-names/requestKeys';
import { CreateWorkflowPayload } from '~/services/data/workflows/model';
import { REQUEST_KEY_CREATE_WORKFLOW_RESPONSE } from '~/services/data/workflows/requestKeys';
import { FormSelect } from '~/shared-components/FormSelect';
import { FormTextField } from '~/shared-components/FormTextField';
import { FormValues } from '~/types/common';

import { WorkflowCreationStatus } from '../../types';
import { SHORT_TIMEOUT } from '../../utils';
import {
	EMAIL_VALIDATION_REGEX,
	FORM_KEYS,
	FORM_LABELS,
	NAME_VALIDATION_REGEX,
	SPECIFICATION_LENGTH,
	URL_VALIDATION_REGEX,
	VALIDATION_MESSAGES,
} from './constants';
import { StyledButton, StyledRegisterButton } from './styles';
import { RegisterApplicationProps } from './types';

export const RegisterApplicationsModal: FC<RegisterApplicationProps> = ({
	onClose,
	applicationNames = [],
	gitRepoUrls = [],
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const queryClient = useQueryClient();
	const theme = useTheme();

	const {
		control,
		watch,
		register,
		formState: { isValid, isDirty, errors },
		handleSubmit,
		reset,
	} = useForm<FormValues<CreateWorkflowPayload>>({
		mode: 'onChange',
	});

	const handleRegisterApplicationClick = useCallback(() => {
		setIsOpen(true);
	}, []);

	const handleDialogClose = useCallback(
		(workflowCreationStatus: WorkflowCreationStatus = WorkflowCreationStatus.Incomplete) => {
			reset();
			setIsOpen(false);
			onClose?.(workflowCreationStatus);
		},
		[onClose, reset],
	);

	const { data: businessUnitNames } = useQuery(
		REQUEST_KEY_GET_BUSINESS_UNIT_NAMES,
		() => DataService.getBusinessUnitNames(),
		{
			staleTime: Infinity,
		},
	);

	const mutation = useMutation({
		mutationKey: 'createWorkflow',
		mutationFn: (payload: CreateWorkflowPayload) => DataService.createWorkflow(payload),
		onSuccess: async (data) => {
			queryClient.setQueryData(REQUEST_KEY_CREATE_WORKFLOW_RESPONSE, data);
			setTimeout(async () => {
				await queryClient.invalidateQueries({
					queryKey: [REQUEST_KEY_GET_APPLICATIONS],
				});
				handleDialogClose(WorkflowCreationStatus.Complete);
			}, SHORT_TIMEOUT);
		},
	});

	const specificationFieldValue = watch(FORM_KEYS.SPECIFICATION);

	const onSubmit = (data: FormValues<CreateWorkflowPayload>) => {
		mutation.mutate(data);
	};

	return (
		<>
			<StyledRegisterButton
				sx={{ zIndex: 1 }}
				variant='outlined'
				onClick={handleRegisterApplicationClick}
			>
				Register application
			</StyledRegisterButton>
			<Dialog open={isOpen} onClose={handleDialogClose} fullWidth maxWidth={'sm'}>
				<DialogTitle>
					<Stack
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
						spacing={4}
					>
						<Typography variant={'h4'}>Register New Application</Typography>
						<IconButton onClick={() => handleDialogClose()}>
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
					<form
						onSubmit={handleSubmit(onSubmit)}
						id='create-form'
						style={{ width: '100%' }}
					>
						<Stack spacing={4} pt={4} px={4}>
							<FormTextField
								label={FORM_LABELS.NAME}
								errors={errors}
								control={control}
								TextFieldProps={{
									size: 'small',
								}}
								{...register(FORM_KEYS.NAME, {
									required: VALIDATION_MESSAGES.NAME.REQUIRED,
									pattern: {
										value: NAME_VALIDATION_REGEX,
										message: VALIDATION_MESSAGES.NAME.PATTERN,
									},
									validate: (value) => {
										return (
											(applicationNames &&
												!applicationNames?.some(
													(item) => item === value.toLowerCase(),
												)) ||
											`Application name ${value} already exists`
										);
									},
								})}
							/>
							<FormTextField
								label={FORM_LABELS.ENTERPRISE_ID}
								errors={errors}
								control={control}
								TextFieldProps={{
									size: 'small',
								}}
								{...register(FORM_KEYS.ENTERPRISE_ID, {
									required: VALIDATION_MESSAGES.ENTERPRISE_ID.REQUIRED,
								})}
							/>
							<FormSelect
								label={FORM_LABELS.BUSINESS_UNIT_NAME}
								errors={errors}
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
								{...register(FORM_KEYS.BUSINESS_UNIT_NAME, {
									required: VALIDATION_MESSAGES.BUSINESS_UNIT_NAME.REQUIRED,
								})}
							/>
							<FormTextField
								label={FORM_LABELS.GIT_REPO_URL}
								errors={errors}
								control={control}
								TextFieldProps={{
									size: 'small',
								}}
								{...register(FORM_KEYS.GIT_REPO_URL, {
									required: VALIDATION_MESSAGES.REPO_URL.REQUIRED,
									pattern: {
										value: URL_VALIDATION_REGEX,
										message: VALIDATION_MESSAGES.REPO_URL.PATTERN,
									},
									validate: (value) => {
										return (
											(gitRepoUrls &&
												!gitRepoUrls?.some(
													(item) => item === value.toLowerCase(),
												)) ||
											`Codebase with git url ${value} already exists`
										);
									},
								})}
							/>
							<FormTextField
								label={FORM_LABELS.SPECIFICATION}
								errors={errors}
								control={control}
								TextFieldProps={{
									rows: 3,
									multiline: true,
									helperText: `${
										specificationFieldValue ? specificationFieldValue.length : 0
									}/${SPECIFICATION_LENGTH}`,
								}}
								{...register(FORM_KEYS.SPECIFICATION, {
									validate: (value) => value.length <= SPECIFICATION_LENGTH,
								})}
							/>
							<FormTextField
								label={FORM_LABELS.CONFLUENCE_URL}
								errors={errors}
								control={control}
								TextFieldProps={{
									size: 'small',
								}}
								{...register(FORM_KEYS.CONFLUENCE_URL, {
									required: VALIDATION_MESSAGES.REPO_URL.REQUIRED,
									pattern: {
										value: URL_VALIDATION_REGEX,
										message: VALIDATION_MESSAGES.REPO_URL.PATTERN,
									},
								})}
							/>
							<FormTextField
								label={FORM_LABELS.OWNER}
								errors={errors}
								control={control}
								TextFieldProps={{
									size: 'small',
								}}
								{...register(FORM_KEYS.OWNER, {
									required: VALIDATION_MESSAGES.OWNER.REQUIRED,
									pattern: {
										value: EMAIL_VALIDATION_REGEX,
										message: VALIDATION_MESSAGES.OWNER.PATTERN,
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
							Onboard
						</StyledButton>
					</Stack>
				</DialogActions>
			</Dialog>
		</>
	);
};
