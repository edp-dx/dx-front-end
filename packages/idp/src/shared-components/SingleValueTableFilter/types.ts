export interface SingleValueFilterItem<T> {
	label: string;
	value: T;
}

export interface SingleValueTableFilterProps<T> {
	items: Array<SingleValueFilterItem<T>>;
	selectedValues: Array<T>;
	onValueSelect: (value: T) => void;
}
