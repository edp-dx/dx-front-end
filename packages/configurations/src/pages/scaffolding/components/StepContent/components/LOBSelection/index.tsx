import { Button, CircularProgress, SelectChangeEvent, Stack } from '@mui/material';
import React, { useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLOBs } from '~/pages/scaffolding/hooks/useLOBs';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_TERRAFORM } from '~/services/data/CDEnvConfiguration/requestKeys';
import { LOB, LOBPayload } from '~/services/data/LOB/model';
import { REQUEST_KEY_CREATE_LOB, REQUEST_KEY_GET_LOB_LIST } from '~/services/data/LOB/requestKeys';
import {
	REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AWS,
	REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AZURE,
	REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_GCP,
	REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_KUBERNETES,
} from '~/services/data/envConfigurations/requestKeys';
import { REQUEST_KEY_GET_ENV_MANAGEMENT_LIST } from '~/services/data/envManagement/requestKeys';
import { REQUEST_KEY_GET_ENV_MAPPING_LIST } from '~/services/data/envMapping/requestKeys';
import { FormSelect } from '~/shared-components/FormSelect';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';
import { FormValues } from '~/types/common';

import { FORM_NAMES } from '../../../../names';
import { StyledLOBContainer } from './styled';

export const LOBSelection = () => {
	const data = useLOBs();
	const queryClient = useQueryClient();
	const isCreatedLOB = useRef<boolean>(false);
	const { LOBSelection, setLOBSelection } = useCreateConfigurationScaffoldingStore();

	const { isLoading, data: lobList } = useQuery(REQUEST_KEY_GET_LOB_LIST, () =>
		DataService.getLOBList(),
	);

	const mutation = useMutation({
		mutationKey: REQUEST_KEY_CREATE_LOB,
		mutationFn: (payload: LOBPayload) => DataService.createLOB(payload),
		onSuccess: async (data: LOB) => {
			queryClient.setQueryData(REQUEST_KEY_CREATE_LOB, data);
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_LOB_LIST],
			});
			isCreatedLOB.current = true;
			setLOBSelection(data);
		},
	});

	const {
		control,
		register,
		formState: { errors, isValid, isDirty },
		handleSubmit,
	} = useForm();

	const handleChangeSelect = (event: SelectChangeEvent) => {
		const LOBNameValue = event.target.value;
		isCreatedLOB.current = lobList?.some((lob) => lob.name === LOBNameValue);
		if (isCreatedLOB.current) {
			const selectedLOB = lobList.filter((lob) => lob.name === LOBNameValue)[0];
			queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_MANAGEMENT_LIST],
			});
			queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AWS],
			});
			queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_GCP],
			});
			queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_AZURE],
			});
			queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_CONFIGURATION_LIST_KUBERNETES],
			});
			queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_ENV_MAPPING_LIST],
			});
			queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_TERRAFORM],
			});
			setLOBSelection(selectedLOB);
		} else {
			setLOBSelection({ name: '', uuid: '' });
		}
	};

	const onSubmit = useCallback(
		({ name }: FormValues<typeof FORM_NAMES.LOB>) => {
			const selectedLOB = data.filter((lob: LOB) => lob.name === name)[0];
			mutation.mutate(selectedLOB);
		},
		[data, mutation],
	);

	return (
		<StyledLOBContainer>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={4} alignItems={'flex-start'}>
					<Stack spacing={2} direction={'row'} width={'100%'} alignItems={'center'}>
						<FormSelect
							label={'LOB Name'}
							defaultValue={LOBSelection.name}
							errors={errors}
							control={control}
							placeholder='Select from the list below...'
							size='small'
							options={
								data
									? data.map((el: LOB) => ({
											label: el.name,
											value: el.name,
									  }))
									: []
							}
							{...register(FORM_NAMES.LOB.name, {
								required: 'LOB Name',
								onChange: handleChangeSelect,
							})}
						/>
						{isLoading && <CircularProgress size={25} />}
					</Stack>

					<Button
						type='submit'
						size={'medium'}
						variant={'contained'}
						disabled={!isValid || !isDirty || isCreatedLOB.current || isLoading}
					>
						Save
					</Button>
				</Stack>
			</form>
		</StyledLOBContainer>
	);
};
