import { Stack } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { TabPanel } from '~/components/TabPanel';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_TEMPLATES_MANAGEMENT_LIST } from '~/services/data/templateManagement/requestKeys';
import { FormSelect } from '~/shared-components/FormSelect';
import { FormTextField } from '~/shared-components/FormTextField';
import { useTemplatesManagementStore } from '~/store/TemplatesManagement';

import { TemplateCategoryList, TemplatesManagementTabs } from '../../constants';
import { FORM_NAMES } from '../../names';

export const GeneralInfoTab = () => {
	const { templatesManagementTab, setTemplateCategory } = useTemplatesManagementStore();
	const { generalInfoTab, technologiesTab } = TemplatesManagementTabs;

	const { name, category, description, git_repo_url, status } =
		FORM_NAMES.TemplatesManagement[generalInfoTab];
	const { deployment_platform } = FORM_NAMES.TemplatesManagement[technologiesTab];

	const { data: templatesManagementList } = useQuery(
		REQUEST_KEY_GET_TEMPLATES_MANAGEMENT_LIST,
		() => DataService.getTemplatesManagementList(),
	);

	const {
		control,
		register,
		watch,
		setValue,
		trigger,
		formState: { errors, defaultValues },
	} = useFormContext();

	const descriptionFieldValue = watch(description);
	const templateCategoryValue = watch(category);
	const deploymentPlatformValue = watch(deployment_platform);

	useEffect(() => {
		setTemplateCategory(templateCategoryValue);
	}, [setTemplateCategory, templateCategoryValue]);

	const handleResetDeploymentPlatform = useCallback(() => {
		if (deploymentPlatformValue) {
			setValue(deployment_platform, '');
			trigger(deployment_platform);
		}
	}, [deploymentPlatformValue, deployment_platform, setValue, trigger]);

	return (
		<TabPanel value={templatesManagementTab} index={generalInfoTab}>
			<Stack spacing={8} pt={4} px={4}>
				<FormTextField
					placeholder='Type Template Name here...'
					label={'Template Name'}
					errors={errors}
					control={control}
					TextFieldProps={{
						size: 'small',
					}}
					{...register(name, {
						required: 'Enter Template Name',
						validate: (value) => {
							return (
								(templatesManagementList &&
									!templatesManagementList?.some(
										(item) =>
											item.name === value && defaultValues.name !== item.name,
									)) ||
								`Templates Management Name ${value} already exists`
							);
						},
					})}
				/>
				<FormSelect
					placeholder='Select Template Category'
					label={'Template Category'}
					errors={errors}
					control={control}
					size='small'
					options={TemplateCategoryList.map((item) => ({
						value: item.name,
						label: item.name,
						disabled: item.disabled,
					}))}
					{...register(category, {
						onChange: () => handleResetDeploymentPlatform(),
						required: 'Enter Template Category',
					})}
				/>
				<FormTextField
					placeholder='Put link here...'
					label={'Git Repo URL'}
					errors={errors}
					control={control}
					TextFieldProps={{
						size: 'small',
					}}
					{...register(git_repo_url, {
						required: 'Enter Git Repo URL',
						pattern: {
							value: /^(ftp|http|https):\/\/[^ "]+$/,
							message: 'Unavailable URL',
						},
					})}
				/>
				<FormTextField
					placeholder='Type your Template description here...'
					label={'Description'}
					errors={errors}
					control={control}
					TextFieldProps={{
						size: 'small',
						multiline: true,
						rows: 2,
						helperText: `${
							descriptionFieldValue ? descriptionFieldValue.length : 0
						}/100`,
					}}
					{...register(description, {
						validate: (value) => value.length <= 100,
					})}
				/>
				<FormTextField
					label={'Status'}
					errors={errors}
					control={control}
					TextFieldProps={{
						size: 'small',
						variant: 'standard',
					}}
					{...register(status)}
				/>
			</Stack>
		</TabPanel>
	);
};
