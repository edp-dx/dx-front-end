import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Flag = ({ width, height, color, ...props }: IconProps) => {
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
				fill={'currentColor'}
				d='M17.0148 10.5057C18.6837 10.5221 20.4186 10.5391 22.0003 9.12686L17.8744 2.00024C16.3493 3.41236 14.6456 3.39545 12.9938 3.37905C10.9894 3.35915 9.06145 3.34001 7.62204 5.87612L11.6229 13.0027C13.0622 10.4668 14.99 10.4858 17.0148 10.5057ZM2.12087 5.12576L10.8729 21.3794C11.2479 22.0046 11.9981 22.1296 12.6232 21.8796C13.2484 21.5045 13.3734 20.7543 13.1234 20.1292L4.37138 3.87547C3.99629 3.25033 3.24612 3.1253 2.62098 3.37536C1.99584 3.75044 1.87081 4.50061 2.12087 5.12576Z'
			/>
		</SvgIcon>
	);
};
