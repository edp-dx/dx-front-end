import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { DeleteModal } from '~/components/DeleteModal';
import { FormAccordion } from '~/pages/scaffolding/components/FormAccordion';
import { useEnvMapping } from '~/pages/scaffolding/hooks/useEnvMapping';
import { FORM_NAMES } from '~/pages/scaffolding/names';
import { DataService } from '~/services/data';
import { KubernetesEnvConfiguration } from '~/services/data/envConfigurations/model';
import {
	REQUEST_KEY_CREATE_ENV_CONFIGURATION_KUBERNETES,
	REQUEST_KEY_DELETE_ENV_CONFIGURATION_KUBERNETES,
	REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_KUBERNETES,
	REQUEST_KEY_UPDATE_ENV_CONFIGURATION_KUBERNETES,
} from '~/services/data/envConfigurations/requestKeys';
import { FormTextField } from '~/shared-components/FormTextField';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';
import { FormValues } from '~/types/common';
import { getDomainName } from '~/utils/getDomainName';

import { KubernetesEnvConfigurationItemProps } from './types';

export const KubernetesEnvConfigurationItem: FC<KubernetesEnvConfigurationItemProps> = ({
	item,
}) => {
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

	const { LOBSelection, KubernetesEnvConfigurations, setKubernetesEnvConfigurationsTemplate } =
		useCreateConfigurationScaffoldingStore();

	const {
		watch,
		control,
		register,
		reset,
		formState: { errors, isValid, isDirty },
		handleSubmit,
	} = useForm();

	const [updateMapping, deleteMapping, envMappingItem] = useEnvMapping({
		item,
		fieldName: 'kubernetesEnv',
	});

	const mutationCreate = useMutation({
		mutationKey: REQUEST_KEY_CREATE_ENV_CONFIGURATION_KUBERNETES,
		mutationFn: (payload: KubernetesEnvConfiguration) =>
			DataService.createEnvConfigurationKubernetes(payload, LOBSelection.uuid),
		onSuccess: async (data: KubernetesEnvConfiguration) => {
			setKubernetesEnvConfigurationsTemplate([]);
			reset(data);
			const newKubernetesEnvConfigurations = KubernetesEnvConfigurations.filter(
				(awsItem) => data.uuid !== awsItem.uuid,
			);
			queryClient.setQueryData(REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_KUBERNETES, [
				...newKubernetesEnvConfigurations,
				data,
			]);
		},
	});

	const mutationUpdate = useMutation({
		mutationKey: REQUEST_KEY_UPDATE_ENV_CONFIGURATION_KUBERNETES,
		mutationFn: (payload: KubernetesEnvConfiguration) =>
			DataService.updateEnvConfigurationKubernetes(payload, LOBSelection.uuid),
		onSuccess: async (data: KubernetesEnvConfiguration) => {
			reset({
				...data,
				clusterName: data.clusterName.replace(`${getDomainName(data.clusterHost)}-`, ''),
			});
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_KUBERNETES],
			});

			updateMapping();
		},
	});

	const mutationDelete = useMutation({
		mutationKey: REQUEST_KEY_DELETE_ENV_CONFIGURATION_KUBERNETES,
		mutationFn: (payload: string) =>
			DataService.deleteEnvConfigurationKubernetes(payload, item.lob.uuid),
		onSuccess: async () => {
			handleAccordionClose();
			handleModalClose();
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_KUBERNETES],
			});

			deleteMapping();
		},
	});

	const clusterHostValue = watch(FORM_NAMES.Kubernetes.clusterHost);
	const domainName = useMemo(() => getDomainName(clusterHostValue), [clusterHostValue]);
	const clusterNameValue = watch(FORM_NAMES.Kubernetes.clusterName);
	const isLoading =
		mutationCreate.isLoading || mutationUpdate.isLoading || mutationDelete.isLoading;

	const onSubmit = useCallback(
		(data: FormValues<typeof FORM_NAMES.Kubernetes>) => {
			const { clusterHost, clusterName } = data;
			const domainName = getDomainName(clusterHost);
			handleAccordionClose();
			if (item.active) {
				mutationCreate.mutate({
					uuid: item.uuid,
					...data,
					clusterName: `${domainName}-${clusterName}`,
				});
			} else {
				mutationUpdate.mutate({
					uuid: item.uuid,
					...data,
					clusterName: `${domainName}-${clusterName}`,
				});
			}
		},
		[handleAccordionClose, item.active, item.uuid, mutationCreate, mutationUpdate],
	);

	const onDelete = () => {
		if (item.active) {
			setKubernetesEnvConfigurationsTemplate([]);
		} else {
			mutationDelete.mutate(item.uuid);
		}
	};

	return (
		<Box width={'100%'}>
			<FormAccordion
				name={item.clusterName ? item.clusterName : 'New Kubernetes Account'}
				expanded={expanded}
				disabled={isLoading}
				handleChange={setExpanded}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={6}>
						<Stack>
							<FormTextField
								label={'Cluster Host'}
								defaultValue={item.clusterHost}
								errors={errors}
								control={control}
								TextFieldProps={{ size: 'small' }}
								{...register(FORM_NAMES.Kubernetes.clusterHost, {
									required: 'Cluster Host',
								})}
							/>
						</Stack>
						<Stack>
							<FormTextField
								label={'Cluster Certificate'}
								defaultValue={item.clusterCert}
								errors={errors}
								control={control}
								TextFieldProps={{ size: 'small' }}
								{...register(FORM_NAMES.Kubernetes.clusterCert, {
									required: 'Cluster Certificate',
								})}
							/>
						</Stack>
						<Stack>
							<FormTextField
								label={'Cluster Token'}
								defaultValue={item.clusterToken}
								errors={errors}
								control={control}
								TextFieldProps={{ size: 'small' }}
								{...register(FORM_NAMES.Kubernetes.clusterToken, {
									required: 'Cluster Token',
								})}
							/>
						</Stack>
						<Stack>
							<FormTextField
								label={'Kubernetes Namespace'}
								defaultValue={item.namespace}
								errors={errors}
								control={control}
								TextFieldProps={{ size: 'small' }}
								{...register(FORM_NAMES.Kubernetes.namespace, {
									required: 'Kubernetes Namespace',
								})}
							/>
						</Stack>
						<Stack>
							<FormTextField
								label={'Cluster Label'}
								defaultValue={item.clusterName.replace(
									`${getDomainName(item.clusterHost)}-`,
									'',
								)}
								errors={errors}
								control={control}
								InputProps={{
									startAdornment: domainName ? (
										<Stack direction={'row'}>
											<Typography sx={{ color: theme.palette.text.disabled }}>
												{`[${domainName}]`}
											</Typography>
											-
										</Stack>
									) : (
										!!clusterNameValue && (
											<Typography sx={{ color: theme.palette.text.disabled }}>
												{'[cluster-host]'}
											</Typography>
										)
									),
								}}
								TextFieldProps={{
									size: 'small',
								}}
								{...register(FORM_NAMES.Kubernetes.clusterName, {
									required: 'Cluster Label',
								})}
							/>
						</Stack>

						<Stack direction={'row'} justifyContent={'space-between'}>
							<DeleteModal
								name={`${item.clusterName || 'New'} Kubernetes Account`}
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
