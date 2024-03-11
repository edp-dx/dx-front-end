import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Drag = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 20 20'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				d='M1.66699 13.3333H18.3337V10.8333H1.66699V13.3333ZM10.0003 17.5L12.5003 15H7.50033L10.0003 17.5ZM1.66699 9.16667H18.3337V6.66667H1.66699V9.16667ZM10.0003 2.5L7.50033 5H12.5003L10.0003 2.5Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
