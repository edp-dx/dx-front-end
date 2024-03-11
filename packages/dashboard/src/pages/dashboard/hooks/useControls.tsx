import { useTheme } from '@mui/material';
import { ButtonBaseProps } from '@mui/material/ButtonBase/ButtonBase';
import { blueGrey } from '@mui/material/colors';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { shallow } from 'zustand/shallow';
import { BookWithBookmark } from '~/icons/BookWithBookmark';
import { Bulb } from '~/icons/Bulb';
import { Edit } from '~/icons/Edit';
import { Full } from '~/icons/Full';
import { Half } from '~/icons/Half';
import { Minimize } from '~/icons/Minimize';
import { Swap } from '~/icons/Swap';
import { Trash } from '~/icons/Trash';
import { useDashboardStore } from '~/store/Dashboard';
import { VIEW_MODE, WIDGET_MODAL_MODE } from '~/store/Dashboard/constants';
import { Widget } from '~/store/Dashboard/types';

interface Control {
	handler: () => void;
	visible: boolean;
	icon: ReactElement;
	buttonProps?: ButtonBaseProps;
	tooltip: string;
	disabled: boolean;
}

interface UseControlsReturnType {
	up: {
		left: Control[];
		center: Control[];
		right: Control[];
	};
	bottom: {
		left: Control[];
		center: Control[];
		right: Control[];
	};
	center: {
		left: Control[];
		center: Control[];
		right: Control[];
	};
}

export const useControls = (widget?: Widget, isActive?: boolean): UseControlsReturnType => {
	const {
		mode,
		changeToZoomView,
		changeToSplitView,
		slots,
		swapWidgetsInActiveSlot,
		minimizeWidget,
		setWidgetModal,
		activeWidgetExplanationWidgetsIDS,
		activeInsightWidgetID,
		setActiveInsightWidgetID,
		setWidgetExplanationWidgetsIDS,
		setActiveWidgetID,
		setWidgetDeleteModalOpen,
	} = useDashboardStore(
		(state) => ({
			changeToSplitView: state.changeToSplitView,
			mode: state.mode,
			changeToZoomView: state.changeToZoomView,
			swapWidgetsInActiveSlot: state.swapWidgetsInActiveSlot,
			minimizeWidget: state.minimizeWidget,
			slots: state.slots,
			setWidgetModal: state.setWidgetModal,
			setActiveWidgetID: state.setActiveWidgetID,
			activeInsightWidgetID: state.activeInsightWidgetID,
			setActiveInsightWidgetID: state.setActiveInsightWidgetID,
			activeWidgetExplanationWidgetsIDS: state.activeWidgetExplanationWidgetsIDS,
			setWidgetExplanationWidgetsIDS: state.setWidgetExplanationWidgetsIDS,
			setWidgetDeleteModalOpen: state.setWidgetDeleteModalOpen,
		}),
		shallow,
	);

	const theme = useTheme();

	const isWidgetInsightActive = useMemo(
		() => !!activeInsightWidgetID && activeInsightWidgetID === widget?.id,
		[activeInsightWidgetID, widget?.id],
	);

	const isWidgetExplanationActive = useMemo(
		() =>
			activeWidgetExplanationWidgetsIDS &&
			activeWidgetExplanationWidgetsIDS.length &&
			activeWidgetExplanationWidgetsIDS.includes(widget?.id),
		[activeWidgetExplanationWidgetsIDS, widget?.id],
	);

	const handleDeleteWidget = useCallback(() => {
		setActiveWidgetID(widget?.id);
		setWidgetDeleteModalOpen(true);
	}, [setActiveWidgetID, setWidgetDeleteModalOpen, widget?.id]);

	const handleMinimizeActiveWidget = useCallback(
		() => minimizeWidget(widget, isActive),
		[isActive, minimizeWidget, widget],
	);

	const handleActivateInsights = useCallback(() => {
		if (isWidgetInsightActive) {
			setActiveInsightWidgetID(null);
		} else {
			setActiveInsightWidgetID(widget?.id);
		}
	}, [isWidgetInsightActive, setActiveInsightWidgetID, widget?.id]);

	const handleActivateWidgetExplanation = useCallback(() => {
		if (isWidgetExplanationActive) {
			setWidgetExplanationWidgetsIDS(
				activeWidgetExplanationWidgetsIDS.filter((el) => el !== widget?.id),
			);
		} else {
			setWidgetExplanationWidgetsIDS([...activeWidgetExplanationWidgetsIDS, widget?.id]);
		}
	}, [
		activeWidgetExplanationWidgetsIDS,
		isWidgetExplanationActive,
		setWidgetExplanationWidgetsIDS,
		widget?.id,
	]);

	const handleEditWidget = useCallback(() => {
		setActiveWidgetID(widget?.id);
		setWidgetModal(true, WIDGET_MODAL_MODE.EDIT);
	}, [setActiveWidgetID, setWidgetModal, widget?.id]);

	const handleChangeToSplitView = useCallback(
		() => changeToSplitView(widget, isActive),
		[changeToSplitView, isActive, widget],
	);

	const handleSwapWidgetsInActiveSlot = useCallback(
		() => swapWidgetsInActiveSlot(),
		[swapWidgetsInActiveSlot],
	);

	const handleChangeToZoomView = useCallback(
		() => changeToZoomView(widget, isActive),
		[changeToZoomView, widget, isActive],
	);

	const widgetActionVisibleMap = useMemo(
		() => ({
			ALL: true,
			ACTIVE: isActive,
			ASIDE: !isActive,
		}),
		[isActive],
	);

	const iconProps = useMemo(
		() => ({
			width: theme.typography.pxToRem(16),
			height: theme.typography.pxToRem(16),
		}),
		[theme],
	);

	const atLeastOneAsideWidgetIsAvailable = useMemo(
		() => slots.aside.some((el) => el.widgetId !== null),
		[slots],
	);

	const widgetHasInsights = useMemo(() => !!widget?.insights.length, [widget?.insights.length]);
	const widgetHasWidgetExplanation = useMemo(
		() => !!widget?.insights.length,
		[widget?.insights.length],
	);

	return useMemo(
		() => ({
			up: {
				left: [
					{
						handler: handleActivateInsights,
						visible: widgetActionVisibleMap.ACTIVE && widgetHasInsights,
						icon: <Bulb {...iconProps} />,
						buttonProps: {
							sx: {
								backgroundColor: isWidgetInsightActive
									? theme.palette.info.light
									: blueGrey['100'],
								'&:hover': {
									backgroundColor: isWidgetInsightActive
										? theme.palette.info.light
										: blueGrey['300'],
								},
							},
						},
						tooltip: 'Insight ON/OFF',
						disabled: false,
					},
				],
				center: [
					{
						handler: handleActivateWidgetExplanation,
						visible: widgetActionVisibleMap.ACTIVE && widgetHasWidgetExplanation,
						icon: <BookWithBookmark {...iconProps} />,
						buttonProps: {
							sx: {
								backgroundColor: isWidgetExplanationActive
									? theme.palette.info.light
									: blueGrey['100'],
								'&:hover': {
									backgroundColor: isWidgetExplanationActive
										? theme.palette.info.light
										: blueGrey['300'],
								},
							},
						},
						tooltip: 'Widget Explanation ON/OFF',
						disabled: false,
					},
				],
				right: [
					{
						handler: handleMinimizeActiveWidget,
						visible:
							widgetActionVisibleMap.ACTIVE &&
							!isWidgetInsightActive &&
							!isWidgetExplanationActive,
						icon: <Minimize {...iconProps} />,
						tooltip: 'Minimize',
						disabled:
							mode === VIEW_MODE.COMPARISON
								? false
								: !atLeastOneAsideWidgetIsAvailable,
					},
					{
						handler: handleChangeToSplitView,
						visible:
							widgetActionVisibleMap.ALL &&
							mode === VIEW_MODE.FULL &&
							!isWidgetInsightActive &&
							!isWidgetExplanationActive,
						icon: <Half {...iconProps} />,
						tooltip: 'Split View',
						disabled: !atLeastOneAsideWidgetIsAvailable,
					},
					{
						handler: handleChangeToZoomView,
						visible:
							widgetActionVisibleMap.ASIDE ||
							(mode === VIEW_MODE.COMPARISON &&
								!isWidgetInsightActive &&
								!isWidgetExplanationActive),
						icon: <Full {...iconProps} />,
						tooltip: 'Zoom View',
						disabled: false,
					},
				],
			},
			bottom: {
				left: [
					{
						handler: handleDeleteWidget,
						visible:
							widgetActionVisibleMap.ALL &&
							!isWidgetInsightActive &&
							!isWidgetExplanationActive,
						icon: <Trash {...iconProps} />,
						tooltip: 'Remove',
						disabled: false,
					},
				],
				center: [],
				right: [
					{
						handler: handleEditWidget,
						visible:
							widgetActionVisibleMap.ACTIVE &&
							!isWidgetInsightActive &&
							!isWidgetExplanationActive,
						icon: <Edit {...iconProps} />,
						tooltip: 'Edit Params',
						disabled: false,
					},
				],
			},
			center: {
				left: [],
				center: [
					{
						handler: handleSwapWidgetsInActiveSlot,
						visible: mode === VIEW_MODE.COMPARISON,
						icon: <Swap {...iconProps} />,
						tooltip: 'Swap',
						disabled: false,
					},
				],
				right: [],
			},
		}),
		[
			atLeastOneAsideWidgetIsAvailable,
			handleActivateInsights,
			handleActivateWidgetExplanation,
			handleChangeToSplitView,
			handleChangeToZoomView,
			handleDeleteWidget,
			handleEditWidget,
			handleMinimizeActiveWidget,
			handleSwapWidgetsInActiveSlot,
			iconProps,
			isWidgetInsightActive,
			isWidgetExplanationActive,
			mode,
			theme,
			widgetActionVisibleMap,
			widgetHasInsights,
			widgetHasWidgetExplanation,
		],
	);
};
