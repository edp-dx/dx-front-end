import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const ListView = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 24 24'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path d='M4 16H11V14H4V16ZM4 19H11V17H4V19ZM4 13H11V11H4V13Z' fill={'currentColor'} />
			<path
				d='M13 16H20V14H13V16ZM13 19H20V17H13V19ZM13 13H20V11H13V13Z'
				fill={'currentColor'}
			/>
			<path d='M4 5V9H20V5H4Z' fill={'currentColor'} />
		</SvgIcon>
	);
};
