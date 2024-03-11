import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

interface ArrowUpDownIconProps extends IconProps {
	upperArrowFill: string;
	bottomArrowFill: string;
}

export const ArrowUpDown = ({
	upperArrowFill,
	bottomArrowFill,
	width,
	height,
	color,
	...props
}: ArrowUpDownIconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 18 18'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path d='M5.25 6L9 2.25L12.75 6H5.25Z' fill={upperArrowFill} />
			<path d='M5.25 12L9 15.75L12.75 12H5.25Z' fill={bottomArrowFill} />
		</SvgIcon>
	);
};
