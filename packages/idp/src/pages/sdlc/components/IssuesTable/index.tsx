import React, { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { DataService } from '~/services/data';
import { Issue } from '~/services/data/workflows/model';
import { REQUEST_KEY_GET_GEN_AI_ISSUES } from '~/services/data/workflows/requestKeys';
import { SharedTable } from '~/shared-components/Table';
import { TableEmptyList } from '~/shared-components/TableEmptyList';
import {
	MAIN_EMPTY_TEXTS,
	SECONDARY_EMPTY_TEXTS,
} from '~/shared-components/TableEmptyList/constants';
import { StyledTableWrapper } from '~/shared-styles';

import { IssuesTableProps } from './types';
import { DEFAULT_TIMEOUT, getIssuesColumns } from './utils';

export const IssuesTable = ({ applicationsSearch, statusesFilter }: IssuesTableProps) => {
	const queryClient = useQueryClient();
	const columns = getIssuesColumns();
	const [filteredData, setFilteredData] = useState([]);

	const { isLoading, error, data } = useQuery(
		REQUEST_KEY_GET_GEN_AI_ISSUES,
		() => DataService.getGenAiIssues(),
		{
			staleTime: Infinity,
		},
	);

	useEffect(() => {
		if (!data || !data.length) {
			return;
		}
		setFilteredData(
			statusesFilter.length
				? data.filter((item) => statusesFilter.includes(item.status))
				: data,
		);
	}, [data, statusesFilter]);

	useEffect(() => {
		const refreshInterval = setInterval(async () => {
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_GEN_AI_ISSUES],
			});
		}, DEFAULT_TIMEOUT);

		return () => {
			clearInterval(refreshInterval);
		};
	}, [queryClient]);

	const searchFunction = useCallback(
		(el: Issue) => {
			const searchEntryLowerCase = applicationsSearch.toLowerCase();

			return (
				el.appName.toLowerCase().includes(searchEntryLowerCase) ||
				el.jiraIssue.toLowerCase().includes(searchEntryLowerCase) ||
				el.title.toLowerCase().includes(searchEntryLowerCase) ||
				el.status.toLowerCase().includes(searchEntryLowerCase)
			);
		},
		[applicationsSearch],
	);

	return (
		<StyledTableWrapper>
			<SharedTable
				data={filteredData}
				isLoading={isLoading}
				error={error}
				columns={columns}
				searchFunction={searchFunction}
				emptyListComponent={
					<TableEmptyList
						mainText={MAIN_EMPTY_TEXTS.ISSUES}
						secondaryText={SECONDARY_EMPTY_TEXTS.ISSUES}
					/>
				}
				defaultSortBy={'jiraIssue'}
			/>
		</StyledTableWrapper>
	);
};
