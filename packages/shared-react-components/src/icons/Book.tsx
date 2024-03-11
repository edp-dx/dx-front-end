import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Book = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 24 24'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				d='M17 2H18.1991C19.1896 2 20 2.81041 20 3.8009V17C20 17.5523 19.5523 18 19 18H7.17513C7.03359 18.0062 6.89741 18.0155 6.76645 18.0274C6.32682 18.1326 6 18.5281 6 19C6 19.5523 6.44772 20 7 20H19C19.5523 20 20 20.4477 20 21C20 21.5523 19.5523 22 19 22H7C5.34315 22 4 20.6569 4 19V3.8009C4 2.81041 4.81041 2 5.8009 2H11H17Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
