import { headerMenuList } from '~/components/Layout/Header/constants';
import { ValueOf } from '~/types/common';

export interface HeaderStore {
	menuAnchors: Partial<{
		[V in ValueOf<typeof headerMenuList>]: HTMLButtonElement;
	}>;
	setMenuAnchors: (value: HeaderStore['menuAnchors']) => void;
}
