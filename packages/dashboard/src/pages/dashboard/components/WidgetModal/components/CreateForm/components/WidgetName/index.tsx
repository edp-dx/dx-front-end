import { Button, Stack, Typography, useTheme } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { shallow } from 'zustand/shallow';
import { FormSelect } from '~/shared-components/FormSelect';
import { useDashboardStore } from '~/store/Dashboard';

import { Widget } from '../../../../../../mocks/types';
import { FORM_NAMES } from '../../../../names';
import { StepContentProps } from '../../../../types';

export const WidgetName: FC<StepContentProps> = ({ handleBack, handleNext }): ReactElement => {
	const theme = useTheme();
	const {
		register,
		control,
		formState: { errors },
		watch,
		resetField,
	} = useFormContext();

	const { widgets } = useDashboardStore(
		(state) => ({
			widgets: state.widgets,
		}),
		shallow,
	);

	const widgetSourceFieldValue = watch(FORM_NAMES.widgetSource);
	const widgetNameFieldValue = watch(FORM_NAMES.widgetName);

	const { data } = useQuery<unknown, unknown, Widget[]>('widgetNames');

	const queryClient = useQueryClient();

	return (
		<Stack spacing={4} justifyContent={'space-between'} flexGrow={1}>
			<Stack spacing={4}>
				<Typography variant={'h6'} color={theme.palette.text.secondary}>
					Available{' '}
					<Typography
						variant={'h6'}
						component={'span'}
						color={theme.palette.text.primary}
					>
						{widgetSourceFieldValue}
					</Typography>{' '}
					Widgets
				</Typography>
				<FormSelect
					label={'Widget Name'}
					errors={errors}
					control={control}
					options={
						data
							? data.map(({ name, available }) => ({
									label: name,
									value: name,
									disabled:
										!available ||
										!!widgets.find((el) => el.originName === name),
							  }))
							: []
					}
					{...register(FORM_NAMES.widgetName, {
						required: 'Select Widget Name',
						onChange: ({ target: { value } }) => {
							// emulate back-end response and set it as widgetNames
							queryClient.setQueryData(
								'widgetParams',
								data.find((el) => el.name === value).params,
							);
						},
					})}
				/>
			</Stack>
			<Stack direction={'row'} alignItems={'center'} spacing={2} justifyContent={'flex-end'}>
				<Button
					onClick={() => {
						handleBack();
						resetField(FORM_NAMES.widgetName);
					}}
					color={'inherit'}
					sx={{ color: theme.palette.action.disabled }}
				>
					back
				</Button>
				<Button disabled={!widgetNameFieldValue} onClick={handleNext} variant={'contained'}>
					next
				</Button>
			</Stack>
		</Stack>
	);
};
