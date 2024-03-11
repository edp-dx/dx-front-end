import { create } from 'zustand';
import { headerMenuList } from '~/components/Layout/Header/constants';
import { HeaderStore } from '~/store/Header/types';

export const useHeaderStore = create<HeaderStore>((set) => ({
	menuAnchors: {
		[headerMenuList.PROFILE_MENU]: null,
		[headerMenuList.HELP_MENU]: null,
		[headerMenuList.APPLICATIONS_MENU]: null,
	},
	setMenuAnchors: (value) => {
		set(() => ({
			menuAnchors: {
				...value,
			},
		}));
	},
}));
