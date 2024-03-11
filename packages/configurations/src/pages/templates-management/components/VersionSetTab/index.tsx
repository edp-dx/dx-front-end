import { Stack } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TabPanel } from '~/components/TabPanel';
import { FormTextField } from '~/shared-components/FormTextField';
import { useTemplatesManagementStore } from '~/store/TemplatesManagement';

import { TemplatesManagementTabs } from '../../constants';
import { FORM_NAMES } from '../../names';

export const VersionSetTab = () => {
	const { templatesManagementTab } = useTemplatesManagementStore();
	const { versionSetTab } = TemplatesManagementTabs;
	const {
		ia_c_version,
		runtime_config_release_note_url,
		technology_release_note_url,
		template_version,
		workflow_version,
	} = FORM_NAMES.TemplatesManagement[versionSetTab];

	const {
		control,
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<TabPanel value={templatesManagementTab} index={versionSetTab}>
			<Stack spacing={8} pt={4} px={4}>
				<FormTextField
					placeholder='Put version number here...'
					label={'Template Version'}
					errors={errors}
					control={control}
					TextFieldProps={{
						size: 'small',
					}}
					{...register(template_version, {
						required: 'Enter Template Version',
					})}
				/>
				<FormTextField
					placeholder='Put version number here...'
					label={'Workflow Version'}
					errors={errors}
					control={control}
					TextFieldProps={{
						size: 'small',
					}}
					{...register(workflow_version, {
						required: 'Enter Workflow Version',
					})}
				/>
				<FormTextField
					placeholder='Put link here...'
					label={'Configuration Runtime Release Notes URL'}
					errors={errors}
					control={control}
					TextFieldProps={{
						size: 'small',
					}}
					{...register(runtime_config_release_note_url, {
						required: 'Enter Configuration Runtime Release Notes URL',
						pattern: {
							value: /^(ftp|http|https):\/\/[^ "]+$/,
							message: 'Unavailable URL',
						},
					})}
				/>
				<FormTextField
					placeholder='Put version number here...'
					label={'IaC Version'}
					errors={errors}
					control={control}
					TextFieldProps={{
						size: 'small',
					}}
					{...register(ia_c_version, {
						required: 'Enter IaC Version',
					})}
				/>
				<FormTextField
					placeholder='Put link here...'
					label={'Technology Release Notes URL'}
					errors={errors}
					control={control}
					TextFieldProps={{
						size: 'small',
					}}
					{...register(technology_release_note_url, {
						required: 'Enter Technology Release Notes URL',
						pattern: {
							value: /^(ftp|http|https):\/\/[^ "]+$/,
							message: 'Unavailable URL',
						},
					})}
				/>
			</Stack>
		</TabPanel>
	);
};
