import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const WindowExpand = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 24 24'}
			fill={'currentColor'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M19 19H12H5V5H19V12V19ZM20 4H4V20H13H20V13V4Z'
				fill={'currentColor'}
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M18 12H12V18H18V12Z'
				fill={'currentColor'}
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M6.50001 7L6.50001 11.5C6.50001 11.7761 6.72387 12 7.00001 12C7.27615 12 7.50001 11.7761 7.50001 11.5V8.20711L12 12.7071V12H12.7072L8.20712 7.5L11.5 7.5C11.7762 7.5 12 7.27614 12 7C12 6.72386 11.7762 6.5 11.5 6.5H7.00001C6.72387 6.5 6.50001 6.72386 6.50001 7Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
