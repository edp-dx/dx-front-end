import { VIEW_MODE } from '~/store/Dashboard/constants';
import { Slots, Widget } from '~/store/Dashboard/types';
import { ValueOf } from '~/types/common';

export const LOCAL_STORAGE_KEY_DASHBOARD_WIDGETS = 'dx_dashboard_widgets';
export const LOCAL_STORAGE_KEY_DASHBOARD_SLOTS = 'dx_dashboard_slots';
export const LOCAL_STORAGE_KEY_DASHBOARD_MODE = 'dx_dashboard_mode';

export const LocalStorageService = {
	getSlots: () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DASHBOARD_SLOTS)),
	getWidgets: () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DASHBOARD_WIDGETS)),
	getMode: () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DASHBOARD_MODE)),

	saveSlots: (slots: Slots) =>
		localStorage.setItem(LOCAL_STORAGE_KEY_DASHBOARD_SLOTS, JSON.stringify(slots)),
	saveWidgets: (widgets: Widget[]) =>
		localStorage.setItem(LOCAL_STORAGE_KEY_DASHBOARD_WIDGETS, JSON.stringify(widgets)),
	saveMode: (mode: ValueOf<typeof VIEW_MODE>) =>
		localStorage.setItem(LOCAL_STORAGE_KEY_DASHBOARD_MODE, JSON.stringify(mode)),
};
