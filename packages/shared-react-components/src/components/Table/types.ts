import { TableCellProps } from '@mui/material/TableCell/TableCell';
import { MouseEvent, ReactElement } from 'react';
import { ValueOf } from '~/types/common';

import { SORT_ORDERS } from './constants';

export interface TableProps {
	isLoading: boolean;
	error?: unknown;
	data: any[];
	columns: readonly TableColumn<any>[];
	defaultSortBy?: string;
	defaultSortOrder?: ValueOf<typeof SORT_ORDERS>;
	emptyListComponent?: ReactElement;
	onRowClick?: (event: MouseEvent<HTMLTableRowElement>, row: any) => void;
	searchFunction?: (filteredElement: never) => boolean;
	isSelected?: (row: any) => boolean;
}

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
