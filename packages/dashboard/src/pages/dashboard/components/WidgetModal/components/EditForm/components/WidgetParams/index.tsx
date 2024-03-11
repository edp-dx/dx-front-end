import { Button, Stack, Typography, useTheme } from '@mui/material';
import React, { FC, ReactElement, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { shallow } from 'zustand/shallow';
import { FormTextField } from '~/components/FormTextField';
import { FormSelect } from '~/shared-components/FormSelect';
import { useDashboardStore } from '~/store/Dashboard';

import dataSources from '../../../../../../mocks/sources.mock.json';
import { DataSource } from '../../../../../../mocks/types';
import { StepContentProps } from '../../../../types';

export const WidgetParams: FC<StepContentProps> = ({ handleClose }): ReactElement => {
	const theme = useTheme();
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext();

	const { widgets, activeWidgetID } = useDashboardStore(
		(state) => ({
			widgets: state.widgets,
			activeWidgetID: state.activeWidgetID,
		}),
		shallow,
	);

	const activeWidget = useMemo(
		() => widgets.find((el) => el.id === activeWidgetID),
		[activeWidgetID, widgets],
	);

	const fields = useMemo(
		() =>
			(dataSources.sources as DataSource[])
				.find((el) => el.name === activeWidget?.source)
				?.widgets.find((el) => el.name === activeWidget?.originName)?.params,
		[activeWidget?.originName, activeWidget?.source],
	);

	return (
		<Stack spacing={4} justifyContent={'space-between'} flexGrow={1}>
			<Stack spacing={4}>
				<Typography variant={'h6'} color={theme.palette.text.secondary}>
					Edit{' '}
					<Typography
						variant={'h6'}
						component={'span'}
						color={theme.palette.text.primary}
					>
						{activeWidget?.source} {activeWidget?.name}
					</Typography>{' '}
					Params
				</Typography>
				<Stack spacing={4}>
					{fields &&
						fields.map((el) => {
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
					onClick={handleClose}
					color={'inherit'}
					sx={{ color: theme.palette.action.disabled }}
				>
					cancel
				</Button>
				<Button type={'submit'} variant={'contained'}>
					save
				</Button>
			</Stack>
		</Stack>
	);
};
