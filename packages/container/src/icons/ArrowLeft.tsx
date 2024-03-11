import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const ArrowLeft = ({ width, height, color, ...props }: IconProps) => {
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
					d='M6.00698 2.75125C6.34798 2.41625 6.90298 2.41625 7.24398 2.75125C7.58598 3.08625 7.58598 3.62825 7.24398 3.96325L4.63398 6.50025H12.501C13.053 6.50025 13.501 6.94825 13.501 7.50025C13.501 8.05225 13.053 8.50025 12.501 8.50025H4.63398L7.24398 11.0372C7.58598 11.3722 7.58598 11.9143 7.24398 12.2483C7.07398 12.4163 6.84998 12.5002 6.62598 12.5002C6.40198 12.5002 6.17698 12.4163 6.00698 12.2483L1.75698 8.10625C1.41498 7.77125 1.41498 7.22825 1.75698 6.89425L6.00698 2.75125Z'
					fill={'currentColor'}
				/>
			</g>
			<defs>
				<clipPath id='clip0'>
					<rect width='16' height='16' fill='white' transform='translate(-0.5 -0.5)' />
				</clipPath>
			</defs>
		</SvgIcon>
	);
};
