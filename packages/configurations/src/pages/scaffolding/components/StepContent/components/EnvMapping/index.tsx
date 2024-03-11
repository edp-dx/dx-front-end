import AddIcon from '@mui/icons-material/Add';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button/Button';
import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { Search } from '~/components/Search';
import { useMappingColumns } from '~/pages/scaffolding/hooks/useMappingColumns';
import { routeScaffolding } from '~/pages/scaffolding/route';
import { DataService } from '~/services/data';
import { EnvMapping } from '~/services/data/envMapping/model';
import { REQUEST_KEY_GET_ENV_MAPPING_LIST } from '~/services/data/envMapping/requestKeys';
import { SharedTable } from '~/shared-components/Table';
import { useCreateConfigurationScaffoldingStore } from '~/store/CreateConfigurationScaffolding';

import { EmptyList } from '../../../../../../components/EmptyList';
import { EnvMappingModalForm } from './components/EnvMappingModalForm';
import { StyledTableWrapper } from './styles';

export const EnvironmentMapping = () => {
	const theme = useTheme();
	const { LOBSelection } = useCreateConfigurationScaffoldingStore();

	const { error, data, isFetching } = useQuery(REQUEST_KEY_GET_ENV_MAPPING_LIST, () =>
		DataService.getEnvMappingList(LOBSelection.uuid),
	);

	const [applicationsSearch, setApplicationsSearch] = useState<string>('');
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const handleModalOpen = useCallback(() => {
		setModalVisible(true);
	}, []);

	const handleModalClose = useCallback(() => {
		setModalVisible(false);
	}, []);

	const columns = useMappingColumns();

	const searchFunction = useCallback(
		(el: EnvMapping) => {
			const searchEntryLowerCase = applicationsSearch.toLowerCase();

			return (
				el.env?.name.toLowerCase().includes(searchEntryLowerCase) ||
				el.awsEnv?.label.toLowerCase().includes(searchEntryLowerCase) ||
				el.gcpEnv?.projectName.toLowerCase().includes(searchEntryLowerCase) ||
				el.azureEnv?.accountLabel.toLowerCase().includes(searchEntryLowerCase) ||
				el.kubernetesEnv?.clusterName.toLowerCase().includes(searchEntryLowerCase) ||
				el.env?.classification.toLowerCase().includes(searchEntryLowerCase)
			);
		},
		[applicationsSearch],
	);

	return (
		<>
			<EnvMappingModalForm open={modalVisible} onClose={handleModalClose} />
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
							<Typography sx={{ whiteSpace: 'nowrap' }}>NEW ITEM</Typography>
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
							linkText={'Click to add new Environment Mapping item.'}
							description={'(You’ll be provided with the Environment Mapping Form)'}
							handleModalOpen={handleModalOpen}
						/>
					}
					defaultSortBy={'name'}
				/>
			</StyledTableWrapper>
		</>
	);
};
