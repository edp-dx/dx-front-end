export type FIELD = 'select' | 'text';

export interface Option {
	id: number;
	name: string;
	available: boolean;
}

export interface Param {
	id: number;
	name: string;
	type: FIELD;
	placeholder?: string;
	options: Option[];
}

export interface Widget {
	id: number;
	name: string;
	available: boolean;
	params: Param[];
}

export interface DataSource {
	id: number;
	name: string;
	available: boolean;
	widgets: Widget[];
}

export interface Source {
	id: number;
	name: string;
	dataSources: DataSource[];
}
