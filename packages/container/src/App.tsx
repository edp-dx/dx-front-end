import React, { ReactElement } from 'react';
import { ChatBot } from '~/components/Other/ChatBot';
import '~/i18n';
import '~/utils/deepExtend';

import { LearningCenter } from './components/Other/LearningCenter';
import { AppRoutes } from './routes';

export const App = (): ReactElement => {
	return (
		<>
			<AppRoutes />
			<ChatBot />

			<LearningCenter />
		</>
	);
};
