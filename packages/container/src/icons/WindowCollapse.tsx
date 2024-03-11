import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const WindowCollapse = ({ width, height, color, ...props }: IconProps) => {
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
				d='M11.6465 6.64661L11.6465 11.1466C11.6465 11.4227 11.4227 11.6466 11.1465 11.6466L6.64653 11.6466C6.37039 11.6466 6.14653 11.4228 6.14653 11.1466C6.14653 10.8705 6.37039 10.6466 6.64653 10.6466L9.93943 10.6466L5.29298 6.00016L5 6L5 5L6 5L6.00009 5.29306L10.6465 9.9395L10.6465 6.64661C10.6465 6.37047 10.8704 6.14661 11.1465 6.14661C11.4227 6.14661 11.6465 6.37047 11.6465 6.64661Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
