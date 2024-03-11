import { Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { NavigationTabsEnum } from '~/pages/scaffolding/constants';
import { FORM_NAMES } from '~/pages/scaffolding/names';
import { FormSelect } from '~/shared-components/FormSelect';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

import { AzureAccountFormFieldProps } from './types';

export const AzureAccountFormField: FC<AzureAccountFormFieldProps> = (props) => {
	const { currentData, azureData, onClose } = props;

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
			label={'Azure Account'}
			defaultValue={currentData?.azureEnv?.uuid || ''}
			errors={errors}
			control={control}
			size='small'
			reset
			placeholder={
				!azureData?.length
					? 'There are no available items for selection...'
					: 'Select one from the list below...'
			}
			disabled={!azureData?.length && !currentData?.azureEnv?.uuid}
			disabledMessage={
				<Typography
					pl={4}
					variant='caption'
					display={'flex'}
					color={theme.palette.text.secondary}
				>
					To add a new Azure Account, first go to{' '}
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
			options={azureData?.map((el) => ({
				label: el.accountLabel,
				value: el.uuid,
			}))}
			{...register(FORM_NAMES.Mapping.azureEnv)}
		/>
	);
};
