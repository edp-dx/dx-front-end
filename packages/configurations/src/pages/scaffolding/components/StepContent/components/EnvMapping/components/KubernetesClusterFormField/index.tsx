import { Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { NavigationTabsEnum } from '~/pages/scaffolding/constants';
import { FORM_NAMES } from '~/pages/scaffolding/names';
import { FormSelect } from '~/shared-components/FormSelect';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

import { KubernetesClusterFormFieldProps } from './types';

export const KubernetesClusterFormField: FC<KubernetesClusterFormFieldProps> = (props) => {
	const { currentData, kubernetesData, onClose } = props;

	const theme = useTheme();
	const {
		control,
		register,
		formState: { errors },
	} = useFormContext();

	const { setNavigationTab } = useCreateConfigurationScaffoldingStore();

	const handleNavigation = () => {
		onClose();
		setNavigationTab(NavigationTabsEnum.EnvConfiguration);
	};

	return (
		<FormSelect
			label={'Kubernetes Cluster'}
			defaultValue={currentData?.kubernetesEnv?.uuid || ''}
			errors={errors}
			control={control}
			size='small'
			reset
			placeholder={
				!kubernetesData?.length
					? 'There are no available items for selection...'
					: 'Select one from the list below...'
			}
			disabled={!kubernetesData?.length}
			disabledMessage={
				<Typography
					pl={4}
					variant='caption'
					display={'flex'}
					color={theme.palette.text.secondary}
				>
					To add a new Kubernetes Cluster, first go to{' '}
					<Link
						to={'#'}
						onClick={handleNavigation}
						style={{
							cursor: 'pointer',
							color: theme.palette.primary.main,
						}}
					>
						<Typography px={1} variant='caption'>
							{'Environment Configuration'}
						</Typography>
					</Link>
					Page.
				</Typography>
			}
			options={kubernetesData?.map((el) => ({
				label: el.clusterName,
				value: el.uuid,
			}))}
			{...register(FORM_NAMES.Mapping.kubernetesEnv)}
		/>
	);
};
