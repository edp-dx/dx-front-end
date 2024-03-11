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

type ValueOf<T> = T[keyof T];
