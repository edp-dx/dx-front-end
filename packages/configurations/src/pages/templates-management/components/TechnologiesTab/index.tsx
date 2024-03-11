import { Stack } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { TabPanel } from '~/components/TabPanel';
import { FormSelect } from '~/shared-components/FormSelect';
import { useTemplatesManagementStore } from '~/store/TemplatesManagement';

import { LanguageList, TemplateCategoryList, TemplatesManagementTabs } from '../../constants';
import { FORM_NAMES } from '../../names';

export const TechnologiesTab = () => {
	const { templatesManagementTab, templateCategory } = useTemplatesManagementStore();
	const { technologiesTab } = TemplatesManagementTabs;
	const { deployment_platform, language, framework, build_tool } =
		FORM_NAMES.TemplatesManagement[technologiesTab];

	const {
		control,
		register,
		watch,
		setValue,
		trigger,
		formState: { errors },
	} = useFormContext();

	const currentTemplateCategory = useMemo(
		() => TemplateCategoryList.find((item) => item.name === templateCategory),
		[templateCategory],
	);

	const languageValue = watch(language);
	const frameworkValue = watch(framework);
	const buildToolValue = watch(build_tool);

	const currentLanguageList = useMemo(
		() => LanguageList?.find((item) => item.name === languageValue),
		[languageValue],
	);

	const handleResetLanguage = useCallback(() => {
		if (frameworkValue) {
			setValue(framework, '');
			trigger(framework);
		}
		if (buildToolValue) {
			setValue(build_tool, '');
			trigger(build_tool);
		}
	}, [buildToolValue, build_tool, framework, frameworkValue, setValue, trigger]);

	return (
		<TabPanel value={templatesManagementTab} index={technologiesTab}>
			<Stack spacing={8} pt={4} px={4}>
				<FormSelect
					placeholder='Select Deployment Platform from the list below...'
					label={'Deployment Platform'}
					errors={errors}
					control={control}
					size='small'
					options={
						currentTemplateCategory
							? currentTemplateCategory.deployment_platform.map((item) => ({
									value: item,
									label: item,
							  }))
							: []
					}
					{...register(deployment_platform, {
						required: 'Enter Deployment Platform',
					})}
				/>
				<FormSelect
					placeholder='Select Language from the list below...'
					label={'Language'}
					errors={errors}
					control={control}
					size='small'
					options={
						currentTemplateCategory
							? LanguageList.map((item) => ({
									value: item.name,
									label: item.name,
							  }))
							: []
					}
					{...register(language, {
						required: 'Enter Language',
						onChange: handleResetLanguage,
					})}
				/>
				<FormSelect
					placeholder='Select Framework from the list below...'
					label={'Framework'}
					errors={errors}
					control={control}
					disabled={!languageValue}
					size='small'
					options={
						currentLanguageList?.frameworks
							? currentLanguageList.frameworks.map((item) => ({
									value: item,
									label: item,
							  }))
							: []
					}
					{...register(framework, {
						required: 'Enter Framework',
					})}
				/>
				<FormSelect
					placeholder='Select Build Tool from the list below...'
					label={'Build Tool'}
					errors={errors}
					control={control}
					disabled={!languageValue}
					size='small'
					options={
						currentLanguageList?.build_tool
							? currentLanguageList.build_tool.map((item) => ({
									value: item,
									label: item,
							  }))
							: []
					}
					{...register(build_tool, {
						required: 'Enter Build Tool',
					})}
				/>
			</Stack>
		</TabPanel>
	);
};
