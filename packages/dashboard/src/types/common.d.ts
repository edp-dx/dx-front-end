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

export interface SelectOption {
	label: JSX.Element;
	value: string;
	disabled?: boolean;
}

type FormValues<FormNames> = Record<keyof FormNames, any>;

type ValueOf<T> = T[keyof T];
