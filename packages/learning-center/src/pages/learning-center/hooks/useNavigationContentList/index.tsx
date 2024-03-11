import React from 'react';

import { Academy } from '../../components/Academy';
import { GettingStarted } from '../../components/GettingStarted';
import { MyFavorite } from '../../components/MyFavorite';
import { UseCases } from '../../components/UseCases';
import { NavContentItem, UseNavigationContentListReturnType } from './types';

export const useNavigationContentList = (): UseNavigationContentListReturnType => {
	const list: NavContentItem[] = [
		{
			component: <GettingStarted />,
		},
		{
			component: <UseCases />,
		},
		{
			component: <MyFavorite />,
		},
		{
			component: <>component 4</>,
		},
		{
			component: <>component 5</>,
		},
		{
			component: <>component 6</>,
		},
		{
			component: <>component 7</>,
		},
		{
			component: <>component 8</>,
		},
		{
			component: <>component 9</>,
		},
		{
			component: <Academy />,
		},
	];

	return { list };
};
