import React, { FC, ReactElement, useEffect } from 'react';

import { Footer } from '../Footer';
import { Header } from '../Header';
import { headerNavLinks } from '../Header/links';
import { Main } from '../Main';
import { PageProps } from './types';

export const Page: FC<PageProps> = ({ documentTitle, children }): ReactElement => {
	useEffect(() => {
		document.title = documentTitle;
	}, [documentTitle]);

	return (
		<>
			<Header navLinks={headerNavLinks} />
			<Main>
				<>{children}</>
			</Main>
			<Footer />
		</>
	);
};
