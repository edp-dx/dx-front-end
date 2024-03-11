import AddIcon from '@mui/icons-material/Add';
import { Box, Stack, useTheme } from '@mui/material';
import Button from '@mui/material/Button/Button';
import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { Search } from '~/components/Search';
import { routeScaffolding } from '~/pages/scaffolding/route';
import { DataService } from '~/services/data';
import { EnvManagement } from '~/services/data/envManagement/model';
import { REQUEST_KEY_GET_ENV_MANAGEMENT_LIST } from '~/services/data/envManagement/requestKeys';
import { SharedTable } from '~/shared-components/Table';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

import { EmptyList } from '../../../../../../components/EmptyList';
import { useColumns } from '../../../../hooks/useColumns';
import { CreateEnvManagement } from './components/CreateEnvManagement';
import { StyledTableWrapper } from './styles';

export const EnvironmentManagement = () => {
	const theme = useTheme();
	const { LOBSelection } = useCreateConfigurationScaffoldingStore();

	const { error, data, isFetching } = useQuery(REQUEST_KEY_GET_ENV_MANAGEMENT_LIST, () =>
		DataService.getEnvManagementList(LOBSelection.uuid),
	);

	const [applicationsSearch, setApplicationsSearch] = useState<string>('');
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const handleModalOpen = useCallback(() => {
		setModalVisible(true);
	}, []);

	const handleModalClose = useCallback(() => {
		setModalVisible(false);
	}, []);

	const columns = useColumns();

	const searchFunction = useCallback(
		(el: EnvManagement) => {
			const searchEntryLowerCase = applicationsSearch.toLowerCase();

			return (
				el.name.toLowerCase().includes(searchEntryLowerCase) ||
				el.description.toLowerCase().includes(searchEntryLowerCase) ||
				el.classification.toLowerCase().includes(searchEntryLowerCase)
			);
		},
		[applicationsSearch],
	);

	return (
		<>
			<CreateEnvManagement open={modalVisible} onClose={handleModalClose} />
			<Box sx={{ p: theme.typography.pxToRem(16) }}>
				<Stack spacing={4} direction={'row'} gap={theme.typography.pxToRem(20)}>
					<Box width={'100%'} maxWidth={theme.typography.pxToRem(500)}>
						<Search setSearch={setApplicationsSearch} />
					</Box>
					<Stack spacing={4} direction={'row'} sx={{ ml: 'auto !important' }}>
						<Button
							variant='contained'
							startIcon={<AddIcon />}
							onClick={() => handleModalOpen()}
						>
							Environment
						</Button>
					</Stack>
				</Stack>
			</Box>
			<StyledTableWrapper>
				<SharedTable
					data={data}
					isLoading={isFetching}
					error={error}
					columns={columns}
					searchFunction={searchFunction}
					emptyListComponent={
						<EmptyList
							title={'There are no Environments here.'}
							link={routeScaffolding.to}
							linkText={'Click to add new Environment'}
							description={'(You’ll be provided with the Environment Creation Form)'}
							handleModalOpen={handleModalOpen}
						/>
					}
					defaultSortBy={'name'}
				/>
			</StyledTableWrapper>
		</>
	);
};
