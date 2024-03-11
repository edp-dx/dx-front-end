import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '~/types/common';

export const Bulb = ({ width, height, color, ...props }: IconProps) => {
	return (
		<SvgIcon
			viewBox={'0 0 15 20'}
			width={width}
			height={height}
			sx={{ width, height, color, display: 'block' }}
			{...props}
		>
			<path
				d='M3.66071 13.6629C1.47321 12.3973 0 10.0312 0 7.32143C0 3.27902 3.27902 0 7.32143 0C11.3638 0 14.6429 3.27902 14.6429 7.32143C14.6429 10.0312 13.1696 12.3973 10.9821 13.6629V16.25C10.9821 16.6451 10.6629 16.9643 10.2679 16.9643H4.375C3.97991 16.9643 3.66071 16.6451 3.66071 16.25V13.6629ZM4.64286 18.3929H10C10.0982 18.3929 10.1786 18.4732 10.1786 18.5714V19.2857C10.1786 19.6808 9.85938 20 9.46429 20H5.17857C4.78348 20 4.46429 19.6808 4.46429 19.2857V18.5714C4.46429 18.4732 4.54464 18.3929 4.64286 18.3929Z'
				fill={'currentColor'}
			/>
		</SvgIcon>
	);
};
