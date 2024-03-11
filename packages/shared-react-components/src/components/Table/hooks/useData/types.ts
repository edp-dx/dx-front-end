import { ValueOf } from '~/types/common';

import { SORT_ORDERS } from '../../constants';

export interface UseDataProps {
	data: any[];
	searchFunction: (el: any) => boolean;
	sortOrder: ValueOf<typeof SORT_ORDERS>;
	columnSortableValuePath?: string | string[];
	isLoading: boolean;
	error: unknown;
}
