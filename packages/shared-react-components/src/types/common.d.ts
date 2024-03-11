import { ReactElement } from 'react';

export interface IconProps {
	color?: string;
	width?: string;
	height?: string;
	[key: string]: unknown;
}

export interface PageRoute {
	to: string;
	name: string;
}

export interface Breadcrumb {
	icon?: ReactElement;
	label?: string;
	route?: string;
	disabled?: boolean;
	exact?: boolean;
}

type FormValues<FormNames> = Record<keyof FormNames, any>;

type ValueOf<T> = T[keyof T];
