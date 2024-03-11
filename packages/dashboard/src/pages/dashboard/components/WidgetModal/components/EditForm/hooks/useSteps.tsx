import React from 'react';
import { shallow } from 'zustand/shallow';
import { useDashboardStore } from '~/store/Dashboard';
import { WIDGET_MODAL_MODE } from '~/store/Dashboard/constants';

import { WidgetParams } from '../components/WidgetParams';

export const useSteps = () => {
	const {
		resetWidgetModal,
		setWidgetModalActiveStepIndex,
		setWidgetModalLastCompletedStepIndex,
	} = useDashboardStore(
		(state) => ({
			resetWidgetModal: state.resetWidgetModal,
			setWidgetModalActiveStepIndex: state.setWidgetModalActiveStepIndex,
			setWidgetModalLastCompletedStepIndex: state.setWidgetModalLastCompletedStepIndex,
		}),
		shallow,
	);

	const handleClose = () => {
		resetWidgetModal();
		setWidgetModalActiveStepIndex(0);
		setWidgetModalLastCompletedStepIndex(0);
	};

	return [
		{
			name: 'Select Data Source',
			component: null,
		},
		{
			name: 'Select Widget',
			component: null,
		},
		{
			name: 'Edit Params',
			component: <WidgetParams handleClose={handleClose} mode={WIDGET_MODAL_MODE.EDIT} />,
		},
	];
};
