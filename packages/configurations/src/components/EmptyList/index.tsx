import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { EmptyListProps } from './types';

export const EmptyList: FC<EmptyListProps> = (props) => {
	const { handleModalOpen, title, description, linkText, link } = props;
	const theme = useTheme();

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				width: '100%',
			}}
		>
			<Box
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				sx={{
					padding: `${theme.typography.pxToRem(32)} ${theme.typography.pxToRem(
						27,
					)} ${theme.typography.pxToRem(24)}`,
					maxWidth: theme.typography.pxToRem(640),
					width: '100%',
					border: `1px dashed ${theme.palette.divider}`,
					borderRadius: theme.typography.pxToRem(4),
				}}
			>
				<Box sx={{ mb: theme.typography.pxToRem(16) }}>
					<WarningAmberOutlinedIcon color={'primary'} />
				</Box>
				<Stack
					direction={'row'}
					alignItems={'center'}
					justifyContent={'center'}
					flexWrap={'wrap'}
					gap={1}
					sx={{ mb: theme.typography.pxToRem(8) }}
				>
					<Typography variant={'body1'} color={theme.palette.text.primary}>
						{title}
					</Typography>
					<Link
						to={link}
						onClick={handleModalOpen}
						style={{ color: theme.palette.primary.main }}
					>
						<Typography>{linkText}</Typography>
					</Link>
				</Stack>

				<Typography
					textAlign={'center'}
					variant={'body2'}
					color={theme.palette.text.secondary}
					px={12.5}
				>
					{description}
				</Typography>
			</Box>
		</Box>
	);
};
