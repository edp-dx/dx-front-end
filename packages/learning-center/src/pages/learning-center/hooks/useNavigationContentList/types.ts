import { ReactElement } from 'react';

export interface NavContentItem {
	component: ReactElement;
}

export interface UseNavigationContentListReturnType {
	list: NavContentItem[];
}
