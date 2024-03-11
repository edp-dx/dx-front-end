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
import React, { FC, useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { EmptyList } from '~/components/EmptyList';
import { Union } from '~/icons/Union';
import { NavigationTabsEnum } from '~/pages/scaffolding/constants';
import { useValidGroup } from '~/pages/scaffolding/hooks/useValidGroup';
import { FORM_NAMES } from '~/pages/scaffolding/names';
import { useHandleNoty } from '~/pages/scaffolding/providers/NotyProvider';
import { routeScaffolding } from '~/pages/scaffolding/route';
import { DataService } from '~/services/data';
import {
	REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AWS,
	REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AZURE,
	REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_GCP,
	REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_KUBERNETES,
} from '~/services/data/envConfigurations/requestKeys';
import { REQUEST_KEY_GET_ENV_MANAGEMENT_LIST } from '~/services/data/envManagement/requestKeys';
import { EnvMappingPayload } from '~/services/data/envMapping/model';
import {
	REQUEST_KEY_CREATE_ENV_MAPPING,
	REQUEST_KEY_GET_ENV_MAPPING_LIST,
	REQUEST_KEY_UPDATE_ENV_MAPPING,
} from '~/services/data/envMapping/requestKeys';
import { FormSelect } from '~/shared-components/FormSelect';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';
import { FormValues } from '~/types/common';

import { AWSAccountFormField } from '../AWSAccountFormField';
import { AzureAccountFormField } from '../AzureAccountFormField';
import { GCPAccountFormField } from '../GCPAccountFormField';
import { KubernetesClusterFormField } from '../KubernetesClusterFormField';
import { EnvMappingModalFormProps } from './types';

export const EnvMappingModalForm: FC<EnvMappingModalFormProps> = (props) => {
	const { data: currentData, open, onClose } = props;
	const handleNoty = useHandleNoty();
	const theme = useTheme();
	const queryClient = useQueryClient();

	const {
		LOBSelection,
		setAWSEnvConfigurations,
		setGCPEnvConfigurations,
		setAzureEnvConfigurations,
		setKubernetesEnvConfigurations,
		setNavigationTab,
	} = useCreateConfigurationScaffoldingStore();

	const methods = useForm();
	const {
		watch,
		control,
		register,
		reset,
		formState: { errors, isValid, isDirty },
		handleSubmit,
	} = methods;

	const { data: envMappingData } = useQuery(REQUEST_KEY_GET_ENV_MAPPING_LIST, () =>
		DataService.getEnvMappingList(LOBSelection.uuid),
	);

	const { data: envManagementFetchedData } = useQuery(REQUEST_KEY_GET_ENV_MANAGEMENT_LIST, () =>
		DataService.getEnvManagementList(LOBSelection.uuid),
	);

	const envManagementData = useMemo(
		() =>
			envManagementFetchedData?.filter((managementItem) =>
				envMappingData?.every(
					(mappingItem) =>
						managementItem.uuid !== mappingItem.env.uuid ||
						mappingItem.env.uuid === currentData?.env?.uuid,
				),
			),
		[envManagementFetchedData, envMappingData, currentData?.env?.uuid],
	);

	const { data: awsData } = useQuery(
		REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AWS,
		() => DataService.getEnvConfigurationAWSList(LOBSelection.uuid),
		{
			onSuccess: (data) => {
				setAWSEnvConfigurations(data);
			},
		},
	);

	const { data: gcpData } = useQuery(
		REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_GCP,
		() => DataService.getEnvConfigurationGCPList(LOBSelection.uuid),
		{
			onSuccess: (data) => {
				setGCPEnvConfigurations(data);
			},
		},
	);

	const { data: azureData } = useQuery(
		REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AZURE,
		() => DataService.getEnvConfigurationAzureList(LOBSelection.uuid),
		{
			onSuccess: (data) => {
				setAzureEnvConfigurations(data);
			},
		},
	);

	const { data: kubernetesData } = useQuery(
		REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_KUBERNETES,
		() => DataService.getEnvConfigurationKubernetesList(LOBSelection.uuid),
		{
			onSuccess: (data) => {
				setKubernetesEnvConfigurations(data);
			},
		},
	);

	const hasConfigurationData = useMemo(
		() => awsData?.length || gcpData?.length || azureData?.length || kubernetesData?.length,
		[awsData, azureData, gcpData, kubernetesData],
	);

	const mutationCreate = useMutation({
		mutationKey: REQUEST_KEY_CREATE_ENV_MAPPING,
		mutationFn: (payload: EnvMappingPayload) =>
			DataService.createEnvMapping(payload, LOBSelection.uuid),
		onSuccess: async (data) => {
			onClose();
			reset();
			queryClient.setQueryData(REQUEST_KEY_CREATE_ENV_MAPPING, data);
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_MAPPING_LIST],
			});
		},
	});

	const mutationUpdate = useMutation({
		mutationKey: REQUEST_KEY_UPDATE_ENV_MAPPING,
		mutationFn: (payload: EnvMappingPayload) =>
			DataService.updateEnvMapping(payload, LOBSelection.uuid),
		onSuccess: async (data) => {
			onClose();
			reset();
			queryClient.setQueryData(REQUEST_KEY_UPDATE_ENV_MAPPING, data);
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_MAPPING_LIST],
			});
		},
		onError: (error: any) => {
			handleNoty({ severity: 'error', variant: 'filled', children: error.response.error });
		},
	});

	const envValue = watch(FORM_NAMES.Mapping.env);
	const envCurrentData = useMemo(
		() => envManagementData?.find((item) => item.uuid === envValue),
		[envValue, envManagementData],
	);
	const isValidGroup = useValidGroup(
		[
			FORM_NAMES.Mapping.awsEnv,
			FORM_NAMES.Mapping.azureEnv,
			FORM_NAMES.Mapping.gcpEnv,
			FORM_NAMES.Mapping.kubernetesEnv,
		],
		watch,
	);

	const onSubmit = useCallback(
		(data: FormValues<typeof FORM_NAMES.Mapping>) => {
			const uuid = uuidv4();

			if (currentData?.uuid) {
				mutationUpdate.mutate({
					uuid: currentData?.uuid,
					...data,
				});
			} else {
				mutationCreate.mutate({
					uuid,
					...data,
				});
			}
		},
		[currentData?.uuid, mutationCreate, mutationUpdate],
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
					<Typography variant={'h4'}>
						{currentData ? 'Edit Mapped Item' : 'Add New Mapped Item'}
					</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Stack>
			</DialogTitle>
			<Box px={4}>
				<Divider />
			</Box>
			<DialogContent
				sx={{ px: theme.typography.pxToRem(32), pb: theme.typography.pxToRem(8) }}
			>
				<FormProvider {...methods}>
					<form
						id='hook-form'
						onSubmit={handleSubmit(onSubmit)}
						style={{ width: '100%' }}
					>
						<Stack spacing={7}>
							<Box>
								<Stack paddingBottom={5} paddingLeft={1}>
									<Typography variant='subtitle2'>Environment</Typography>
								</Stack>
								{envManagementData?.length ? (
									<Stack spacing={4}>
										<FormSelect
											label={'Environment Name'}
											defaultValue={currentData?.env?.uuid || ''}
											errors={errors}
											control={control}
											size='small'
											options={
												envManagementData
													? envManagementData.map((el) => ({
															label: el.name,
															value: el.uuid,
													  }))
													: []
											}
											{...register(FORM_NAMES.Mapping.env, {
												required: 'Environment Name',
											})}
										/>
										{envCurrentData && (
											<Stack spacing={4} paddingLeft={3}>
												<Stack spacing={1}>
													<Typography
														fontSize={12}
														color={theme.palette.text.secondary}
													>
														Environment Description
													</Typography>
													<Typography fontSize={16}>
														{envCurrentData.description}
													</Typography>
												</Stack>
												<Stack spacing={1}>
													<Typography
														fontSize={12}
														color={theme.palette.text.secondary}
													>
														Environment Classification
													</Typography>
													<Typography fontSize={16}>
														{envCurrentData.classification}
													</Typography>
												</Stack>
											</Stack>
										)}
									</Stack>
								) : (
									<EmptyList
										handleModalOpen={() =>
											setNavigationTab(NavigationTabsEnum.EnvManagement)
										}
										title='There are no Environments here.'
										link={routeScaffolding.to}
										linkText='Click to Add New Environment'
										description='(You’ll be redirected to the Environment Creation Form on Environment Management Page)'
									/>
								)}
							</Box>
							<Stack direction={'row'} spacing={5} alignItems={'center'}>
								<Divider sx={{ flexGrow: 1 }} />
								<Box
									display={'flex'}
									alignItems={'center'}
									sx={{
										transform: { rotate: '-45deg' },
									}}
								>
									<Union
										sx={{
											width: theme.typography.pxToRem(20),
											height: theme.typography.pxToRem(20),
										}}
									/>
								</Box>

								<Divider sx={{ flexGrow: 1 }} />
							</Stack>
							<Box>
								<Box paddingBottom={5} paddingLeft={1}>
									<Typography variant='subtitle2'>
										Environment Components
									</Typography>
								</Box>
								{hasConfigurationData ? (
									<Stack spacing={4}>
										<AWSAccountFormField
											onClose={onClose}
											currentData={currentData}
											awsData={awsData}
										/>
										<GCPAccountFormField
											onClose={onClose}
											currentData={currentData}
											gcpData={gcpData}
										/>
										<AzureAccountFormField
											onClose={onClose}
											currentData={currentData}
											azureData={azureData}
										/>
										<KubernetesClusterFormField
											onClose={onClose}
											currentData={currentData}
											kubernetesData={kubernetesData}
										/>
									</Stack>
								) : (
									<EmptyList
										handleModalOpen={() =>
											setNavigationTab(NavigationTabsEnum.EnvConfiguration)
										}
										title='There are no added Components here.'
										link={routeScaffolding.to}
										linkText='Click to Add New Component'
										description='(You’ll be redirected to the Component Adding Form on Environment Configuration Page)'
									/>
								)}
							</Box>
						</Stack>
					</form>
				</FormProvider>
			</DialogContent>
			<DialogActions
				sx={{
					justifyContent: 'right',
					mb: theme.typography.pxToRem(12),
					px: theme.typography.pxToRem(32),
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
						form='hook-form'
						type='submit'
						disabled={
							!isValid ||
							!isValidGroup ||
							!isDirty ||
							!envManagementData?.length ||
							mutationCreate.isLoading
						}
						size={'medium'}
						variant={'contained'}
					>
						{currentData?.uuid ? 'Save' : 'Add'}
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
};
