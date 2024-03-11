import React, { FC } from 'react';
import { PageContent as SharedPageContent } from 'sharedReactComponents/PageContent';

import { PageContentProps } from '../../../../shared-react-components/src/components/PageContent/types';

export const PageContent: FC<PageContentProps> = (props) => {
	return <SharedPageContent {...props} />;
};
