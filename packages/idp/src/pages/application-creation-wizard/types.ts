import { ReactElement } from 'react';

export interface Step {
	id: string;
	navLabel: string;
	title?: string | ReactElement;
	description?: string;
	component: ReactElement;
}
