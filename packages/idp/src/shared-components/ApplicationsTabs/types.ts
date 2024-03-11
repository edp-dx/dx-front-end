import { ReactNode } from 'react';

export type TabChangeHandler = (value: number) => void;

export interface ApplicationsTab {
	value: number;
	label: string;
	content: ReactNode;
}

export interface ApplicationsTabsProps {
	tabs: Array<ApplicationsTab>;
	onTabChange: TabChangeHandler;
	currentValue: number;
	controls?: ReactNode;
}
