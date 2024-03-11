import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, IconButton, ListItemText, Menu, MenuItem, useTheme } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { SingleValueTableFilterProps } from './types';

export function SingleValueTableFilter<T>({
	items,
	selectedValues,
	onValueSelect,
}: SingleValueTableFilterProps<T>) {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const handleMenuItemClick = useCallback(
		(event: React.MouseEvent<HTMLLIElement, MouseEvent>, value: T) => {
			onValueSelect(value);
			handleClose();
		},
		[onValueSelect, handleClose],
	);

	return (
		<>
			<Box display={'flex'} justifyContent={'center'}>
				<IconButton onClick={handleClick}>
					<FilterListIcon
						sx={{
							color: anchorEl
								? theme.palette.primary.light
								: theme.palette.action.active,
						}}
					/>
				</IconButton>
			</Box>
			<Menu
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				{items.map(({ label, value }, idx) => {
					const key = `${label}::${idx}`;
					return (
						<MenuItem
							key={key}
							onClick={(event) => handleMenuItemClick(event, value)}
							selected={selectedValues.includes(value)}
						>
							<ListItemText>{label}</ListItemText>
						</MenuItem>
					);
				})}
			</Menu>
		</>
	);
}
