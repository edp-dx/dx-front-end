import { ReactElement } from 'react';

export interface BreadcrumbProps {
	icon?: ReactElement;
	label?: string;
	route?: string;
	disabled?: boolean;
	exact?: boolean;
}
