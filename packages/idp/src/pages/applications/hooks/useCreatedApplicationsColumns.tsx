import { Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BUILD_TOOL_ICON_MAPPING } from '~/configs/iconMappings/buildTool';
import { FRAMEWORK_ICON_MAPPING } from '~/configs/iconMappings/framework';
import { LANGUAGE_ICON_MAPPING } from '~/configs/iconMappings/language';
import { PLATFORM_ICON_MAPPING } from '~/configs/iconMappings/platform';
import { Application } from '~/services/data/applications/model';
import { TableColumn } from '~/types/common';

import { TableCell } from '../../../shared-components/TableCell';
import { CreatedApplicationDetails } from '../components/CreatedApplicationsTable/components/CreatedApplicationDetails';
import { CreatedTableItemActions } from '../components/CreatedApplicationsTable/components/CreatedTableItemActions';
import { DEFAULT_EMPTY_VALUE, isPresent } from '../utils';

export const useCreatedApplicationsColumns = (): [
	TableColumn<Application>[],
	Dispatch<SetStateAction<TableColumn<Application>[]>>,
] => {
	const theme = useTheme();
	const { t } = useTranslation();
	const _columns: TableColumn<Application>[] = useMemo(
		() => [
			{
				id: 'name',
				label: 'App Name',
				columnSortableValuePath: 'application.name',
				render: (data) => (
					<TableCell
						data={data}
						shouldDisplayDocument
						name={data.application?.name}
						document={data.application?.document}
						modal={CreatedApplicationDetails}
					/>
				),
			},
			{
				id: 'language',
				label: 'Language',
				customizable: true,
				columnSortableValuePath: 'application.details.template.language',
				render: ({
					application: {
						details: { template },
					},
				}) => {
					const languageName = template?.language.toLowerCase();
					const isLanguagePresent = isPresent(languageName);
					const languageIcon = isLanguagePresent
						? (LANGUAGE_ICON_MAPPING as never)?.[languageName] ||
						  (LANGUAGE_ICON_MAPPING as never)['other']
						: '';
					const languageText = isLanguagePresent
						? t(`application_language_${languageName}`)
						: DEFAULT_EMPTY_VALUE;
					return (
						<Tooltip title={languageText} placement={'top'} arrow>
							<Stack direction={'row'} alignItems={'center'} spacing={2}>
								{isLanguagePresent && (
									<img
										src={languageIcon}
										alt={languageName}
										style={{
											width: theme.typography.pxToRem(24),
											height: theme.typography.pxToRem(24),
										}}
									/>
								)}
								<Typography variant={'body2'}>{languageText}</Typography>
							</Stack>
						</Tooltip>
					);
				},
			},
			{
				id: 'framework',
				label: 'Framework',
				customizable: true,
				columnSortableValuePath: 'application.details.template.framework',
				render: ({
					application: {
						details: { template },
					},
				}) => {
					const frameworkName = template?.framework.toLowerCase();
					const isFrameworkPresent = isPresent(frameworkName);
					const frameworkIcon = isFrameworkPresent
						? (FRAMEWORK_ICON_MAPPING as never)?.[frameworkName] ||
						  (FRAMEWORK_ICON_MAPPING as never)['other']
						: '';
					const frameworkText = isFrameworkPresent
						? t(`application_framework_${frameworkName}`)
						: DEFAULT_EMPTY_VALUE;

					return (
						<Tooltip title={frameworkText} placement={'top'} arrow>
							<Stack direction={'row'} alignItems={'center'} spacing={2}>
								{isFrameworkPresent && (
									<img
										src={frameworkIcon}
										alt={frameworkName}
										style={{
											width: theme.typography.pxToRem(24),
											height: theme.typography.pxToRem(24),
										}}
									/>
								)}
								<Typography variant={'body2'}>{frameworkText}</Typography>
							</Stack>
						</Tooltip>
					);
				},
			},
			{
				id: 'deploymentPlatform',
				label: 'Platform',
				customizable: true,
				columnSortableValuePath: 'application.details.template.deploymentPlatform',
				render: ({
					application: {
						details: { template },
					},
				}) => {
					const deploymentPlatformName = template?.deploymentPlatform.toLowerCase();
					const isDeploymentPlatformPresent = isPresent(deploymentPlatformName);
					const deploymentPlatformIcon = isDeploymentPlatformPresent
						? (PLATFORM_ICON_MAPPING as never)?.[deploymentPlatformName] ||
						  (PLATFORM_ICON_MAPPING as never)['other']
						: '';
					const deploymentPlatformText = isDeploymentPlatformPresent
						? t(`application_deployment_platform_${deploymentPlatformName}`)
						: DEFAULT_EMPTY_VALUE;

					return (
						<Tooltip title={deploymentPlatformText} placement={'top'} arrow>
							<Stack direction={'row'} alignItems={'center'} spacing={2}>
								{isDeploymentPlatformPresent && (
									<img
										src={deploymentPlatformIcon}
										alt={deploymentPlatformName}
										style={{
											width: theme.typography.pxToRem(24),
											height: theme.typography.pxToRem(24),
										}}
									/>
								)}
								<Typography variant={'body2'}>{deploymentPlatformText}</Typography>
							</Stack>
						</Tooltip>
					);
				},
			},
			{
				id: 'buildTool',
				label: 'Build Tool',
				customizable: true,
				columnSortableValuePath: 'application.details.template.buildTool',
				render: ({
					application: {
						details: { template },
					},
				}) => {
					const buildToolName = template?.buildTool?.toLowerCase();
					const isBuildToolPresent = isPresent(buildToolName);
					const buildToolIcon = isBuildToolPresent
						? (BUILD_TOOL_ICON_MAPPING as never)?.[buildToolName] ||
						  (BUILD_TOOL_ICON_MAPPING as never)['other']
						: '';
					const buildToolText = isBuildToolPresent
						? t(`application_build_tool_${buildToolName}`)
						: DEFAULT_EMPTY_VALUE;

					return (
						<Tooltip title={buildToolText} placement={'top'} arrow>
							<Stack direction={'row'} alignItems={'center'} spacing={2}>
								{isBuildToolPresent && (
									<img
										src={buildToolIcon}
										alt={buildToolName}
										style={{
											width: theme.typography.pxToRem(24),
											height: theme.typography.pxToRem(24),
										}}
									/>
								)}
								<Typography variant={'body2'}>{buildToolText}</Typography>
							</Stack>
						</Tooltip>
					);
				},
			},
			{
				id: 'templateName',
				label: 'Template Name',
				customizable: true,
				columnSortableValuePath: 'application.details.template.name',
				render: (data) => {
					const templateName = data.application.details.template?.name;
					const templateNameText = isPresent(templateName)
						? templateName
						: DEFAULT_EMPTY_VALUE;
					return (
						<Tooltip title={templateNameText} placement={'top'} arrow>
							<Typography variant={'body2'}>{templateNameText}</Typography>
						</Tooltip>
					);
				},
			},
			{
				id: 'templateCategory',
				label: 'Template Category',
				customizable: true,
				columnSortableValuePath: 'application.details.template.categoryName',
				render: (data) => {
					const templateCategoryName = data.application.details.template?.categoryName;
					const templateCategoryText = isPresent(templateCategoryName)
						? templateCategoryName
						: DEFAULT_EMPTY_VALUE;
					return (
						<Tooltip title={templateCategoryText} placement={'top'} arrow>
							<Typography variant={'body2'}>{templateCategoryText}</Typography>
						</Tooltip>
					);
				},
			},
			{
				id: 'actions',
				label: 'Actions',
				textAlign: 'center',
				width: '84px',
				render: (data) => <CreatedTableItemActions data={data} />,
			},
		],
		[t, theme.typography],
	);

	const [columns, setColumns] = useState<TableColumn<Application>[]>(_columns);

	return [columns, setColumns];
};
