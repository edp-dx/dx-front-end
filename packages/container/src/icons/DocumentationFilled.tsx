import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/../../../dashboard/src/types/common';

export const DocumentationFilled = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 24 24'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				d='M10 10C9.72386 10 9.5 10.2239 9.5 10.5C9.5 10.7761 9.72386 11 10 11H18C18.2761 11 18.5 10.7761 18.5 10.5C18.5 10.2239 18.2761 10 18 10H10Z'
				fill={'currentColor'}
			/>
			<path
				d='M9.5 12.5C9.5 12.2239 9.72386 12 10 12H18C18.2761 12 18.5 12.2239 18.5 12.5C18.5 12.7761 18.2761 13 18 13H10C9.72386 13 9.5 12.7761 9.5 12.5Z'
				fill={'currentColor'}
			/>
			<path
				d='M10 14C9.72386 14 9.5 14.2239 9.5 14.5C9.5 14.7761 9.72386 15 10 15H14C14.2761 15 14.5 14.7761 14.5 14.5C14.5 14.2239 14.2761 14 14 14H10Z'
				fill={'currentColor'}
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M16 1H8C6.9 1 6.01 1.9 6.01 3L6 18C6 19.1 6.89 20 7.99 20H17V21H5V6H6V4H5C3.9 4 3.01 4.9 3.01 6L3 21C3 22.1 3.89 23 4.99 23H17C18.1 23 19 22.1 19 21V20H20C21.1 20 22 19.1 22 18V7L16 1ZM20 8V18H8V3H15V8H20Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
