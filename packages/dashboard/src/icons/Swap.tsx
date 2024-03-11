import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Swap = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 18 14'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				d='M3.99 6L0 10L3.99 14V11H11V9H3.99V6ZM18 4L14.01 0V3H7V5H14.01V8L18 4Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
