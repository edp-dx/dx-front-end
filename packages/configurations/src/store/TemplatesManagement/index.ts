import { create } from 'zustand';

import { TemplatesManagementStore } from './types';

export const useTemplatesManagementStore = create<TemplatesManagementStore>((set) => ({
	templatesManagementTab: 0,
	setTemplatesManagementTab(value) {
		set(() => ({
			templatesManagementTab: value,
		}));
	},
	templateCategory: null,
	setTemplateCategory(value) {
		set(() => ({
			templateCategory: value,
		}));
	},
}));
