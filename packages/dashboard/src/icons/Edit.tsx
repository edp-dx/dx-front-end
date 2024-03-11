import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Edit = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 19 19'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				d='M0.998047 15.2505V19.0005H4.74805L15.808 7.94055L12.058 4.19055L0.998047 15.2505ZM18.708 5.04055C19.098 4.65055 19.098 4.02055 18.708 3.63055L16.368 1.29055C15.978 0.900547 15.348 0.900547 14.958 1.29055L13.128 3.12055L16.878 6.87055L18.708 5.04055Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
