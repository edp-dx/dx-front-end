import { Button, Stack, Typography, useTheme } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { FormTextField } from '~/components/FormTextField';
import { FormSelect } from '~/shared-components/FormSelect';

import { Param } from '../../../../../../mocks/types';
import { FORM_NAMES } from '../../../../names';
import { StepContentProps } from '../../../../types';

export const WidgetParams: FC<StepContentProps> = ({ handleBack }): ReactElement => {
	const theme = useTheme();
	const {
		register,
		control,
		formState: { errors },
		watch,
	} = useFormContext();

	const widgetSourceFieldValue = watch(FORM_NAMES.widgetSource);
	const widgetNameFieldValue = watch(FORM_NAMES.widgetName);

	const { data } = useQuery<unknown, unknown, Param[]>('widgetParams');

	return (
		<Stack spacing={4} justifyContent={'space-between'} flexGrow={1}>
			<Stack spacing={4}>
				<Typography variant={'h6'} color={theme.palette.text.secondary}>
					Add{' '}
					<Typography
						variant={'h6'}
						component={'span'}
						color={theme.palette.text.primary}
					>
						{widgetSourceFieldValue} {widgetNameFieldValue}
					</Typography>{' '}
					Params
				</Typography>
				<Stack spacing={4}>
					{data &&
						data.map((el) => {
							switch (el.type) {
								case 'select':
									return (
										<FormSelect
											label={el.name}
											errors={errors}
											control={control}
											options={el.options.map(({ name, available }) => ({
												label: name,
												value: name,
												disabled: !available,
											}))}
											placeholder={el.placeholder}
											{...register(el.name, {
												required: 'Fill the field',
											})}
										/>
									);
								case 'text':
									return (
										<FormTextField
											label={el.name}
											errors={errors}
											control={control}
											placeholder={el.placeholder}
											{...register(el.name)}
										/>
									);
								default:
									break;
							}
						})}
				</Stack>
			</Stack>
			<Stack direction={'row'} alignItems={'center'} spacing={2} justifyContent={'flex-end'}>
				<Button
					onClick={handleBack}
					color={'inherit'}
					sx={{ color: theme.palette.action.disabled }}
				>
					back
				</Button>
				<Button type={'submit'} variant={'contained'}>
					add
				</Button>
			</Stack>
		</Stack>
	);
};
