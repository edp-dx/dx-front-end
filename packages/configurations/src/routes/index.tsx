import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import { routesList } from './list';

export const AppRoutes = (): ReactElement => {
	return (
		<React.Suspense fallback='Loading'>
			<Switch>
				{routesList.map(({ to, component, exact = false }, idx) => {
					const key = `${to}::${idx}`;

					return (
						<Route path={to as string} exact={exact} component={component} key={key} />
					);
				})}
			</Switch>
		</React.Suspense>
	);
};
