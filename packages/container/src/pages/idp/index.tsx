import { mount } from 'idp/IDPApp';
import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Page } from '~/components/Layout/Page';
import { addTranslations } from '~/i18n';

import { StyledAppRoot } from './styles';

export const IDPApp = () => {
	const history = useHistory();
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const { onParentNavigate } = mount(ref.current, {
			initialPath: history.location.pathname,
			onNavigate: ({ pathname: nextPathname }: Location) => {
				const {
					location: { pathname },
				} = history;

				if (pathname !== nextPathname) {
					history.push(nextPathname);
				}
			},
			addTranslations: addTranslations,
		});

		history.listen(onParentNavigate);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Page documentTitle={'IDP | Manage Applications'}>
			<StyledAppRoot ref={ref} />
		</Page>
	);
};
