export const LOCAL_STORAGE_KEY_LEARNING_CENTER_FAVORITES = 'dx_learning_center_favorites';

export const LocalStorageService = {
	getFavorites: () =>
		JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LEARNING_CENTER_FAVORITES)),
	saveFavorites: (favorites: number[]) =>
		localStorage.setItem(
			LOCAL_STORAGE_KEY_LEARNING_CENTER_FAVORITES,
			JSON.stringify(favorites),
		),
};
