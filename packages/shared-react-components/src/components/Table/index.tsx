import {
	Box,
	ButtonBase,
	CircularProgress,
	Table as MuiTable,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
	useTheme,
} from '@mui/material';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useData } from '~/components/Table/hooks/useData';
import { StyledTableWrapper } from '~/components/Table/styles';
import { ArrowUpDown } from '~/icons/ArrowUpDown';
import { ValueOf } from '~/types/common';

import { SORT_ORDERS } from './constants';
import { TableColumn, TableProps } from './types';

export const Table = ({
	data,
	columns,
	isLoading = false,
	error,
	defaultSortBy = 'name',
	defaultSortOrder = SORT_ORDERS['DESC'],
	emptyListComponent,
	searchFunction,
	onRowClick,
	isSelected,
}: TableProps) => {
	const theme = useTheme();
	const [columnSortableValuePath, setColumnSortableValuePath] = useState<string | string[]>(
		defaultSortBy,
	);
	const [sortOrder, setSortOrder] = useState<ValueOf<typeof SORT_ORDERS>>(defaultSortOrder);
	const [sortBy, setSortBy] = useState<string>(defaultSortBy);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleRequestSort = (column: TableColumn<any>) => {
		const isDesc = sortBy === column.id && sortOrder === SORT_ORDERS['DESC'];
		const isAsc = sortBy === column.id && sortOrder === SORT_ORDERS['ASC'];
		setSortOrder(
			isDesc ? SORT_ORDERS['ASC'] : isAsc ? SORT_ORDERS['UNSET'] : SORT_ORDERS['DESC'],
		);
		setSortBy(column.id);
		setColumnSortableValuePath(column.columnSortableValuePath);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	useEffect(() => {
		setPage(0);
	}, [searchFunction]);

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const readyData = useData({
		data,
		isLoading,
		error,
		searchFunction,
		sortOrder,
		columnSortableValuePath,
	});

	const [selectedRowIndex, setSelectedRowIndex] = useState<number>(null);

	const selectableRowProps = (row: any, idx: number) =>
		onRowClick
			? {
					hover: true,
					role: 'radio',
					'aria-checked': selectedRowIndex === idx,
					selected: isSelected ? isSelected(row) : selectedRowIndex === idx,
					tabIndex: -1,
					onClick: (event: MouseEvent<HTMLTableRowElement>) => {
						setSelectedRowIndex(idx);
						onRowClick(event, row);
					},
			  }
			: {};

	return (
		<StyledTableWrapper>
			<MuiTable aria-label='simple table'>
				<colgroup>
					{columns.map(
						(column) =>
							column.show !== false && (
								<col key={column.id} width={column.width || '100%'} />
							),
					)}
				</colgroup>
				<TableHead>
					<TableRow>
						{columns.map((column) => {
							const activeColumnSort = sortBy === column.id;
							const upperArrowFillColor =
								activeColumnSort && sortOrder === SORT_ORDERS['DESC']
									? theme.palette.action.disabledBackground
									: theme.palette.action.active;
							const bottomArrowFillColor =
								activeColumnSort && sortOrder === SORT_ORDERS['ASC']
									? theme.palette.action.disabledBackground
									: theme.palette.action.active;

							return column.show !== false ? (
								<TableCell
									key={column.id}
									sortDirection={sortBy === column.id ? sortOrder : false}
									align={column.textAlign || 'left'}
								>
									{column.columnSortableValuePath ? (
										<ButtonBase
											onClick={() => handleRequestSort(column)}
											sx={{ p: 0 }}
											disableRipple
										>
											<ArrowUpDown
												upperArrowFill={upperArrowFillColor}
												bottomArrowFill={bottomArrowFillColor}
												width={theme.typography.pxToRem(18)}
												height={theme.typography.pxToRem(18)}
											/>
										</ButtonBase>
									) : null}
									{column.label}
								</TableCell>
							) : null;
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{error ? (
						<TableRow>
							<TableCell colSpan={columns.length} align={'center'}>
								<Typography color={'error'} variant={'h6'}>
									{error.toString()}
								</Typography>
							</TableCell>
						</TableRow>
					) : isLoading ? (
						<TableRow>
							<TableCell colSpan={columns.length} align={'center'}>
								<CircularProgress />
							</TableCell>
						</TableRow>
					) : readyData?.length ? (
						readyData
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((item, idx: number) => (
								<TableRow
									key={`table-row-${idx}`}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									{...selectableRowProps(item, idx)}
								>
									{columns.map((column) => {
										return column.show !== false ? (
											<TableCell
												key={column.id}
												component='th'
												scope='row'
												align={column.textAlign || 'left'}
											>
												<Box
													sx={{
														pl: column.columnSortableValuePath
															? theme.typography.pxToRem(6)
															: 0,
													}}
												>
													{column.render(item)}
												</Box>
											</TableCell>
										) : null;
									})}
								</TableRow>
							))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} align={'center'}>
								<>{emptyListComponent}</>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</MuiTable>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component='div'
				count={readyData?.length || 0}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</StyledTableWrapper>
	);
};
