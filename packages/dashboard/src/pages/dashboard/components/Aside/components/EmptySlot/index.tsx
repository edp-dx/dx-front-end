import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material';
import React, { FC, ReactElement } from 'react';

import { StyledButton, StyledEmptySlot } from './styles';
import { EmptySlotProps } from './types';

export const EmptySlot: FC<EmptySlotProps> = ({ handleOpen }): ReactElement => {
	const theme = useTheme();

	return (
		<StyledEmptySlot>
			<StyledButton onClick={handleOpen}>
				<AddIcon
					sx={{
						color: theme.palette.primary.main,
						width: theme.typography.pxToRem(35),
						height: theme.typography.pxToRem(35),
					}}
				/>
			</StyledButton>
		</StyledEmptySlot>
	);
};
