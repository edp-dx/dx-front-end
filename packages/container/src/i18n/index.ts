import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import allResources from './resources.json';

export const addTranslations = (resources: Resource) => {
	const extendedResources = Object.deepExtend(resources, allResources);
	i18n.use(initReactI18next).init({
		resources: extendedResources,
		lng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});
};

export default i18n;
