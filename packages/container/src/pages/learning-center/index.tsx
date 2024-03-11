import { mount } from 'learningCenter/LearningCenterApp';
import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Page } from '~/components/Layout/Page';

import { StyledAppRoot } from './styles';

export const LearningCenterApp = () => {
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
		});

		history.listen(onParentNavigate);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Page documentTitle={'Learning Center'}>
			<StyledAppRoot ref={ref} />
		</Page>
	);
};
