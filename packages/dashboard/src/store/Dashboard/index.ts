import { create } from 'zustand';
import { LocalStorageService } from '~/services/data/dashboard';
import { VIEW_MODE, WIDGET_MODAL_MODE } from '~/store/Dashboard/constants';
import { ValueOf } from '~/types/common';

import { DashboardStore, Slot } from './types';

const sortByEmptyWidget = (a: Slot, b: Slot) => {
	if (a.widgetId) {
		return -1;
	} else if (b.widgetId) {
		return 0;
	}

	return 1;
};

export const isActiveSlotEmpty = (activeSlot: Slot[], mode: ValueOf<typeof VIEW_MODE>) =>
	(!activeSlot.length || activeSlot?.[0].widgetId === null) && mode === VIEW_MODE.FULL;

export const isActiveSlotSingle = (activeSlot: Slot[], mode: ValueOf<typeof VIEW_MODE>) =>
	activeSlot.length === 1 && mode === VIEW_MODE.FULL;

export const isActiveSlotMultiple = (activeSlot: Slot[], mode: ValueOf<typeof VIEW_MODE>) =>
	activeSlot.length === 2 && mode === VIEW_MODE.COMPARISON;

export const SLOT_AMOUNT = 5;
const activeSlotWidgetAmount = LocalStorageService.getSlots()?.active.length || 0;
const asideSlotsWidgetAmount = SLOT_AMOUNT - activeSlotWidgetAmount;

const initialAsideSlots: Slot[] = Array.from({ length: asideSlotsWidgetAmount }, () => ({
	widgetId: null,
}));

export const useDashboardStore = create<DashboardStore>((set) => ({
	mode: LocalStorageService.getMode() ?? VIEW_MODE.FULL,
	slots: LocalStorageService.getSlots() ?? {
		active: [],
		aside: initialAsideSlots,
	},

	widgets: LocalStorageService.getWidgets() ?? [],

	activeWidgetID: null,
	activeInsightWidgetID: null,
	activeWidgetExplanationWidgetsIDS: [],
	setActiveWidgetID: (widgetID) => {
		set(() => ({
			activeWidgetID: widgetID,
		}));
	},
	setActiveInsightWidgetID: (widgetID) => {
		set(() => ({
			activeInsightWidgetID: widgetID,
		}));
	},
	setWidgetExplanationWidgetsIDS: (widgetIDs) => {
		set(() => ({
			activeWidgetExplanationWidgetsIDS: widgetIDs,
		}));
	},

	setNewWidget: (widget) => {
		set(({ slots, widgets, mode }) => {
			const freeAsideSlotIndex = slots.aside.findIndex((el) => !el.widgetId);

			const newWidgets = [...widgets, widget];
			const newSlots = { ...slots };

			if (isActiveSlotEmpty(slots.active, mode)) {
				newSlots.active = [{ widgetId: widget.id }];
				newSlots.aside =
					newSlots.aside.length < initialAsideSlots.length
						? [...newSlots.aside.sort(sortByEmptyWidget)]
						: [...newSlots.aside.sort(sortByEmptyWidget).slice(0, -1)];
			} else {
				newSlots.aside = slots.aside.map((el, idx) => {
					if (idx === freeAsideSlotIndex) {
						return {
							...el,
							widgetId: widget.id,
						};
					}

					return el;
				});
			}

			LocalStorageService.saveWidgets(newWidgets);
			LocalStorageService.saveSlots(newSlots);

			return {
				widgets: newWidgets,
				slots: newSlots,
			};
		});
	},

	updateWidget: (widget) => {
		set(({ widgets }) => {
			const newWidgets = widgets.map((el) => {
				if (el.id === widget.id) {
					return widget;
				}

				return el;
			});

			LocalStorageService.saveWidgets(newWidgets);

			return {
				widgets: newWidgets,
			};
		});
	},

	deleteWidget: (widgetID, isActive) => {
		set(
			({
				slots,
				widgets,
				mode,
				activeInsightWidgetID,
				activeWidgetExplanationWidgetsIDS,
			}) => {
				const newSlots = { ...slots };
				const newWidgets = widgets.filter((el) => el.id !== widgetID);
				let newMode = mode;
				let newActiveInsightWidgetID = activeInsightWidgetID;
				let newActiveWidgetExplanationWidgetsIDS = [...activeWidgetExplanationWidgetsIDS];

				if (isActive) {
					if (isActiveSlotMultiple(newSlots.active, mode)) {
						const anotherWidgetInActiveSlot = newSlots.active.find(
							(el) => el.widgetId !== widgetID,
						);
						newSlots.active = [{ widgetId: anotherWidgetInActiveSlot.widgetId }];
						newSlots.aside = [...newSlots.aside, { widgetId: null }];
						newMode = VIEW_MODE.FULL;

						if (activeInsightWidgetID === widgetID) {
							newActiveInsightWidgetID = null;
						}

						if (!newActiveWidgetExplanationWidgetsIDS.includes(widgetID)) {
							newActiveWidgetExplanationWidgetsIDS =
								newActiveWidgetExplanationWidgetsIDS.filter(
									(el) => el !== widgetID,
								);
						} else {
							newActiveWidgetExplanationWidgetsIDS = [];
						}
						LocalStorageService.saveMode(newMode);
					} else {
						const [firstAsideSlot] = newSlots.aside;
						const newActiveSlot = { ...firstAsideSlot };
						const newAsideSlots = newSlots.aside
							.map((el, idx) => {
								if (idx === 0) {
									return {
										widgetId: null,
									};
								}

								return el;
							})
							.sort(sortByEmptyWidget);

						newSlots.active = [newActiveSlot];
						newSlots.aside = newAsideSlots;
					}
				} else {
					newSlots.aside = newSlots.aside
						.map((el) => {
							if (el.widgetId === widgetID) {
								return {
									widgetId: null,
								};
							}

							return el;
						})
						.sort(sortByEmptyWidget);

					newActiveInsightWidgetID = null;
					newActiveWidgetExplanationWidgetsIDS = [];
				}

				if (!newWidgets.length) {
					// when deleting last widget
					newSlots.aside = [...newSlots.aside, { widgetId: null }];
				}

				LocalStorageService.saveSlots(newSlots);
				LocalStorageService.saveWidgets(newWidgets);

				return {
					slots: newSlots,
					widgets: newWidgets,
					mode: newMode,
					activeWidgetExplanationWidgetsIDS: newActiveWidgetExplanationWidgetsIDS,
					activeInsightWidgetID: newActiveInsightWidgetID,
				};
			},
		);
	},

	changeToZoomView: (widget, isActive) => {
		set(({ slots, mode, activeInsightWidgetID, activeWidgetExplanationWidgetsIDS }) => {
			const newSlots = { ...slots };
			let newActiveInsightWidgetID = activeInsightWidgetID;
			let newActiveWidgetExplanationWidgetsIDS = [...activeWidgetExplanationWidgetsIDS];

			if (isActive && isActiveSlotMultiple(newSlots.active, mode)) {
				const anotherWidgetInActiveSlot = newSlots.active.find(
					(el) => el.widgetId !== widget.id,
				);
				newSlots.aside = [anotherWidgetInActiveSlot, ...newSlots.aside];
				newSlots.active = [{ widgetId: widget.id }];

				LocalStorageService.saveSlots(newSlots);
				LocalStorageService.saveMode(VIEW_MODE.FULL);

				if (activeInsightWidgetID !== widget.id) {
					newActiveInsightWidgetID = null;
				}

				if (newActiveWidgetExplanationWidgetsIDS.includes(widget.id)) {
					newActiveWidgetExplanationWidgetsIDS =
						newActiveWidgetExplanationWidgetsIDS.filter((el) => el === widget.id);
				} else {
					newActiveWidgetExplanationWidgetsIDS = [];
				}

				return {
					slots: newSlots,
					mode: VIEW_MODE.FULL,
					activeInsightWidgetID: newActiveInsightWidgetID,
					activeWidgetExplanationWidgetsIDS: newActiveWidgetExplanationWidgetsIDS,
				};
			}

			if (!isActive && isActiveSlotMultiple(newSlots.active, mode)) {
				const otherAsideSlots = newSlots.aside.filter((el) => el.widgetId !== widget.id);
				newSlots.aside = [...newSlots.active, ...otherAsideSlots];
				newSlots.active = [{ widgetId: widget.id }];

				LocalStorageService.saveSlots(newSlots);
				LocalStorageService.saveMode(VIEW_MODE.FULL);
				return {
					slots: newSlots,
					mode: VIEW_MODE.FULL,
					activeInsightWidgetID: null,
					activeWidgetExplanationWidgetsIDS: [],
				};
			}

			if (isActiveSlotEmpty(newSlots.active, mode)) {
				newSlots.active = [{ widgetId: widget.id }];
			} else {
				newSlots.aside = [
					{
						widgetId: newSlots.active[0].widgetId,
					},
					...newSlots.aside.filter((el) => el.widgetId !== widget.id),
				];

				newSlots.active = [{ widgetId: widget.id }];
			}

			LocalStorageService.saveSlots(newSlots);

			return {
				slots: newSlots,
				activeInsightWidgetID: null,
				activeWidgetExplanationWidgetsIDS: [],
			};
		});
	},

	changeToSplitView: (widget, isActive) => {
		set(({ slots }) => {
			const newSlots = { ...slots };

			if (isActive) {
				const [firstAsideSlot] = newSlots.aside;
				const newActiveSlot = [...newSlots.active, firstAsideSlot];
				const newAsideSlots = newSlots.aside
					.map((el, idx) => {
						if (idx === 0) {
							return {
								widgetId: null,
							};
						}

						return el;
					})
					.sort(sortByEmptyWidget)
					.slice(0, -1);

				newSlots.active = newActiveSlot;
				newSlots.aside = newAsideSlots;
			} else {
				newSlots.active = [...newSlots.active, { widgetId: widget.id }];
				newSlots.aside = newSlots.aside.filter((el) => el.widgetId !== widget.id);
			}

			LocalStorageService.saveSlots(newSlots);
			LocalStorageService.saveMode(VIEW_MODE.COMPARISON);

			return {
				slots: newSlots,
				mode: VIEW_MODE.COMPARISON,
			};
		});
	},

	minimizeWidget: (widget, isActive) => {
		set(({ slots, mode, activeInsightWidgetID, activeWidgetExplanationWidgetsIDS }) => {
			const newSlots = { ...slots };
			let newActiveInsightWidgetID = activeInsightWidgetID;
			let newActiveWidgetExplanationWidgetsIDS = [...activeWidgetExplanationWidgetsIDS];

			if (isActive && isActiveSlotMultiple(newSlots.active, mode)) {
				const anotherWidgetInActiveSlot = newSlots.active.find(
					(el) => el.widgetId !== widget.id,
				);
				newSlots.aside = [{ widgetId: widget.id }, ...newSlots.aside];
				newSlots.active = [{ widgetId: anotherWidgetInActiveSlot.widgetId }];

				if (activeInsightWidgetID === widget.id) {
					newActiveInsightWidgetID = null;
				}

				if (!newActiveWidgetExplanationWidgetsIDS.includes(widget.id)) {
					newActiveWidgetExplanationWidgetsIDS =
						newActiveWidgetExplanationWidgetsIDS.filter((el) => el !== widget.id);
				} else {
					newActiveWidgetExplanationWidgetsIDS = [];
				}

				LocalStorageService.saveSlots(newSlots);
				LocalStorageService.saveMode(VIEW_MODE.FULL);

				return {
					slots: newSlots,
					mode: VIEW_MODE.FULL,
					activeInsightWidgetID: newActiveInsightWidgetID,
					activeWidgetExplanationWidgetsIDS: newActiveWidgetExplanationWidgetsIDS,
				};
			} else {
				const firstAsideItem = newSlots.aside[0];
				newSlots.active = [{ widgetId: firstAsideItem.widgetId }];
				const filteredAsideItems = newSlots.aside.filter((el, idx) => idx !== 0);

				newSlots.aside = [{ widgetId: widget.id }, ...filteredAsideItems];
			}

			LocalStorageService.saveSlots(newSlots);

			return {
				slots: newSlots,
				activeInsightWidgetID: null,
				activeWidgetExplanationWidgetsIDS: [],
			};
		});
	},

	swapWidgetsInActiveSlot: () => {
		set(({ slots }) => {
			const newSlots = {
				...slots,
				active: slots.active.reverse(),
			};

			LocalStorageService.saveSlots(newSlots);

			return {
				slots: newSlots,
			};
		});
	},

	widgetModal: {
		open: false,
		mode: WIDGET_MODAL_MODE.CLOSE,
	},
	setWidgetModal: (open, mode) => {
		set(({ widgetModal }) => ({
			widgetModal: {
				open,
				mode: mode ?? widgetModal.mode,
			},
		}));
	},
	resetWidgetModal: () => {
		set(() => ({
			widgetModal: {
				open: false,
				mode: WIDGET_MODAL_MODE.CLOSE,
			},
		}));
	},

	widgetDeleteModalOpen: false,
	setWidgetDeleteModalOpen: (value) => {
		set(() => ({
			widgetDeleteModalOpen: value,
		}));
	},

	widgetModalActiveStepIndex: 0,
	setWidgetModalActiveStepIndex: (value) => {
		set(() => ({
			widgetModalActiveStepIndex: value,
		}));
	},

	widgetModalLastCompletedStepIndex: 0,
	setWidgetModalLastCompletedStepIndex: (value) => {
		set(() => ({
			widgetModalLastCompletedStepIndex: value,
		}));
	},

	resetWidgetModalProgress: () => {
		set(() => ({
			widgetModalActiveStepIndex: 0,
			widgetModalLastCompletedStepIndex: 0,
		}));
	},
}));
