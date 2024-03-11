import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Dashboard = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 40 40'}
			fill={'currentColor'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				d='M5 18.3333H18.3333V5H5V18.3333ZM8.33333 8.33333H15V15H8.33333V8.33333Z'
				fill={'currentColor'}
			/>
			<path
				d='M21.6667 5V18.3333H35V5H21.6667ZM31.6667 15H25V8.33333H31.6667V15Z'
				fill={'currentColor'}
			/>
			<path
				d='M5 35H18.3333V21.6667H5V35ZM8.33333 25H15V31.6667H8.33333V25Z'
				fill={'currentColor'}
			/>
			<path
				d='M30 21.6667H26.6667V26.6667H21.6667V30H26.6667V35H30V30H35V26.6667H30V21.6667Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
