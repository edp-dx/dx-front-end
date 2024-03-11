import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Notification = ({ width, height, color, ...props }: IconProps) => {
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
				d='M28.3333 5C24.6514 5 21.6666 7.98477 21.6666 11.6667C21.6666 15.3486 24.6514 18.3333 28.3333 18.3333C32.0152 18.3333 35 15.3486 35 11.6667C35 7.98477 32.0152 5 28.3333 5ZM28.3333 8.33333C30.1742 8.33333 31.6666 9.82572 31.6666 11.6667C31.6666 13.5076 30.1742 15 28.3333 15C26.4923 15 25 13.5076 25 11.6667C25 9.82572 26.4923 8.33333 28.3333 8.33333ZM18.3333 10C18.3333 9.07952 17.5871 8.33333 16.6666 8.33333H11.6666L11.3728 8.34182C8.74816 8.4939 6.66663 10.6705 6.66663 13.3333V28.3333L6.67511 28.6271C6.82719 31.2518 9.00382 33.3333 11.6666 33.3333H26.6666L26.9604 33.3248C29.5851 33.1728 31.6666 30.9961 31.6666 28.3333V23.3333L31.6554 23.139C31.5591 22.3101 30.8547 21.6667 30 21.6667C29.0795 21.6667 28.3333 22.4129 28.3333 23.3333V28.3333L28.3221 28.5277C28.2258 29.3566 27.5214 30 26.6666 30H11.6666L11.4723 29.9888C10.6434 29.8925 9.99996 29.1881 9.99996 28.3333V13.3333L10.0112 13.139C10.1074 12.3101 10.8119 11.6667 11.6666 11.6667H16.6666L16.861 11.6555C17.6899 11.5592 18.3333 10.8547 18.3333 10Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};