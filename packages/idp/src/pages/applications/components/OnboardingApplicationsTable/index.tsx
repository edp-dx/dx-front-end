import React, { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_APPLICATIONS } from '~/services/data/applications/requestKeys';
import { StepStatus, Workflow } from '~/services/data/workflows/model';
import { REQUEST_KEY_GET_WORKFLOWS } from '~/services/data/workflows/requestKeys';
import { SharedTable } from '~/shared-components/Table';
import { StyledTableWrapper } from '~/shared-styles';

import { TableEmptyList } from '../../../../shared-components/TableEmptyList';
import { DEFAULT_TIMEOUT } from '../../utils';
import { OnboardingApplicationsTableProps } from './types';

export const OnboardingApplicationsTable = ({
	applicationsSearch,
	columns,
}: OnboardingApplicationsTableProps) => {
	const queryClient = useQueryClient();
	const [completedSecondStepsCount, setCompletedSecondStepsCount] = useState(0);

	const { isLoading, error, data } = useQuery(
		REQUEST_KEY_GET_WORKFLOWS,
		() => DataService.getWorkflows(),
		{
			staleTime: Infinity,
		},
	);

	const refreshApplications = useCallback(async () => {
		await queryClient.invalidateQueries({
			queryKey: [REQUEST_KEY_GET_APPLICATIONS],
		});
	}, [queryClient]);

	useEffect(() => {
		const refreshInterval = setInterval(async () => {
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_WORKFLOWS],
			});
		}, DEFAULT_TIMEOUT);

		return () => {
			clearInterval(refreshInterval);
		};
	}, [queryClient]);

	/** Applications data needs to be refreshed after 2nd step of any workflow is completed. */
	useEffect(() => {
		if (data && data.length) {
			setCompletedSecondStepsCount(
				data.filter(
					({ steps }) =>
						steps && steps.length >= 2 && steps[1].status === StepStatus.Finished,
				).length,
			);
		}
	}, [data]);

	useEffect(() => {
		if (completedSecondStepsCount > 0) {
			refreshApplications();
		}
	}, [completedSecondStepsCount, refreshApplications]);

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
				emptyListComponent={<TableEmptyList />}
				defaultSortBy={'appName'}
			/>
		</StyledTableWrapper>
	);
};
