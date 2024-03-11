import { ReactElement } from 'react';

export interface NavItem {
	icon?: ReactElement;
	name: string | 'divider';
	label?: string;
	disabled?: boolean;
}

export interface UseNavigationListReturnType {
	list: NavItem[];
}
