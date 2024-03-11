import React from 'react';

import { TableColumn } from '../Table/types';

export interface TableSettingsProps {
	columns: TableColumn<never>[];
	setColumns: React.Dispatch<React.SetStateAction<TableColumn<never>[]>>;
	open: boolean;
	onClose: () => void;
}
