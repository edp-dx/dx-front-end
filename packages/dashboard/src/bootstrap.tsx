import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { InitialEntry, MemoryHistory, createBrowserHistory, createMemoryHistory } from 'history';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router-dom';
import { theme } from '~/theme';
import { globalStyles } from '~/theme/globalStyles';

import App from './App';

export const muiCache = createCache({
	key: 'mui',
	prepend: true,
});

const queryClient = new QueryClient();

interface MountProps {
	onNavigate?: () => void;
	defaultHistory: MemoryHistory;
	initialPath?: InitialEntry;
}

export const mount = (el: Element, { onNavigate, defaultHistory, initialPath }: MountProps) => {
	const history =
		defaultHistory ||
		createMemoryHistory({
			initialEntries: [initialPath],
		});

	if (onNavigate) {
		history.listen(onNavigate);
	}

	createRoot(el).render(
		<CacheProvider value={muiCache}>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<Router history={history}>
						<GlobalStyles styles={globalStyles} />
						<CssBaseline />
						<App />
					</Router>
				</QueryClientProvider>
			</ThemeProvider>
		</CacheProvider>,
	);

	return {
		onParentNavigate: ({ pathname: nextPathname }: Location) => {
			const {
				location: { pathname },
			} = history;

			if (pathname !== nextPathname) {
				history.push(nextPathname);
			}
		},
	};
};

if (process.env.NODE_ENV === 'development') {
	const devRoot = document.querySelector('#_dashboard-dev-root');
	const browserHistory = createBrowserHistory() as MemoryHistory;

	if (devRoot) {
		mount(devRoot, { defaultHistory: browserHistory });
	}
}
