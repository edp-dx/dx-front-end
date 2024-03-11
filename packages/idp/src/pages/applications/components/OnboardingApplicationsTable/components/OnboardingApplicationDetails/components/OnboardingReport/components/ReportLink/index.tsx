import { Link } from '@mui/material';
import React from 'react';
import { DEFAULT_EMPTY_VALUE, isPresent } from '~/pages/applications/utils';

export const ReportLink = ({ value }: { value?: string }) => {
	if (isPresent(value)) {
		return (
			<Link href={value} target='_blank'>
				{value}
			</Link>
		);
	}
	return <>{DEFAULT_EMPTY_VALUE}</>;
};
