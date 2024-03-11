import { Link, Tooltip, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useModalContext } from '../../providers/ModalProvider';
import { TableCellProps } from './types';

export const TableCell: FC<TableCellProps> = ({ data }) => {
	const { handleViewTemplatesManagementOpen } = useModalContext();

	return (
		<Tooltip title={data.name} placement={'top'} arrow followCursor>
			<Link
				href={'#'}
				underline={'none'}
				onClick={() => handleViewTemplatesManagementOpen({ data })}
			>
				<Typography variant={'body1'}>{data.name}</Typography>
			</Link>
		</Tooltip>
	);
};
