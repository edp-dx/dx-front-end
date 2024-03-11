import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Hat = ({ width, height, color, ...props }: IconProps) => {
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
				d='M20.0001 5L1.66675 15L8.33341 18.6333V28.6333L20.0001 35L31.6667 28.6333V18.6333L35.0001 16.8167V28.3333H38.3334V15L20.0001 5ZM31.3667 15L20.0001 21.2L8.63341 15L20.0001 8.8L31.3667 15ZM28.3334 26.65L20.0001 31.2L11.6667 26.65V20.45L20.0001 25L28.3334 20.45V26.65Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
