import React, { ReactElement } from 'react';
import { AppRoutes } from '~/routes';
import '~/utils/deepExtend';

export default function App(): ReactElement {
	return (
		<>
			<AppRoutes />
		</>
	);
}
