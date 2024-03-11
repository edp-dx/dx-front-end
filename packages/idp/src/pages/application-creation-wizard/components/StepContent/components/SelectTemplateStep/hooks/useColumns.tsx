import { Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BUILD_TOOL_ICON_MAPPING } from '~/configs/iconMappings/buildTool';
import { FRAMEWORK_ICON_MAPPING } from '~/configs/iconMappings/framework';
import { LANGUAGE_ICON_MAPPING } from '~/configs/iconMappings/language';
import { PLATFORM_ICON_MAPPING } from '~/configs/iconMappings/platform';
import { Template } from '~/services/data/categories/model';
import { TableColumn } from '~/types/common';

export const useColumns = (): TableColumn<Template>[] => {
	const theme = useTheme();
	const { t } = useTranslation();
	return useMemo(
		() => [
			{
				id: 'nameAndDescription',
				label: 'Name & Description',
				render: ({ name, description }) => (
					<Stack>
						<Typography variant={'body2'} fontWeight={500}>
							{name}
						</Typography>
						<Typography variant={'caption'}>{description}</Typography>
					</Stack>
				),
			},
			{
				id: 'version',
				label: 'Version',
				render: ({ version }) => (
					<Tooltip title={version}>
						<Typography variant={'body2'}>{version}</Typography>
					</Tooltip>
				),
			},
			{
				id: 'deploymentPlatform',
				label: 'Platform',
				render: ({ deploymentPlatform }) => {
					const deploymentPlatformName = deploymentPlatform.toLowerCase();
					const deploymentPlatformIcon =
						(PLATFORM_ICON_MAPPING as never)?.[deploymentPlatformName] ||
						(PLATFORM_ICON_MAPPING as never)['other'];

					return (
						<Tooltip
							title={t(`application_deployment_platform_${deploymentPlatformName}`)}
							placement={'top'}
							arrow
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
									{t(`application_deployment_platform_${deploymentPlatformName}`)}
								</Typography>
							</Stack>
						</Tooltip>
					);
				},
			},
			{
				id: 'language',
				label: 'Language',
				render: ({ language }) => {
					const languageName = language.toLowerCase();
					const languageIcon =
						(LANGUAGE_ICON_MAPPING as never)?.[languageName] ||
						(LANGUAGE_ICON_MAPPING as never)['other'];

					return (
						<Tooltip
							title={t(`application_language_${languageName}`)}
							placement={'top'}
							arrow
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
									{t(`application_language_${languageName}`)}
								</Typography>
							</Stack>
						</Tooltip>
					);
				},
			},
			{
				id: 'framework',
				label: 'Framework',
				render: ({ framework }) => {
					const frameworkName = framework.toLowerCase();
					const frameworkIcon =
						(FRAMEWORK_ICON_MAPPING as never)?.[frameworkName] ||
						(FRAMEWORK_ICON_MAPPING as never)['other'];

					return (
						<Tooltip
							title={t(`application_framework_${frameworkName}`)}
							placement={'top'}
							arrow
						>
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
									{t(`application_framework_${frameworkName}`)}
								</Typography>
							</Stack>
						</Tooltip>
					);
				},
			},
			{
				id: 'buildTool',
				label: 'Build Tool',
				render: ({ buildTool }) => {
					const buildToolName = buildTool.toLowerCase();
					const buildToolIcon =
						(BUILD_TOOL_ICON_MAPPING as never)?.[buildToolName] ||
						(BUILD_TOOL_ICON_MAPPING as never)['other'];

					return (
						<Tooltip
							title={t(`application_build_tool_${buildToolName}`)}
							placement={'top'}
							arrow
						>
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
									{t(`application_build_tool_${buildToolName}`)}
								</Typography>
							</Stack>
						</Tooltip>
					);
				},
			},
		],
		[t, theme.typography],
	);
};
