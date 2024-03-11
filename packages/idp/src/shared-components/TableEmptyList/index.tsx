import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';

import { MAIN_EMPTY_TEXTS, SECONDARY_EMPTY_TEXTS } from './constants';
import { TableEmptyListProps } from './types';

export const TableEmptyList = ({
	children,
	mainText = MAIN_EMPTY_TEXTS.APPLICATIONS,
	secondaryText = SECONDARY_EMPTY_TEXTS.APPLICATIONS,
}: TableEmptyListProps): ReactElement => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				width: '100%',
				p: theme.typography.pxToRem(40),
			}}
		>
			<Box
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				sx={{
					padding: `${theme.typography.pxToRem(32)} ${theme.typography.pxToRem(
						32,
					)} ${theme.typography.pxToRem(24)}`,
					maxWidth: theme.typography.pxToRem(600),
					width: '100%',
					border: `1px dashed ${theme.palette.divider}`,
					borderRadius: theme.shape.borderRadius,
				}}
			>
				<Box sx={{ mb: theme.typography.pxToRem(16) }}>
					<WarningAmberOutlinedIcon color={'primary'} />
				</Box>
				<Stack
					direction={'row'}
					alignItems={'center'}
					sx={{ mb: theme.typography.pxToRem(8) }}
					spacing={1}
				>
					<Typography variant={'body1'} color={theme.palette.text.primary}>
						{mainText}
					</Typography>
					{children}
				</Stack>
				<Typography variant={'body2'} color={theme.palette.text.secondary}>
					{secondaryText}
				</Typography>
			</Box>
		</Box>
	);
};
