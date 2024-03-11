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

export interface TableColumn<T> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	id: any;
	label: string;
	columnSortableValuePath?: string | string[];
	render: (data: T) => ReactElement | string | number;
	show?: boolean;
	customizable?: boolean;
	textAlign?: TableCellProps['align'];
	width?: string;
}
