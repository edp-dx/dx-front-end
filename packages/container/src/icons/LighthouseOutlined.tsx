import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const LighthouseOutlined = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 24 24'}
			fill={'currentColor'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<g clipPath='url(#a)'>
				<path
					fill={'currentColor'}
					fillRule='evenodd'
					d='m11.168 2.445-2 3a1 1 0 0 0-.16.423L8.725 8H8l-.117.007A1 1 0 0 0 8 10h.458l-1.45 10.868A1 1 0 0 0 8 22h8a1 1 0 0 0 .991-1.132L15.542 10H16l.117-.007A1 1 0 0 0 16 8h-.725l-.284-2.132a1 1 0 0 0-.159-.423l-2-3a1 1 0 0 0-1.664 0ZM13.258 8l-.219-1.639L12 4.803l-1.04 1.558L10.741 8h2.517Zm-2.783 2L9.142 20h5.715l-1.333-10h-3.05ZM2.293 6.293a1 1 0 0 1 1.32-.083l.094.083 2 2a1 1 0 0 1 .083 1.32l-.083.094-2 2a1 1 0 0 1-1.497-1.32l.083-.094L3.585 9 2.293 7.707a1 1 0 0 1-.083-1.32l.083-.094Zm19.414 0a1 1 0 0 0-1.414 0l-2 2-.083.094a1 1 0 0 0 .083 1.32l2 2 .094.083a1 1 0 0 0 1.32-.083l.083-.094a1 1 0 0 0-.083-1.32L20.415 9l1.292-1.293.083-.094a1 1 0 0 0-.083-1.32Z'
					clipRule='evenodd'
				/>
			</g>
			<defs>
				<clipPath id='a'>
					<path fill='transparent' d='M0 0h24v24H0z' />
				</clipPath>
			</defs>
		</SvgIcon>
	);
};
