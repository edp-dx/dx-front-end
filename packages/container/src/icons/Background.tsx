import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Background = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 940 64'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<mask
				id='a'
				width='940'
				height='64'
				x='0'
				y='0'
				maskUnits='userSpaceOnUse'
				style={{ maskType: 'alpha' }}
			>
				<path
					fill='#fff'
					d='M6.267 64h927.466c3.461 0 6.267-.537 6.267-1.2V0H0v62.8c0 .663 2.806 1.2 6.267 1.2Z'
				/>
			</mask>
			<g mask='url(#a)'>
				<path
					stroke='#9E9E9E'
					d='M1.044.2h937.911v62.6c0 .552-2.338 1-5.222 1H6.267c-2.885 0-5.223-.448-5.223-1V.2Z'
					clipRule='evenodd'
				/>
				<path fill='#42A5F5' d='M940 64H0V0h940v64Z' />
				<path
					fill='url(#b)'
					fillRule='evenodd'
					d='M1006.49 39.093C849.987 57.139 708.818 54.905 582.986 32.39c-90.003 9.812-174.898 10.293-254.685 1.445C187.138 21.31 76.919 18.33-2.357 24.901V-5.851h949.78l59.067 44.944Z'
					clipRule='evenodd'
				/>
				<path
					fill='url(#c)'
					fillRule='evenodd'
					d='M-74.582 20.8C85.573 41.4 230.034 38.85 358.8 13.15c92.101 11.2 178.976 11.75 260.624 1.65C763.877.5 876.667-2.9 957.791 4.6v-35.103H-14.134L-74.582 20.8Z'
					clipRule='evenodd'
				/>
			</g>
			<defs>
				<linearGradient
					id='b'
					x1='422.534'
					x2='422.534'
					y1='96.453'
					y2='10.828'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#fff' />
					<stop offset='1' stopColor='#fff' stopOpacity='0' />
				</linearGradient>
				<linearGradient
					id='c'
					x1='522.994'
					x2='522.994'
					y1='86.276'
					y2='-11.464'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#fff' />
					<stop offset='1' stopColor='#fff' stopOpacity='0' />
				</linearGradient>
			</defs>
		</SvgIcon>
	);
};
