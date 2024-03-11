import CloseIcon from '@mui/icons-material/Close';
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControlLabel,
	IconButton,
	List,
	ListItem,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import React, { useCallback } from 'react';
import { ReactElement, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Drag } from '~/icons/Drag';

import { TableColumn } from '../Table/types';
import { TableSettingsProps } from './types';

export const TableSettings = ({
	open,
	onClose,
	columns,
	setColumns,
}: TableSettingsProps): ReactElement => {
	const theme = useTheme();

	const [_columns, _setColumns] = useState<TableColumn<never>[]>(columns);

	const handleSettingChecked = useCallback((columnId: number, checked: boolean) => {
		_setColumns((prev) =>
			prev.map((column) => {
				if (!(column.id === columnId)) {
					return column;
				}

				return {
					...column,
					show: checked,
				};
			}),
		);
	}, []);

	const handleApply = useCallback(() => {
		setColumns(_columns);
		onClose();
	}, [_columns, onClose, setColumns]);

	return (
		<Dialog
			open={open}
			onClose={onClose}
			sx={{ '& .MuiDialog-paper': { maxWidth: '406px' } }}
			fullWidth
		>
			<DialogTitle>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					spacing={4}
				>
					<Typography variant={'h4'}>Table Settings</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Stack>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<List>
					<ReactSortable
						list={_columns}
						setList={_setColumns}
						filter={(a, b) => b.getAttribute('data-disabled') === 'true'}
					>
						{_columns.map((column) => {
							return (
								<ListItem
									key={column.id}
									sx={{
										borderRadius: theme.shape.borderRadius,
										border: '1px solid transparent',

										'&[draggable=true]': {
											border: `1px dashed ${theme.palette.action.active}`,
										},
									}}
									data-disabled={!column.customizable}
								>
									<Stack
										direction={'row'}
										alignItems={'center'}
										justifyContent={'space-between'}
										spacing={4}
										width={'100%'}
									>
										<FormControlLabel
											control={
												<Checkbox
													defaultChecked={
														column.show === undefined
															? true
															: column.show === true
													}
													onChange={(e) => {
														handleSettingChecked(
															column.id,
															e.target.checked,
														);
													}}
													disabled={!column.customizable}
												/>
											}
											label={column.label}
										/>
										{column.customizable && (
											<Drag
												width={theme.typography.pxToRem(17)}
												height={theme.typography.pxToRem(15)}
												color={theme.palette.action.active}
											/>
										)}
									</Stack>
								</ListItem>
							);
						})}
					</ReactSortable>
				</List>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'center', mb: theme.typography.pxToRem(8) }}>
				<Button size={'large'} variant={'contained'} onClick={handleApply}>
					Apply
				</Button>
			</DialogActions>
		</Dialog>
	);
};
