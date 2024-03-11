import React, { useCallback } from 'react';
import { shallow } from 'zustand/shallow';
import { useDashboardStore } from '~/store/Dashboard';
import { WIDGET_MODAL_MODE } from '~/store/Dashboard/constants';

import { WidgetName } from '../components/WidgetName';
import { WidgetParams } from '../components/WidgetParams';
import { WidgetSource } from '../components/WidgetSource';

export const useSteps = () => {
	const {
		resetWidgetModal,
		widgetModalActiveStepIndex,
		setWidgetModalActiveStepIndex,
		widgetModalLastCompletedStepIndex,
		setWidgetModalLastCompletedStepIndex,
	} = useDashboardStore(
		(state) => ({
			resetWidgetModal: state.resetWidgetModal,
			widgetModalActiveStepIndex: state.widgetModalActiveStepIndex,
			setWidgetModalActiveStepIndex: state.setWidgetModalActiveStepIndex,
			widgetModalLastCompletedStepIndex: state.widgetModalLastCompletedStepIndex,
			setWidgetModalLastCompletedStepIndex: state.setWidgetModalLastCompletedStepIndex,
		}),
		shallow,
	);

	const handleClose = () => {
		resetWidgetModal();
		setWidgetModalActiveStepIndex(0);
		setWidgetModalLastCompletedStepIndex(0);
	};

	const handleBack = useCallback(() => {
		setWidgetModalActiveStepIndex(widgetModalActiveStepIndex - 1);
		setWidgetModalLastCompletedStepIndex(widgetModalLastCompletedStepIndex - 1);
	}, [
		setWidgetModalActiveStepIndex,
		setWidgetModalLastCompletedStepIndex,
		widgetModalActiveStepIndex,
		widgetModalLastCompletedStepIndex,
	]);

	const handleNext = useCallback(() => {
		setWidgetModalActiveStepIndex(widgetModalActiveStepIndex + 1);
		setWidgetModalLastCompletedStepIndex(widgetModalLastCompletedStepIndex + 1);
	}, [
		setWidgetModalActiveStepIndex,
		setWidgetModalLastCompletedStepIndex,
		widgetModalActiveStepIndex,
		widgetModalLastCompletedStepIndex,
	]);

	return [
		{
			name: 'Select Data Source',
			component: (
				<WidgetSource
					handleClose={handleClose}
					handleBack={handleBack}
					handleNext={handleNext}
				/>
			),
		},
		{
			name: 'Select Widget',
			component: (
				<WidgetName
					handleClose={handleClose}
					handleBack={handleBack}
					handleNext={handleNext}
				/>
			),
		},
		{
			name: 'Add Params',
			component: (
				<WidgetParams
					handleClose={handleClose}
					handleBack={handleBack}
					handleNext={handleNext}
					mode={WIDGET_MODAL_MODE.CREATE}
				/>
			),
		},
	];
};
