import React, { ReactElement } from 'react';

import { StyledTourStep } from './styles';

export const TourStep = ({ children }: { children: ReactElement }): ReactElement => {
	return <StyledTourStep>{children}</StyledTourStep>;
};
