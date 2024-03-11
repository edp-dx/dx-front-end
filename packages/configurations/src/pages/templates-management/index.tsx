import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Container, IconButton, Stack, Tooltip, useTheme } from '@mui/material';
import React, { FC, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { Search } from '~/components/Search';
import { LinkConfigurations } from '~/icons/LinkConfiguration';
import { DataService } from '~/services/data';
import { TemplatesManagementPayload } from '~/services/data/templateManagement/model';
import { REQUEST_KEY_GET_TEMPLATES_MANAGEMENT_LIST } from '~/services/data/templateManagement/requestKeys';
import { PageContent } from '~/shared-components/PageContent';
import { PageContentHead } from '~/shared-components/PageContentHead';
import { SharedTable } from '~/shared-components/Table';
import { SharedTableSettings } from '~/shared-components/TableSettings';

import { EmptyList } from '../../components/EmptyList';
import { CreateTemplatesManagement } from './components/CreateTempaltesManagement';
import { useColumns } from './hooks/useColumns';
import { ModalProvider } from './providers/ModalProvider';
import { routeTemplatesManagement } from './route';
import { StyledTableWrapper } from './styles';

export const TemplatesManagement: FC = () => {
	const theme = useTheme();
	const { isLoading, error, data } = useQuery(
		REQUEST_KEY_GET_TEMPLATES_MANAGEMENT_LIST,
		() => DataService.getTemplatesManagementList(),
		{
			staleTime: Infinity,
		},
	);
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const handleModalOpen = useCallback(() => {
		setModalVisible(true);
	}, []);

	const handleModalClose = useCallback(() => {
		setModalVisible(false);
	}, []);

	const [applicationsSearch, setApplicationsSearch] = useState<string>('');

	const [settingsTableOpen, setSettingsTableOpen] = useState<boolean>(false);

	const handleSettingsTableClose = () => setSettingsTableOpen(false);
	const handleSettingsTableOpen = () => {
		setSettingsTableOpen(true);
	};

	const [columns, setColumns] = useColumns();

	const searchFunction = useCallback(
		(el: TemplatesManagementPayload) => {
			const searchEntryLowerCase = applicationsSearch.toLowerCase();
			return (
				el.name.toLowerCase().includes(searchEntryLowerCase) ||
				el.description.toLowerCase().includes(searchEntryLowerCase) ||
				el.template_version.toLowerCase().includes(searchEntryLowerCase) ||
				el.deployment_platform.toLowerCase().includes(searchEntryLowerCase) ||
				el.language.toLowerCase().includes(searchEntryLowerCase) ||
				el.status.toLowerCase().includes(searchEntryLowerCase) ||
				el.category.toLowerCase().includes(searchEntryLowerCase)
			);
		},
		[applicationsSearch],
	);

	return (
		<ModalProvider>
			<CreateTemplatesManagement open={modalVisible} onClose={handleModalClose} />
			<PageContentHead
				title={'Templates Management'}
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
						icon: (
							<LinkConfigurations
								sx={{
									width: theme.typography.pxToRem(16),
									height: theme.typography.pxToRem(16),
								}}
							/>
						),
						label: 'Configurations',
						disabled: true,
						exact: true,
					},
					{
						route: routeTemplatesManagement.to,
						icon: (
							<LayersIcon
								sx={{
									width: theme.typography.pxToRem(16),
									height: theme.typography.pxToRem(16),
								}}
							/>
						),
						label: 'Templates Management',
						exact: true,
					},
				]}
			/>
			<PageContent>
				<Container maxWidth={'lg'}>
					<Box sx={{ p: theme.typography.pxToRem(16) }}>
						<Stack spacing={4} direction={'row'}>
							<Box width={'100%'} maxWidth={theme.typography.pxToRem(300)}>
								<Search setSearch={setApplicationsSearch} />
							</Box>
							<Stack spacing={4} direction={'row'} sx={{ ml: 'auto !important' }}>
								<Button
									variant='contained'
									onClick={handleModalOpen}
									startIcon={<AddIcon />}
								>
									template
								</Button>
								<Tooltip title={'Table Settings'} arrow>
									<IconButton onClick={handleSettingsTableOpen}>
										<SettingsIcon />
									</IconButton>
								</Tooltip>
							</Stack>
						</Stack>
					</Box>
					<StyledTableWrapper>
						<SharedTable
							data={data}
							isLoading={isLoading}
							error={error}
							columns={columns}
							searchFunction={searchFunction}
							emptyListComponent={
								<EmptyList
									title='Templates List is empty.'
									link={routeTemplatesManagement.to}
									linkText='Click to add New Template with the Adding Template Form'
									description='(You’ll be provided with Adding Template Form)'
									handleModalOpen={handleModalOpen}
								/>
							}
							defaultSortBy={'name'}
						/>
					</StyledTableWrapper>
					<SharedTableSettings
						open={settingsTableOpen}
						columns={columns}
						setColumns={setColumns}
						onClose={handleSettingsTableClose}
					/>
				</Container>
			</PageContent>
		</ModalProvider>
	);
};
