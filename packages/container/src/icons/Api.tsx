import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Api = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 40 40'}
			fill={'currentColor'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<g clipPath={color}>
				<path
					fill='#9C27B0'
					d='M21.667 21.667a2.35 2.35 0 0 1-3.334.016v-.016a2.344 2.344 0 0 1 0-3.317v-.017a2.344 2.344 0 0 1 3.317 0h.017a2.364 2.364 0 0 1 0 3.334ZM20 10l3.533 3.533L27.7 9.367l-5.333-5.334a3.34 3.34 0 0 0-4.717 0l-5.333 5.334 4.166 4.166L20 10ZM10 20l3.533-3.533L9.367 12.3l-5.334 5.333a3.34 3.34 0 0 0 0 4.717l5.334 5.333 4.166-4.166L10 20Zm20 0-3.533 3.533 4.166 4.167 5.334-5.333a3.34 3.34 0 0 0 0-4.717l-5.334-5.333-4.166 4.166L30 20ZM20 30l-3.533-3.533-4.167 4.166 5.333 5.334a3.34 3.34 0 0 0 4.717 0l5.333-5.334-4.166-4.166L20 30Z'
				/>
				<path
					fill='#fff'
					fillRule='evenodd'
					d='M20.303 8.697 9 20l11.303 11.303L31.607 20 20.303 8.697Zm.182 2.818L12 20l8.485 8.485L28.971 20l-8.486-8.485Z'
					clipRule='evenodd'
				/>
			</g>
			<defs>
				<clipPath id='a'>
					<path fill='#fff' d='M0 0h40v40H0z' />
				</clipPath>
			</defs>
		</SvgIcon>
	);
};
