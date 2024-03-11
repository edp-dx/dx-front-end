import { Box, Step, StepLabel, Stepper, useTheme } from '@mui/material';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';
import { getEditMockResponse } from '~/pages/dashboard/mocks/utils';
import { useDashboardStore } from '~/store/Dashboard';

import { useSteps } from './hooks/useSteps';

export const EditForm = (): ReactElement => {
	const theme = useTheme();
	const { widgets, activeWidgetID, resetWidgetModal, resetWidgetModalProgress, updateWidget } =
		useDashboardStore(
			(state) => ({
				widgets: state.widgets,
				activeWidgetID: state.activeWidgetID,
				resetWidgetModal: state.resetWidgetModal,
				resetWidgetModalProgress: state.resetWidgetModalProgress,
				updateWidget: state.updateWidget,
			}),
			shallow,
		);
	const steps = useSteps();

	const activeWidget = useMemo(
		() => widgets.find((el) => el.id === activeWidgetID),
		[activeWidgetID, widgets],
	);

	const form = useForm({
		defaultValues: activeWidget?.params,
	});

	const { reset, handleSubmit } = form;

	const onSubmit = useCallback(
		({ ...rest }: any) => {
			const newWidget = {
				...getEditMockResponse(activeWidget?.source, activeWidget?.originName),
				params: rest,
			};

			updateWidget(newWidget);

			resetWidgetModal();
			reset();
			resetWidgetModalProgress();
		},
		[
			activeWidget?.source,
			activeWidget?.originName,
			updateWidget,
			resetWidgetModal,
			reset,
			resetWidgetModalProgress,
		],
	);

	return (
		<>
			<Stepper nonLinear activeStep={2}>
				{steps.map(({ name }, index) => (
					<Step
						key={name}
						completed={index < 2}
						sx={{
							'& .MuiStepIcon-root.Mui-completed': {
								color:
									index < 2
										? theme.palette.action.disabled
										: theme.palette.primary.contrast,
							},
						}}
					>
						<StepLabel color='inherit'>{name}</StepLabel>
					</Step>
				))}
			</Stepper>
			<FormProvider {...form}>
				<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexGrow: 1 }}>
					{steps.map(({ component }, idx) => {
						const key = `step-content::${idx}`;

						return idx === steps.length - 1 ? (
							<Box key={key} display={'flex'} flexDirection={'column'} width={'100%'}>
								{component}
							</Box>
						) : null;
					})}
				</form>
			</FormProvider>
		</>
	);
};
