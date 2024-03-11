import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Subtract = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 28 8'}
			fill={'currentColor'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				fill={'currentColor'}
				fillRule='evenodd'
				d='M27.994.012c.05.45-.2.925-.725 1.2l-11.3 5.875c-.5.275-1.1.4-1.7.4-.6 0-1.2-.125-1.7-.4l-11.3-5.875C.744.937.519.462.544-.013c-.025-.45.2-.925.725-1.2l11.3-5.875c.5-.275 1.1-.4 1.7-.4.6 0 1.2.125 1.7.4l11.3 5.9c.525.275.775.725.725 1.2Z'
				clipRule='evenodd'
			/>
		</SvgIcon>
	);
};
