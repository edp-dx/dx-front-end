import { Layers } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Container, Stack, useTheme } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { IssueStatus } from '~/services/data/workflows/model';
import { ApplicationsTabs } from '~/shared-components/ApplicationsTabs';
import { PageContent } from '~/shared-components/PageContent';
import { PageContentHead } from '~/shared-components/PageContentHead';
import { Search } from '~/shared-components/Search';
import { SingleValueTableFilter } from '~/shared-components/SingleValueTableFilter';

import { AddWorkflow } from './components/AddWorkflow';
import { IssuesTable } from './components/IssuesTable';
import { WorkflowTable } from './components/WorkflowTable';
import { routeSDLC } from './route';
import { SDLCTabsValues } from './types';
import { getIssueStatusFilterItems } from './utils';

export const ApplicationsSDLC = () => {
	const theme = useTheme();
	const [applicationsSearch, setApplicationsSearch] = useState<string>('');
	const [currentTab, setCurrentTab] = useState(SDLCTabsValues.All);
	const [selectedIssueStatuses, setSelectedIssueStatuses] = useState([]);

	const handleTabChange = useCallback((value: SDLCTabsValues) => {
		setCurrentTab(value);
	}, []);

	const tabs = useMemo(
		() => [
			{
				value: SDLCTabsValues.All,
				label: 'All',
				content: <WorkflowTable applicationsSearch={applicationsSearch} />,
			},
			{
				value: SDLCTabsValues.Issues,
				label: 'Issues',
				content: (
					<IssuesTable
						applicationsSearch={applicationsSearch}
						statusesFilter={selectedIssueStatuses}
					/>
				),
			},
		],
		[applicationsSearch, selectedIssueStatuses],
	);

	const handleFilterValueSelect = useCallback((value: IssueStatus) => {
		setSelectedIssueStatuses((prev) => {
			const index = prev.findIndex((item) => item === value);
			if (index === -1) {
				return [...prev, value];
			}
			return [...prev.slice(0, index), ...prev.slice(index + 1)];
		});
	}, []);

	const filterItems = getIssueStatusFilterItems();

	return (
		<>
			<PageContentHead
				title={'Development Workflow Management'}
				breadcrumbs={[
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
						label: 'IDP: Applications',
						disabled: true,
						exact: true,
					},
					{
						route: routeSDLC.to,
						icon: (
							<Layers
								color='action'
								sx={{
									width: theme.typography.pxToRem(16),
									height: theme.typography.pxToRem(16),
								}}
							/>
						),
						label: 'AI-Empowered SDLC',
						exact: true,
					},
				]}
			/>
			<PageContent>
				<Container maxWidth={'lg'}>
					<Box sx={{ p: theme.typography.pxToRem(16) }}>
						<Stack
							spacing={4}
							direction={'row'}
							alignItems={'center'}
							justifyContent='space-between'
						>
							<Search setSearch={setApplicationsSearch} />
							<AddWorkflow />
						</Stack>
					</Box>
					<ApplicationsTabs
						tabs={tabs}
						onTabChange={handleTabChange}
						currentValue={currentTab}
						controls={
							currentTab === SDLCTabsValues.Issues ? (
								<SingleValueTableFilter
									items={filterItems}
									selectedValues={selectedIssueStatuses}
									onValueSelect={handleFilterValueSelect}
								/>
							) : null
						}
					/>
				</Container>
			</PageContent>
		</>
	);
};
