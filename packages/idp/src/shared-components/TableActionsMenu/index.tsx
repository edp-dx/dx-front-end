import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, ListItemText, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { TableActionsMenuProps } from './types';

export const TableActionsMenu = ({ actions }: TableActionsMenuProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isMenuDisabled, setIsMenuDisabled] = useState(false);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		setIsMenuDisabled(actions?.every((action) => action.disabled));
	}, [actions]);

	return (
		<>
			<Box display={'flex'} justifyContent={'center'}>
				<IconButton onClick={handleClick} disabled={isMenuDisabled}>
					<MoreVertIcon color={isMenuDisabled ? 'disabled' : 'primary'} />
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
						<MenuItem
							key={key}
							onClick={() => {
								onClick?.();
								handleClose();
							}}
							disabled={disabled}
						>
							<ListItemText>{label}</ListItemText>
						</MenuItem>
					);
				})}
			</Menu>
		</>
	);
};
