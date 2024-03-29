import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const GridView = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 24 24'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				d='M14.67 5V11.5H9.33V5H14.67ZM15.67 11.5H21V5H15.67V11.5ZM14.67 19V12.5H9.33V19H14.67ZM15.67 12.5V19H21V12.5H15.67ZM8.33 12.5H3V19H8.33V12.5ZM8.33 11.5V5H3V11.5H8.33Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
