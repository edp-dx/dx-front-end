import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const MagicWand = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 24 24'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				d='M4.49872 7.5L3.55872 5.44L1.49872 4.5L3.55872 3.56L4.49872 1.5L5.43872 3.56L7.49872 4.5L5.43872 5.44L4.49872 7.5Z'
				fill={'currentColor'}
			/>
			<path
				d='M15.9987 7.5L15.0587 5.44L12.9987 4.5L15.0587 3.56L15.9987 1.5L16.9387 3.56L18.9987 4.5L16.9387 5.44L15.9987 7.5Z'
				fill={'currentColor'}
			/>
			<path
				d='M4.49872 13L5.43872 15.06L7.49872 16L5.43872 16.94L4.49872 19L3.55872 16.94L1.49872 16L3.55872 15.06L4.49872 13Z'
				fill={'currentColor'}
			/>
			<path
				d='M6.78872 9.62L9.61872 6.79C9.81872 6.6 10.0687 6.5 10.3287 6.5C10.5887 6.5 10.8387 6.6 11.0387 6.79L22.2087 17.96C22.5987 18.35 22.5987 18.98 22.2087 19.37L19.3787 22.2C19.1787 22.4 18.9287 22.5 18.6687 22.5C18.4087 22.5 18.1587 22.4 17.9587 22.21L6.78872 11.04C6.39872 10.65 6.39872 10.01 6.78872 9.62ZM10.3287 8.92L8.91872 10.33L10.0887 11.5L11.4987 10.09L10.3287 8.92ZM18.6687 20.09L20.0787 18.68L12.9087 11.5L11.4987 12.91L18.6687 20.09Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
