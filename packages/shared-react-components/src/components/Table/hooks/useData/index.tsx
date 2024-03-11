import _get from 'lodash.get';
import { useMemo } from 'react';
import { UseDataProps } from '~/components/Table/hooks/useData/types';

import { SORT_ORDERS } from '../../constants';

export const useData = ({
	data,
	searchFunction,
	columnSortableValuePath,
	sortOrder,
	isLoading,
	error,
}: UseDataProps) => {
	return useMemo(() => {
		if (!data || isLoading || error) {
			return;
		}

		let result = [...data];

		if (searchFunction) {
			result = result.filter(searchFunction);
		}

		if (columnSortableValuePath) {
			result = result.sort((a, b) => {
				const aProperty = _get(a, columnSortableValuePath)?.toString().toLowerCase() || '';
				const bProperty = _get(b, columnSortableValuePath)?.toString().toLowerCase() || '';

				if (sortOrder === SORT_ORDERS['DESC']) {
					return aProperty < bProperty ? -1 : 1;
				} else if (sortOrder === SORT_ORDERS['ASC']) {
					return aProperty > bProperty ? -1 : 1;
				} else {
					return 0;
				}
			});
		}

		return result;
	}, [columnSortableValuePath, data, error, isLoading, searchFunction, sortOrder]);
};
