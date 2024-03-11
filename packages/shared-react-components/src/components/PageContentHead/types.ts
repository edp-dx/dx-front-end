import { ReactElement } from 'react';
import { Breadcrumb } from '~/types/common';

export interface PageContentHeadProps {
	breadcrumbs?: Breadcrumb[];
	title?: string;
	rightContent?: ReactElement;
	handleBookmarkClick?: () => void;
}
