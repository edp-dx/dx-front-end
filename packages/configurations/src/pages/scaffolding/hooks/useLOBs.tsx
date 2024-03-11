import { useMemo } from 'react';
import { v4 } from 'uuid';
import { LOB } from '~/services/data/LOB/model';

export const useLOBs = (): LOB[] => {
	return useMemo(
		() => [
			{
				uuid: v4(),
				name: 'Claim',
			},
			{
				uuid: v4(),
				name: 'Underwriting',
			},
			{
				uuid: v4(),
				name: 'Policy',
			},
			{
				uuid: v4(),
				name: 'Reinsurance',
			},
			{
				uuid: v4(),
				name: 'Digital Platform',
			},
			{
				uuid: v4(),
				name: 'Bonds',
			},
		],
		[],
	);
};
