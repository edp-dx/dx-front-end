import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const DigitalPlatform = ({ width, height, color, ...props }: IconProps) => {
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
				fillRule='evenodd'
				clipRule='evenodd'
				d='M32.9166 11.2755L22.2222 3.75V7.3307L29.4109 12.2632L22.2222 17.1995L22.2334 20.7736L32.9166 13.25V11.2755ZM7.08334 20.2982L19.9882 29.2614L32.9166 20.2965V16.7324L19.9886 25.6932L7.08334 16.7316V20.2982ZM7.08334 27.2775L19.9882 36.25L32.9166 27.2665V23.6988L19.9886 32.6818L7.08334 23.7089V27.2775ZM7.08325 11.2671L17.7547 3.75775V7.33862L10.577 12.2631L17.7547 17.1916V20.7735L7.08325 13.2583V11.2671Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
