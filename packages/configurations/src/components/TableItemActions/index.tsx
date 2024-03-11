import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, ListItemText, Menu, MenuItem } from '@mui/material';
import React, { FC, ReactElement } from 'react';

import { TableItemActionsProps } from './types';

export const TableItemActions: FC<TableItemActionsProps> = ({ actions }): ReactElement => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Box display={'flex'} justifyContent={'center'}>
				<IconButton onClick={handleClick}>
					<MoreVertIcon color={'primary'} />
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
				{actions.map(({ label, onClick, disabled }, idx) => {
					const key = `${label}::${idx}`;

					return (
						<MenuItem key={key} onClick={onClick} disabled={disabled}>
							<ListItemText>{label}</ListItemText>
						</MenuItem>
					);
				})}
			</Menu>
		</>
	);
};
