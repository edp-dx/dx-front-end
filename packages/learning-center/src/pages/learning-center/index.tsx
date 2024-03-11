import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Stack, useTheme } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Logo } from '~/icons/Logo';
import { PageContent } from '~/shared-components/PageContent';
import { PageContentHead } from '~/shared-components/PageContentHead';
import { useLearningCenterStore } from '~/store/LearningCenter';

import { list as gettingStartedList } from './components/GettingStarted/list';
import { NavContent } from './components/NavContent';
import { NavTabs } from './components/NavTabs';
import { Search } from './components/Search';
import { SearchList } from './components/SearchList';
import { TemplateUseCases } from './components/TemplateUseCases';
import { list as useCasesList } from './components/UseCases/list';
import { StyledContainer, StyledContentInner, StyledNav } from './styles';
import { RouterParams } from './types';

export const LearningCenterApp = () => {
	const theme = useTheme();
	const { cardId } = useParams<RouterParams>();
	const { filter } = useLearningCenterStore();

	const list = [...useCasesList, ...gettingStartedList];
	const currentCard = list.find((item) => item.id === Number(cardId));

	const defaultBreadcrumbs = [
		{
			icon: (
				<HomeIcon
					sx={{
						width: theme.typography.pxToRem(16),
						height: theme.typography.pxToRem(16),
					}}
				/>
			),
			route: '/',
			exact: true,
		},
		{
			icon: (
				<HelpIcon
					sx={{
						width: theme.typography.pxToRem(16),
						height: theme.typography.pxToRem(16),
					}}
				/>
			),
			label: 'Help',
			disabled: true,
		},
		{
			route: '',
			icon: (
				<Logo
					sx={{
						width: theme.typography.pxToRem(16),
						height: theme.typography.pxToRem(16),
					}}
				/>
			),
			label: 'Learning Center',
			exact: true,
		},
	];

	return (
		<>
			<PageContentHead
				breadcrumbs={defaultBreadcrumbs}
				rightContent={
					!cardId && (
						<Box display={'flex'} justifyContent={'flex-end'}>
							<Search iconColor={theme.palette.action.disabled} />
						</Box>
					)
				}
			/>
			<PageContent>
				<StyledContainer maxWidth='lg'>
					<Stack direction={'row'} width={'100%'} spacing={4} pb={4}>
						<StyledNav>
							<NavTabs currentCard={currentCard} />
						</StyledNav>
						<StyledContentInner>
							{cardId ? (
								<TemplateUseCases currentCard={currentCard} />
							) : filter ? (
								<SearchList />
							) : (
								<NavContent />
							)}
						</StyledContentInner>
					</Stack>
				</StyledContainer>
			</PageContent>
		</>
	);
};
