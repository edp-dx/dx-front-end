import { ValueOf } from '~/types/common';

import { VIEW_MODE, WIDGET_MODAL_MODE } from './constants';

export interface Insight {
	id: number;
	title: string;
	description: string;
}

export interface WidgetExplanation {
	heading: string;
	content: string;
}

export interface Widget {
	source: string;
	originName: string;
	href?: string;
	insights: Insight[];
	name: string;
	id: number;
	imageFull: string;
	imageHalf: string;
	widgetExplanation: WidgetExplanation[];
	params: {
		[key: string]: string;
	};
}

export interface Slot {
	widgetId: number;
}

export interface Slots {
	active: Slot[];
	aside: Slot[];
}

export interface DashboardStore {
	mode: ValueOf<typeof VIEW_MODE>;
	slots: Slots;
	widgets: Widget[];

	activeWidgetID: number;
	activeInsightWidgetID: number;
	activeWidgetExplanationWidgetsIDS: number[];
	setActiveWidgetID: (widgetID: number) => void;
	setActiveInsightWidgetID: (widgetID: number) => void;
	setWidgetExplanationWidgetsIDS: (widgetIDs: number[]) => void;

	setNewWidget: (widget: Widget) => void;
	updateWidget: (widget: Widget) => void;
	changeToZoomView: (widget: Widget, isActive: boolean) => void;
	changeToSplitView: (widget: Widget, isActive: boolean) => void;
	minimizeWidget: (widget: Widget, isActive: boolean) => void;
	deleteWidget: (widgetID: number, isActive: boolean) => void;
	swapWidgetsInActiveSlot: () => void;

	widgetModal: {
		open: boolean;
		mode: ValueOf<typeof WIDGET_MODAL_MODE>;
	};
	setWidgetModal: (open: boolean, mode?: ValueOf<typeof WIDGET_MODAL_MODE>) => void;
	resetWidgetModal: () => void;

	widgetDeleteModalOpen: boolean;
	setWidgetDeleteModalOpen: (value: boolean) => void;

	widgetModalActiveStepIndex: number;
	setWidgetModalActiveStepIndex: (value: number) => void;

	widgetModalLastCompletedStepIndex: number;
	setWidgetModalLastCompletedStepIndex: (value: number) => void;

	resetWidgetModalProgress: () => void;
}
