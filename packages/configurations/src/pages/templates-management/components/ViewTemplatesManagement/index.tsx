import CloseIcon from '@mui/icons-material/Close';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Link,
	Stack,
	Tabs,
	Tooltip,
	Typography,
	useTheme,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TabPanel } from '~/components/TabPanel';
import { BUILD_TOOL_ICON_MAPPING } from '~/configs/iconMappings/buildTool';
import { FRAMEWORK_ICON_MAPPING } from '~/configs/iconMappings/framework';
import { LANGUAGE_ICON_MAPPING } from '~/configs/iconMappings/language';
import { PLATFORM_ICON_MAPPING } from '~/configs/iconMappings/platform';
import { useTemplatesManagementStore } from '~/store/TemplatesManagement';

import { TemplatesManagementTabs } from '../../constants';
import { StyledTab } from './styles';
import { ViewTemplatesManagementProps } from './types';

export const ViewTemplatesManagement: FC<ViewTemplatesManagementProps> = (props) => {
	const { data, open, onClose } = props;
	const theme = useTheme();
	const { t } = useTranslation();

	const { templatesManagementTab, setTemplatesManagementTab } = useTemplatesManagementStore();

	useEffect(() => {
		if (open) setTemplatesManagementTab(TemplatesManagementTabs.generalInfoTab);
	}, [setTemplatesManagementTab, open]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTemplatesManagementTab(newValue);
	};

	const a11yProps = (index: number) => {
		return {
			id: `tab-${index}`,
			'aria-controls': `tabpanel-${index}`,
		};
	};

	const deploymentPlatformName = data?.deployment_platform?.toLowerCase();
	const deploymentPlatformIcon =
		(PLATFORM_ICON_MAPPING as never)?.[deploymentPlatformName] ||
		(PLATFORM_ICON_MAPPING as never)['other'];

	const languageName = data?.language?.toLowerCase();
	const languageIcon =
		(LANGUAGE_ICON_MAPPING as never)?.[languageName] ||
		(LANGUAGE_ICON_MAPPING as never)['other'];

	const frameworkName = data?.framework?.toLowerCase();
	const frameworkIcon =
		(FRAMEWORK_ICON_MAPPING as never)?.[frameworkName] ||
		(FRAMEWORK_ICON_MAPPING as never)['other'];

	const buildToolName = data?.build_tool?.toLowerCase();
	const buildToolIcon =
		(BUILD_TOOL_ICON_MAPPING as never)?.[buildToolName] ||
		(BUILD_TOOL_ICON_MAPPING as never)['other'];

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth={'sm'}>
			<DialogTitle>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					spacing={4}
				>
					<Typography variant={'h4'}>View Template Details</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Stack>
			</DialogTitle>
			<DialogContent
				sx={{
					px: theme.typography.pxToRem(16),
					pb: 3,
					minHeight: theme.typography.pxToRem(470),
				}}
			>
				<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
					<Tabs
						variant='scrollable'
						value={templatesManagementTab}
						onChange={handleChange}
						aria-label='Templates Management Tabs'
						sx={{ borderColor: 'divider', minHeight: 'initial' }}
					>
						<StyledTab label='General Info' {...a11yProps(0)} />
						<StyledTab label='Versions set' {...a11yProps(1)} />
						<StyledTab label='Technologies' {...a11yProps(2)} />
						<StyledTab label='Permissions' {...a11yProps(3)} />
					</Tabs>
				</Box>
				<TabPanel value={templatesManagementTab} index={0}>
					<Stack spacing={9} pt={4} px={4}>
						<Stack>
							<Typography variant='inputLabel'>Template Name</Typography>
							<Typography>{data?.name}</Typography>
						</Stack>
						<Stack>
							<Typography variant='inputLabel'>Template Category</Typography>
							<Typography>{data?.category}</Typography>
						</Stack>
						<Stack>
							<Typography variant='inputLabel'>Git Repo URL</Typography>
							<Tooltip title={data?.git_repo_url} placement={'top'} arrow>
								<Link href={data?.git_repo_url}>{data?.git_repo_url}</Link>
							</Tooltip>
						</Stack>
						<Stack>
							<Typography variant='inputLabel'>Description</Typography>
							<Typography>{data?.description}</Typography>
						</Stack>

						<Stack>
							<Typography variant='inputLabel'>Status</Typography>
							<Typography>{data?.status}</Typography>
						</Stack>
					</Stack>
				</TabPanel>
				<TabPanel value={templatesManagementTab} index={1}>
					<Stack spacing={8} pt={4} px={4}>
						<Stack>
							<Typography variant='inputLabel'>Template Version</Typography>
							<Typography>{data?.template_version}</Typography>
						</Stack>
						<Stack>
							<Typography variant='inputLabel'>Workflow Version</Typography>
							<Typography>{data?.workflow_version}</Typography>
						</Stack>
						<Stack>
							<Typography variant='inputLabel'>
								Configuration Runtime Release Notes URL
							</Typography>
							<Tooltip
								title={data?.runtime_config_release_note_url}
								placement={'top'}
								arrow
							>
								<Link href={data?.runtime_config_release_note_url}>
									{data?.runtime_config_release_note_url}
								</Link>
							</Tooltip>
						</Stack>
						<Stack>
							<Typography variant='inputLabel'>IaC Version</Typography>
							<Typography>{data?.ia_c_version}</Typography>
						</Stack>
						<Stack>
							<Typography variant='inputLabel'>
								Technology Release Notes URL
							</Typography>
							<Tooltip
								title={data?.technology_release_note_url}
								placement={'top'}
								arrow
							>
								<Link href={data?.technology_release_note_url}>
									{data?.technology_release_note_url}
								</Link>
							</Tooltip>
						</Stack>
					</Stack>
				</TabPanel>
				<TabPanel value={templatesManagementTab} index={2}>
					<Stack spacing={8} pt={4} px={4}>
						<Stack>
							<Typography variant='inputLabel'>Deployment Platform</Typography>
							<Stack direction={'row'} alignItems={'center'} spacing={2}>
								<img
									src={deploymentPlatformIcon}
									alt={deploymentPlatformName}
									style={{
										width: theme.typography.pxToRem(24),
										height: theme.typography.pxToRem(24),
									}}
								/>
								<Typography variant={'body2'}>
									{t(`templates_deployment_platform_${deploymentPlatformName}`)}
								</Typography>
							</Stack>
						</Stack>
						<Stack>
							<Typography variant='inputLabel'>Language</Typography>
							<Stack direction={'row'} alignItems={'center'} spacing={2}>
								<img
									src={languageIcon}
									alt={languageName}
									style={{
										width: theme.typography.pxToRem(24),
										height: theme.typography.pxToRem(24),
									}}
								/>
								<Typography variant={'body2'}>
									{t(`templates_language_${languageName}`)}
								</Typography>
							</Stack>
						</Stack>
						<Stack>
							<Typography variant='inputLabel'>Framework</Typography>
							<Stack direction={'row'} alignItems={'center'} spacing={2}>
								<img
									src={frameworkIcon}
									alt={frameworkName}
									style={{
										width: theme.typography.pxToRem(24),
										height: theme.typography.pxToRem(24),
									}}
								/>
								<Typography variant={'body2'}>
									{t(`templates_framework_${frameworkName}`)}
								</Typography>
							</Stack>
						</Stack>
						<Stack>
							<Typography variant='inputLabel'>Build Tool</Typography>
							<Stack direction={'row'} alignItems={'center'} spacing={2}>
								<img
									src={buildToolIcon}
									alt={buildToolName}
									style={{
										width: theme.typography.pxToRem(24),
										height: theme.typography.pxToRem(24),
									}}
								/>
								<Typography variant={'body2'}>
									{t(`templates_build_tool_${buildToolName}`)}
								</Typography>
							</Stack>
						</Stack>
					</Stack>
				</TabPanel>
				<TabPanel value={templatesManagementTab} index={3}>
					<Stack spacing={8} pt={4} px={4}>
						<Stack>
							<Typography variant='inputLabel'>Owners</Typography>
							<Stack direction={'row'} spacing={theme.typography.pxToRem(10)}>
								<EmailOutlinedIcon sx={{ color: theme.palette.action.active }} />
								<Stack>
									{data?.owners.map((item) => (
										<Typography key={item}>{item}</Typography>
									))}
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</TabPanel>
			</DialogContent>
			<DialogActions
				sx={{
					justifyContent: 'center',
					mb: theme.typography.pxToRem(16),
					px: theme.typography.pxToRem(24),
					pb: 0,
				}}
			>
				<Stack direction={'row'} spacing={2}>
					<Button
						form='create-form'
						size={'large'}
						variant={'contained'}
						onClick={onClose}
					>
						Ok
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
};
