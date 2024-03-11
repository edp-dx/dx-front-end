import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Minimize = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 16 16'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path d='M16 13H9V9H16V13ZM16 16H9V13H16V16Z' fill={'currentColor'} />
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8 8V15H1V1H15V8H8ZM16 0H0V16H9V9H16V0Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
