import { Box, Step, StepLabel, Stepper } from '@mui/material';
import React, { ReactElement, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';
import { getMockResponse } from '~/pages/dashboard/mocks/utils';
import { useDashboardStore } from '~/store/Dashboard';

import { useSteps } from './hooks/useSteps';

export const CreateForm = (): ReactElement => {
	const {
		resetWidgetModal,
		widgetModalActiveStepIndex,
		setNewWidget,
		resetWidgetModalProgress,
		widgetModalLastCompletedStepIndex,
	} = useDashboardStore(
		(state) => ({
			resetWidgetModal: state.resetWidgetModal,
			widgetModalActiveStepIndex: state.widgetModalActiveStepIndex,
			setNewWidget: state.setNewWidget,
			resetWidgetModalProgress: state.resetWidgetModalProgress,
			widgetModalLastCompletedStepIndex: state.widgetModalLastCompletedStepIndex,
		}),
		shallow,
	);
	const steps = useSteps();

	const form = useForm();
	const { reset, handleSubmit } = form;

	const onSubmit = useCallback(
		({ widgetSource, widgetName, ...rest }: any) => {
			const newWidget = {
				...getMockResponse(widgetSource, widgetName),
				params: rest,
			};

			setNewWidget(newWidget);

			resetWidgetModal();
			reset();
			resetWidgetModalProgress();
		},
		[reset, resetWidgetModalProgress, setNewWidget, resetWidgetModal],
	);

	return (
		<>
			<Stepper nonLinear activeStep={widgetModalActiveStepIndex}>
				{steps.map(({ name }, index) => (
					<Step key={name} completed={index < widgetModalLastCompletedStepIndex}>
						<StepLabel color='inherit'>{name}</StepLabel>
					</Step>
				))}
			</Stepper>
			<FormProvider {...form}>
				<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexGrow: 1 }}>
					{steps.map(({ component }, idx) => {
						const key = `step-content::${idx}`;

						return widgetModalActiveStepIndex === idx ? (
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
