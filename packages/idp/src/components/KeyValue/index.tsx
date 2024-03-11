import { Stack, Typography, useTheme } from '@mui/material';
import React, { FC, ReactElement } from 'react';

import { KeyValueProps } from './types';

export const KeyValue: FC<KeyValueProps> = ({ keyStr, valueStr, icon }): ReactElement => {
	const theme = useTheme();

	return (
		<>
			<Typography
				variant={'caption'}
				color={theme.palette.text.secondary}
				sx={{ mb: theme.typography.pxToRem(4) }}
				component={'p'}
			>
				{String(keyStr)}
			</Typography>
			<Stack
				spacing={2}
				direction={'row'}
				alignItems={'center'}
				justifyContent={'flex-start'}
			>
				{icon ? icon : null}
				{typeof valueStr === 'string' ? (
					<Typography
						variant={'body1'}
						color={theme.palette.text.primary}
						sx={{ wordBreak: 'break-word' }}
					>
						{String(valueStr)}
					</Typography>
				) : (
					valueStr
				)}
			</Stack>
		</>
	);
};
