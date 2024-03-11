import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { globalStyles } from '~/theme/globalStyles';

import { App } from './App';
import { theme } from './theme';

export const muiCache = createCache({
	key: 'mui',
	prepend: true,
});

const queryClient = new QueryClient();

const root = createRoot(document.querySelector('#root'));
root.render(
	<CacheProvider value={muiCache}>
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<GlobalStyles styles={globalStyles} />
					<CssBaseline />
					<App />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	</CacheProvider>,
);
