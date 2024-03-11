import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import {
	AlertTitle,
	Box,
	Button,
	Container,
	IconButton,
	Stack,
	Tooltip,
	capitalize,
	useTheme,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { Molecules } from '~/icons/Molecules';
import { routeApplicationCreateWizard } from '~/pages/application-creation-wizard/route';
import { routeApplications } from '~/pages/applications/route';
import { ModalProvider } from '~/providers/ModalProvider';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_APPLICATIONS } from '~/services/data/applications/requestKeys';
import { REQUEST_KEY_GET_WORKFLOWS } from '~/services/data/workflows/requestKeys';
import { ApplicationsTabs } from '~/shared-components/ApplicationsTabs';
import { PageContent } from '~/shared-components/PageContent';
import { PageContentHead } from '~/shared-components/PageContentHead';
import { SharedTableSettings } from '~/shared-components/TableSettings';

import { Search } from '../../shared-components/Search';
import { AIWonder } from './components/AIWonder';
import { CreatedApplicationsTable } from './components/CreatedApplicationsTable';
import { OnboardingApplicationsTable } from './components/OnboardingApplicationsTable';
import { RegisterApplicationsModal } from './components/RegisterApplication';
import { useCreatedApplicationsColumns } from './hooks/useCreatedApplicationsColumns';
import { StyledAlert } from './styles';
import { AlertConfig, ApplicationsTabsValues, WorkflowCreationStatus } from './types';
import { ONE_MIN_TIMEOUT, getOnboardingApplicationsColumns } from './utils';

export const Applications = () => {
	const theme = useTheme();

	const [applicationsSearch, setApplicationsSearch] = useState<string>('');
	const [settingsTableOpen, setSettingsTableOpen] = useState<boolean>(false);
	const [currentTab, setCurrentTab] = useState(ApplicationsTabsValues.Created);
	const [onboardingApplicationsColumns, setOnboardingApplicationsColumns] = useState([]);
	const [applicationNames, setApplicationNames] = useState([]);
	const [gitRepoUrls, setGitRepoUrls] = useState([]);
	const [alertConfig, setAlertConfig] = useState<AlertConfig>({
		severity: 'success',
		text: '',
		title: '',
	});
	const [isAlertVisible, setIsAlertVisible] = useState(false);

	const {
		isLoading,
		error,
		data: applicationsData,
	} = useQuery(REQUEST_KEY_GET_APPLICATIONS, () => DataService.getApplications(), {
		staleTime: Infinity,
	});

	const queryClient = useQueryClient();

	const hideAlert = useCallback(() => {
		setTimeout(() => setIsAlertVisible(false), ONE_MIN_TIMEOUT);
	}, []);

	const handleDeleteError = useCallback(
		(response: { error?: string }, status: number, appName: string) => {
			setAlertConfig({
				severity: 'error',
				title: 'Error',
				text: response.error
					? capitalize(response.error)
					: `Error ${status}. Failed to delete '${appName}'.`,
			});
			setIsAlertVisible(true);
			hideAlert();
		},
		[hideAlert],
	);

	const handleDeleteSuccess = useCallback(
		(appName: string) => {
			setAlertConfig({
				severity: 'success',
				title: 'Success',
				text: `Application '${appName}' successfully deleted.`,
			});
			setIsAlertVisible(true);
			hideAlert();
		},
		[hideAlert],
	);

	const workflowMutation = useMutation({
		mutationKey: 'deleteWorkflow',
		mutationFn: (appName: string) => DataService.deleteWorkflow(appName),
		onSuccess: async (_, appName) => {
			handleDeleteSuccess(appName);
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_WORKFLOWS],
			});
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_APPLICATIONS],
			});
		},
		onError: async ({ response, status }, appName) => {
			handleDeleteError(response, status, appName);
		},
	});

	const handleSettingsTableClose = () => setSettingsTableOpen(false);
	const handleSettingsTableOpen = () => {
		setSettingsTableOpen(true);
	};

	const handleBookmarkClick = useCallback(() => {
		window.dispatchEvent(new CustomEvent('dx_learning_center_open'));
		window.dispatchEvent(
			new CustomEvent('dx_learning_center_set_filter', {
				detail: {
					data: {
						filter: 'Manage Applications',
					},
				},
			}),
		);
	}, []);

	const [createdApplicationsColumns, setCreatedApplicationsColumns] =
		useCreatedApplicationsColumns();
	const handleTabChange = useCallback((value: ApplicationsTabsValues) => {
		setCurrentTab(value);
	}, []);

	const handleWorkflowDeleteConfirm = useRef<(appName: string) => void>();
	handleWorkflowDeleteConfirm.current = (appName: string) => {
		workflowMutation.mutate(appName);
	};

	useEffect(() => {
		if (applicationsData) {
			setApplicationNames(
				applicationsData.map((item) => item.application.name.toLowerCase()),
			);
			setGitRepoUrls(
				applicationsData.map((item) => item.application.details.gitRepoURL.toLowerCase()),
			);
		}
	}, [applicationsData]);

	useEffect(() => {
		setOnboardingApplicationsColumns(
			getOnboardingApplicationsColumns(applicationsData, handleWorkflowDeleteConfirm.current),
		);
	}, [applicationsData]);

	const tabs = useMemo(
		() => [
			{
				value: ApplicationsTabsValues.Created,
				label: 'Created',
				content: (
					<CreatedApplicationsTable
						applicationsSearch={applicationsSearch}
						columns={createdApplicationsColumns}
						isLoading={isLoading}
						error={error}
						data={applicationsData}
					/>
				),
			},
			{
				value: ApplicationsTabsValues.Onboarding,
				label: 'Onboarding',
				content: (
					<OnboardingApplicationsTable
						applicationsSearch={applicationsSearch}
						columns={onboardingApplicationsColumns}
					/>
				),
			},
		],
		[
			applicationsSearch,
			createdApplicationsColumns,
			onboardingApplicationsColumns,
			isLoading,
			error,
			applicationsData,
		],
	);

	const handleRegisterApplicationClose = useCallback(
		(workflowCreationStatus: WorkflowCreationStatus) => {
			if (workflowCreationStatus === WorkflowCreationStatus.Complete) {
				setCurrentTab(ApplicationsTabsValues.Onboarding);
			}
		},
		[],
	);

	const handleAlertClose = useCallback(() => {
		setIsAlertVisible(false);
	}, []);

	return (
		<ModalProvider>
			<PageContentHead
				handleBookmarkClick={handleBookmarkClick}
				title={'Manage Applications'}
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
						route: routeApplications.to,
						icon: (
							<Molecules
								sx={{
									width: theme.typography.pxToRem(16),
									height: theme.typography.pxToRem(16),
								}}
							/>
						),
						label: 'Manage Applications',
						exact: true,
					},
				]}
			/>
			<PageContent>
				<Container maxWidth={'lg'}>
					<Box sx={{ p: theme.typography.pxToRem(16) }}>
						<Stack spacing={4} direction={'row'} alignItems={'center'}>
							<Search setSearch={setApplicationsSearch} />
							<Stack
								spacing={4}
								direction={'row'}
								alignItems={'center'}
								sx={{ ml: 'auto !important' }}
							>
								<Stack spacing={2} direction={'row'} alignItems={'center'}>
									<RegisterApplicationsModal
										onClose={handleRegisterApplicationClose}
										applicationNames={applicationNames}
										gitRepoUrls={gitRepoUrls}
									/>
									<Button
										sx={{ zIndex: 1 }}
										variant='contained'
										component={Link}
										to={routeApplicationCreateWizard.to}
										startIcon={<AddIcon />}
									>
										Application
									</Button>
									<AIWonder />
								</Stack>
								<Tooltip title={'Table Settings'} arrow>
									<IconButton
										onClick={handleSettingsTableOpen}
										disabled={currentTab === ApplicationsTabsValues.Onboarding}
									>
										<SettingsIcon />
									</IconButton>
								</Tooltip>
							</Stack>
						</Stack>
					</Box>
					<ApplicationsTabs
						tabs={tabs}
						onTabChange={handleTabChange}
						currentValue={currentTab}
					/>
					<SharedTableSettings
						open={settingsTableOpen}
						columns={createdApplicationsColumns}
						setColumns={setCreatedApplicationsColumns}
						onClose={handleSettingsTableClose}
					/>
				</Container>
			</PageContent>
			{isAlertVisible && (
				<StyledAlert
					severity={alertConfig.severity}
					onClose={handleAlertClose}
					sx={{ mb: theme.typography.pxToRem(24) }}
				>
					<AlertTitle>{alertConfig.title}</AlertTitle>
					{alertConfig.text}
				</StyledAlert>
			)}
		</ModalProvider>
	);
};
