import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Full = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 16 17'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				d='M0 8.33301H16V0.333008H0V8.33301ZM0 16.333H16V8.33301H0V16.333Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
