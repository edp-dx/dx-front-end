import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Chat = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 33 33'}
			fill={'currentColor'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				fill={'currentColor'}
				d='M21.666 14.652V8.428c0-.66-.264-1.294-.735-1.76a2.52 2.52 0 0 0-1.774-.73H7.868a2.52 2.52 0 0 0-1.773.73c-.47.466-.735 1.1-.736 1.76v6.224c0 .66.265 1.293.736 1.76a2.52 2.52 0 0 0 1.773.73v2.11a.374.374 0 0 0 .21.339.382.382 0 0 0 .399-.036l3.244-2.413h7.436a2.52 2.52 0 0 0 1.776-.728 2.485 2.485 0 0 0 .733-1.762Zm3.764-2.49h-2.51v2.49a3.727 3.727 0 0 1-1.104 2.639 3.784 3.784 0 0 1-2.659 1.096h-6.272v2.49c0 .66.265 1.294.735 1.76a2.52 2.52 0 0 0 1.774.73h4.923l3.246 2.416a.382.382 0 0 0 .553-.104.375.375 0 0 0 .055-.2v-2.113h1.255a2.52 2.52 0 0 0 1.775-.728c.47-.467.736-1.1.736-1.76v-6.226c0-.66-.264-1.294-.735-1.76a2.52 2.52 0 0 0-1.774-.73h.002Z'
			/>
		</SvgIcon>
	);
};
