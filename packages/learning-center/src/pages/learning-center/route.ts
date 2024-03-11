import { PageRoute } from '~/types/common';

export const routeLearningCenter: PageRoute = {
	to: '/learning-center',
	name: 'Learning Center',
};

export const routeLearningCenterExact: PageRoute = {
	to: '/learning-center/:cardId',
	name: 'Learning Center',
};
