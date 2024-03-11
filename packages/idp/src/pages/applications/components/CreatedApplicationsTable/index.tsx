import { Typography, useTheme } from '@mui/material';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { routeApplicationCreateWizard } from '~/pages/application-creation-wizard/route';
import { Application } from '~/services/data/applications/model';
import { SharedTable } from '~/shared-components/Table';
import { StyledTableWrapper } from '~/shared-styles';

import { TableEmptyList } from '../../../../shared-components/TableEmptyList';
import { CreatedApplicationsTableProps } from './types';

export const CreatedApplicationsTable = ({
	applicationsSearch,
	columns,
	isLoading,
	error,
	data,
}: CreatedApplicationsTableProps) => {
	const theme = useTheme();
	const searchFunction = useCallback(
		(el: Application) => {
			const searchEntryLowerCase = applicationsSearch.toLowerCase();

			return (
				el.application.name.toLowerCase().includes(searchEntryLowerCase) ||
				el.application.details.template.language
					.toLowerCase()
					.includes(searchEntryLowerCase) ||
				el.application.details.template.buildTool
					.toLowerCase()
					.includes(searchEntryLowerCase) ||
				el.application.details.template.framework
					.toLowerCase()
					.includes(searchEntryLowerCase) ||
				el.application.details.template.deploymentPlatform
					.toLowerCase()
					.includes(searchEntryLowerCase) ||
				el.application.details.template.name.toLowerCase().includes(searchEntryLowerCase) ||
				String(el.application.details.template.categoryID)
					.toLowerCase()
					.includes(searchEntryLowerCase)
			);
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
					<TableEmptyList>
						<Link
							to={routeApplicationCreateWizard.to}
							style={{ color: theme.palette.primary.main }}
						>
							<Typography>Click to Add New App</Typography>
						</Link>
					</TableEmptyList>
				}
				defaultSortBy={'name'}
			/>
		</StyledTableWrapper>
	);
};
