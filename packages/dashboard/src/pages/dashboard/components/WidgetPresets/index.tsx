import AddIcon from '@mui/icons-material/Add';
import { Box, IconButton, Stack, useTheme } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';
import { usePresets } from '~/pages/dashboard/components/WidgetPresets/hooks/usePresets';
import { getMockResponse } from '~/pages/dashboard/mocks/utils';
import { FormSelect } from '~/shared-components/FormSelect';
import { useDashboardStore } from '~/store/Dashboard';
import { FormValues } from '~/types/common';

const NAMES = {
	widgetPreset: 'widgetPreset',
};

export const WidgetPresets = () => {
	const theme = useTheme();
	const { setNewWidget } = useDashboardStore(
		(state) => ({
			setNewWidget: state.setNewWidget,
		}),
		shallow,
	);

	const form = useForm();
	const {
		reset,
		handleSubmit,
		register,
		control,
		formState: { errors },
		watch,
	} = form;
	const onSubmit = useCallback(
		({ widgetPreset }: FormValues<typeof NAMES>) => {
			const getWidget = () => {
				switch (widgetPreset) {
					case 'projects_health_map':
						return getMockResponse('Delivery Central Project', 'Health Map');
					case 'project_status':
						return getMockResponse('Delivery Central Project', 'Project Status');
					case 'project_details':
						return getMockResponse('Jira', 'Project Details');
					case 'project_roadmap':
						return getMockResponse('Delivery Central Project', 'Project Roadmap');
					case 'project_candidates':
						return getMockResponse('Telescope', 'Project Candidates');
				}
			};

			const newWidget = getWidget();

			setNewWidget(newWidget);
			reset();
		},
		[reset, setNewWidget],
	);

	const presetsOptions = usePresets();

	const widgetPresetFieldValue = watch(NAMES.widgetPreset);
	const hasNotSelectedOptions = useMemo(
		() => presetsOptions.find((el) => !el.disabled),
		[presetsOptions],
	);

	return (
		<FormProvider {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack direction={'row'} alignItems={'center'}>
					<Box sx={{ width: theme.typography.pxToRem(380) }}>
						<FormSelect
							label={'Widget Presets'}
							errors={errors}
							control={control}
							options={presetsOptions}
							placeholder={'Select a predefined one from the list below...'}
							SelectProps={{
								size: 'small',
								fullWidth: true,
								disabled: !hasNotSelectedOptions,
							}}
							{...register(NAMES.widgetPreset, {
								required: 'Select Widget Preset',
							})}
						/>
					</Box>
					<IconButton type={'submit'} disabled={!widgetPresetFieldValue}>
						<AddIcon />
					</IconButton>
				</Stack>
			</form>
		</FormProvider>
	);
};
