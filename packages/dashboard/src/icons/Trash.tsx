import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Trash = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 15 19'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				d='M1.05078 16.333C1.05078 17.433 1.95078 18.333 3.05078 18.333H11.0508C12.1508 18.333 13.0508 17.433 13.0508 16.333V4.33301H1.05078V16.333ZM14.0508 1.33301H10.5508L9.55078 0.333008H4.55078L3.55078 1.33301H0.0507812V3.33301H14.0508V1.33301Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
