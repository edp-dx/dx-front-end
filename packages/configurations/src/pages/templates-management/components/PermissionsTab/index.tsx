import { Stack } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TabPanel } from '~/components/TabPanel';
import { FormTextField } from '~/shared-components/FormTextField';
import { useTemplatesManagementStore } from '~/store/TemplatesManagement';

import { TemplatesManagementTabs } from '../../constants';
import { FORM_NAMES } from '../../names';

export const PermissionTab = () => {
	const { templatesManagementTab } = useTemplatesManagementStore();
	const { permissionsTab } = TemplatesManagementTabs;
	const { owners } = FORM_NAMES.TemplatesManagement[permissionsTab];

	const {
		control,
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<TabPanel value={templatesManagementTab} index={permissionsTab}>
			<Stack spacing={8} pt={4} px={4}>
				<FormTextField
					label={'Owners'}
					errors={errors}
					control={control}
					placeholder='Add Owners email here...'
					TextFieldProps={{
						size: 'small',
					}}
					{...register(owners, {
						required: 'Enter Owners',
						validate: (value) => {
							const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
							const result: string[] = value.replace(/\s/g, '').split(/,|;/);

							return result.every((item) => regex.test(item)) || 'Unavailable email';
						},
					})}
				/>
			</Stack>
		</TabPanel>
	);
};
