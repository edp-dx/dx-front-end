import { Button, Stack, Typography, useTheme } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { FormSelect } from '~/shared-components/FormSelect';

import dataSources from '../../../../../../mocks/sources.mock.json';
import { DataSource } from '../../../../../../mocks/types';
import { FORM_NAMES } from '../../../../names';
import { StepContentProps } from '../../../../types';

export const WidgetSource: FC<StepContentProps> = ({ handleClose, handleNext }): ReactElement => {
	const theme = useTheme();
	const { data } = useQuery<unknown, unknown, DataSource[]>(
		'dataSources',
		() => new Promise((resolve) => resolve(dataSources.sources)),
	);

	const {
		register,
		control,
		formState: { errors },
		watch,
	} = useFormContext();

	const widgetSourceFieldValue = watch(FORM_NAMES.widgetSource);

	const queryClient = useQueryClient();

	return (
		<Stack spacing={4} justifyContent={'space-between'} flexGrow={1}>
			<Stack spacing={4}>
				<Typography variant={'h6'} color={theme.palette.text.secondary}>
					Available Data Sources
				</Typography>
				<FormSelect
					label={'Widget Source'}
					errors={errors}
					control={control}
					options={
						data
							? data.map(({ name, available }) => ({
									label: name,
									value: name,
									disabled: !available,
							  }))
							: []
					}
					{...register(FORM_NAMES.widgetSource, {
						required: 'Select Widget Source',
						onChange: ({ target: { value } }) => {
							// emulate back-end response and set it as widgetNames
							queryClient.setQueryData(
								'widgetNames',
								data.find((el) => el.name === value).widgets,
							);
						},
					})}
				/>
			</Stack>
			<Stack direction={'row'} alignItems={'center'} spacing={2} justifyContent={'flex-end'}>
				<Button
					onClick={handleClose}
					color={'inherit'}
					sx={{ color: theme.palette.action.disabled }}
				>
					cancel
				</Button>
				<Button
					disabled={!widgetSourceFieldValue}
					onClick={handleNext}
					variant={'contained'}
				>
					next
				</Button>
			</Stack>
		</Stack>
	);
};
