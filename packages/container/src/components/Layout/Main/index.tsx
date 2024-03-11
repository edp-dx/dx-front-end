import React from 'react';
import { ReactElement } from 'react';
import { StyledMain } from '~/components/Layout/Main/styles';
import { MainProps } from '~/components/Layout/Main/types';

export const Main = ({ children }: MainProps): ReactElement => {
	return <StyledMain id={'main'}>{children}</StyledMain>;
};
