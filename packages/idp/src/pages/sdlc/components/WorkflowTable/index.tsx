import React, { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_APPLICATIONS } from '~/services/data/applications/requestKeys';
import { Workflow } from '~/services/data/workflows/model';
import { REQUEST_KEY_GET_WORKFLOWS_SDLC } from '~/services/data/workflows/requestKeys';
import { SharedTable } from '~/shared-components/Table';
import { TableEmptyList } from '~/shared-components/TableEmptyList';
import {
	MAIN_EMPTY_TEXTS,
	SECONDARY_EMPTY_TEXTS,
} from '~/shared-components/TableEmptyList/constants';
import { StyledTableWrapper } from '~/shared-styles';

import { WorkflowTableProps } from './types';
import { DEFAULT_TIMEOUT, getWorkflowColumns } from './utils';

export const WorkflowTable = ({ applicationsSearch }: WorkflowTableProps) => {
	const queryClient = useQueryClient();
	const [columns, setColumns] = useState([]);
	const { data: applicationsData } = useQuery(
		REQUEST_KEY_GET_APPLICATIONS,
		() => DataService.getApplications(),
		{
			staleTime: Infinity,
		},
	);

	const { isLoading, error, data } = useQuery(
		REQUEST_KEY_GET_WORKFLOWS_SDLC,
		() => DataService.getWorkflowsSDLC(),
		{
			staleTime: Infinity,
		},
	);

	useEffect(() => {
		setColumns(getWorkflowColumns(applicationsData));
	}, [applicationsData]);

	useEffect(() => {
		const refreshInterval = setInterval(async () => {
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_WORKFLOWS_SDLC],
			});
		}, DEFAULT_TIMEOUT);

		return () => {
			clearInterval(refreshInterval);
		};
	}, [queryClient]);

	const searchFunction = useCallback(
		(el: Workflow) => {
			const searchEntryLowerCase = applicationsSearch.toLowerCase();

			return el.appName.toLowerCase().includes(searchEntryLowerCase);
		},
		[applicationsSearch],
	);

	return (
		<StyledTableWrapper>
			<SharedTable
				data={data}
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
				defaultSortBy={'appName'}
			/>
		</StyledTableWrapper>
	);
};
