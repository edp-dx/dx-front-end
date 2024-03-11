import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Half = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 16 17'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				d='M16 8.33301H9V0.333008H16V8.33301ZM16 16.333H9V8.33301H16V16.333Z'
				fill={'currentColor'}
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8 1.33301V15.333H1V1.33301H8ZM9 0.333008H0V16.333H9V0.333008Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
