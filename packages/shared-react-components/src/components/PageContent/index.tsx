import React, { FC } from 'react';

import { StyledPageContent } from './styles';
import { PageContentProps } from './types';

export const PageContent: FC<PageContentProps> = ({ children }) => {
	return <StyledPageContent>{children}</StyledPageContent>;
};
