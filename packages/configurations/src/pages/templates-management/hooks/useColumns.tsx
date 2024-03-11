import { Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_ICON_MAPPING } from '~/configs/iconMappings/language';
import { PLATFORM_ICON_MAPPING } from '~/configs/iconMappings/platform';
import { TemplatesManagement } from '~/services/data/templateManagement/model';
import { TableColumn } from '~/types/common';

import { TableCell } from '../components/TableCell';
import { TableTemplatesManagementActions } from '../components/TableTemplatesManagementActions';

export const useColumns = (): [
	TableColumn<TemplatesManagement>[],
	Dispatch<SetStateAction<TableColumn<TemplatesManagement>[]>>,
] => {
	const theme = useTheme();
	const { t } = useTranslation();

	const _columns: TableColumn<TemplatesManagement>[] = useMemo(
		() => [
			{
				id: 'name',
				label: 'Template Name',
				columnSortableValuePath: 'name',
				width: '180px',
				render: (data) => <TableCell data={data} />,
			},
			{
				id: 'description',
				label: 'Description',
				customizable: true,
				columnSortableValuePath: 'description',
				render: (data) => {
					return (
						<Tooltip title={data.description} placement={'top'} arrow followCursor>
							<Typography variant={'body2'}>{data.description}</Typography>
						</Tooltip>
					);
				},
			},
			{
				id: 'version',
				label: 'Version',
				customizable: true,
				columnSortableValuePath: 'template_version',
				width: '144px',
				render: (data) => {
					return (
						<Tooltip title={data.template_version} placement={'top'} arrow followCursor>
							<Typography variant={'body2'}>{data.template_version}</Typography>
						</Tooltip>
					);
				},
			},
			{
				id: 'runtime',
				label: 'Configuration Runtime',
				customizable: true,
				columnSortableValuePath: 'deployment_platform',
				width: '144px',
				render: (data) => {
					const deploymentPlatformName = data.deployment_platform.toLowerCase();
					const deploymentPlatformIcon =
						(PLATFORM_ICON_MAPPING as never)?.[deploymentPlatformName] ||
						(PLATFORM_ICON_MAPPING as never)['other'];

					return (
						<Tooltip
							title={t(`templates_deployment_platform_${deploymentPlatformName}`)}
							placement={'top'}
							arrow
							followCursor
						>
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
						</Tooltip>
					);
				},
			},
			{
				id: 'language',
				label: 'Language',
				customizable: true,
				columnSortableValuePath: 'language',
				width: '144px',
				render: (data) => {
					const languageName = data.language.toLowerCase();
					const languageIcon =
						(LANGUAGE_ICON_MAPPING as never)?.[languageName] ||
						(LANGUAGE_ICON_MAPPING as never)['other'];

					return (
						<Tooltip
							title={t(`templates_language_${languageName}`)}
							placement={'top'}
							arrow
							followCursor
						>
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
						</Tooltip>
					);
				},
			},
			{
				id: 'status',
				label: 'Status',
				customizable: true,
				columnSortableValuePath: 'status',
				width: '120px',
				render: (data) => (
					<Tooltip title={data.status} placement={'top'} arrow followCursor>
						<Typography variant={'body2'}>{data.status}</Typography>
					</Tooltip>
				),
			},
			{
				id: 'category',
				label: 'Category',
				customizable: true,
				columnSortableValuePath: 'category',
				width: '172px',
				render: (data) => (
					<Tooltip title={data.category} placement={'top'} arrow followCursor>
						<Typography variant={'body2'}>{data.category}</Typography>
					</Tooltip>
				),
			},
			{
				id: 'actions',
				label: 'Actions',
				textAlign: 'center',
				width: '83px',
				render: (data) => <TableTemplatesManagementActions data={data} />,
			},
		],
		[t, theme.typography],
	);

	const [columns, setColumns] = useState<TableColumn<TemplatesManagement>[]>(_columns);

	return [columns, setColumns];
};
