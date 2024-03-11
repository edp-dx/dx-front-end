import React from 'react';

interface TableModal<T> {
	open: boolean;
	onClose: () => void;
	data: T;
}

export interface TableCellProps<T> {
	name: string;
	document?: string;
	prLink?: string;
	data: T;
	shouldDisplayDocument?: boolean;
	shouldDisplayPrLink?: boolean;
	modal: React.FC<TableModal<T>>;
	maxWidth?: string;
}
