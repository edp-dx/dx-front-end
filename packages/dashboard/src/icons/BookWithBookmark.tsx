import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const BookWithBookmark = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 24 24'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M7 5H9.1991C10.1896 5 11 5.81041 11 6.8009V20C11 20 10 17.991 7.4072 17.991H2.8009C1.81041 17.991 1 17.1806 1 16.1901V6.8009C1 5.81041 1.81041 5 2.8009 5H3V11L5 9L7 11V5ZM21.1991 5H14.8009C13.8104 5 13 5.81041 13 6.8009V20C13 20 14 17.991 16.5928 17.991H21.1991C22.1896 17.991 23 17.1806 23 16.1901V6.8009C23 5.81041 22.1896 5 21.1991 5ZM15 8.5C15 8.22386 15.2239 8 15.5 8H20.5C20.7761 8 21 8.22386 21 8.5C21 8.77614 20.7761 9 20.5 9H15.5C15.2239 9 15 8.77614 15 8.5ZM15 11.5C15 11.2239 15.2239 11 15.5 11H20.5C20.7761 11 21 11.2239 21 11.5C21 11.7761 20.7761 12 20.5 12H15.5C15.2239 12 15 11.7761 15 11.5ZM15.5 14C15.2239 14 15 14.2239 15 14.5C15 14.7761 15.2239 15 15.5 15H20.5C20.7761 15 21 14.7761 21 14.5C21 14.2239 20.7761 14 20.5 14H15.5Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
