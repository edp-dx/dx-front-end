import React from 'react';
import { Table } from 'sharedReactComponents/Table';

import { TableProps } from '../../../../shared-react-components/src/components/Table/types';

export const SharedTable = (props: TableProps) => {
	return <Table {...props} />;
};
