import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const ArrowRight = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 15 13'}
			fill={'currentColor'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<g clipPath='url(#clip0)'>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M8.99302 2.75125C8.65202 2.41625 8.09702 2.41625 7.75602 2.75125C7.41402 3.08625 7.41402 3.62825 7.75602 3.96325L10.366 6.50025H2.49902C1.94702 6.50025 1.49902 6.94825 1.49902 7.50025C1.49902 8.05225 1.94702 8.50025 2.49902 8.50025H10.366L7.75602 11.0372C7.41402 11.3722 7.41402 11.9143 7.75602 12.2483C7.92602 12.4163 8.15002 12.5002 8.37402 12.5002C8.59802 12.5002 8.82302 12.4163 8.99302 12.2483L13.243 8.10625C13.585 7.77125 13.585 7.22825 13.243 6.89425L8.99302 2.75125Z'
					fill={'currentColor'}
				/>
			</g>
			<defs>
				<clipPath id='clip0'>
					<rect
						width='16'
						height='16'
						fill='white'
						transform='matrix(-1 0 0 1 15.5 -0.5)'
					/>
				</clipPath>
			</defs>
		</SvgIcon>
	);
};
