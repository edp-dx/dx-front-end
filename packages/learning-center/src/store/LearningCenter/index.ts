import { create } from 'zustand';
import { LocalStorageService } from '~/services/learning-center';

import { LearningCenterStore } from './types';

export const useLearningCenterStore = create<LearningCenterStore>((set) => ({
	open: false,
	setOpen: (value) => {
		set(() => ({
			open: value,
		}));
	},
	filter: null,
	setFilter: (value) => {
		set(() => ({
			filter: value,
		}));
	},
	activeTabIdx: 0,
	setActiveTabIdx: (value) => {
		set(() => ({
			activeTabIdx: value,
		}));
	},
	favorites: LocalStorageService.getFavorites() ?? [],
	toggleFavorite: (value) => {
		set(({ favorites }) => {
			const alreadyExists = favorites.includes(value);
			let newFavorites = [...favorites];

			if (alreadyExists) {
				newFavorites = newFavorites.filter((id) => id !== value);
			} else {
				newFavorites = [...newFavorites, value];
			}

			LocalStorageService.saveFavorites(newFavorites);

			return { favorites: newFavorites };
		});
	},
}));
