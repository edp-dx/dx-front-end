import React, { FC } from 'react';
import { PageContentHead as SharedPageContentHead } from 'sharedReactComponents/PageContentHead';

import { PageContentHeadProps } from '../../../../shared-react-components/src/components/PageContentHead/types';

export const PageContentHead: FC<PageContentHeadProps> = (props) => {
	return <SharedPageContentHead {...props} />;
};
