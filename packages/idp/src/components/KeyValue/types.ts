import { ReactElement } from 'react';

export interface KeyValueProps {
	keyStr: string | number;
	valueStr: string | number | ReactElement;
	icon?: ReactElement;
}
