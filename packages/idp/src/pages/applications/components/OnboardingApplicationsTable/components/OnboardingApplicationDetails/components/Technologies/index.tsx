import { Grid, Stack } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Technology } from '~/services/data/applications/model';

import { KeyValue } from '../../../../../../../../components/KeyValue';
import { BUILD_TOOL_ICON_MAPPING } from '../../../../../../../../configs/iconMappings/buildTool';
import { FRAMEWORK_ICON_MAPPING } from '../../../../../../../../configs/iconMappings/framework';
import { LANGUAGE_ICON_MAPPING } from '../../../../../../../../configs/iconMappings/language';
import { PLATFORM_ICON_MAPPING } from '../../../../../../../../configs/iconMappings/platform';
import { DEFAULT_EMPTY_VALUE, getTemplateValuesPresence } from '../../../../../../utils';
import { DisabledScrollableBox, ScrollableBox, StyledIcon } from '../../styles';
import { TechnologiesProps } from './types';

export const Technologies = ({
	businessUnitName,
	specification,
	technology,
	templateName,
	categoryName,
	shouldDisableSpecification,
}: TechnologiesProps) => {
	const { t } = useTranslation();

	const { language, buildTool, framework, deploymentPlatform, components } =
		technology || ({} as Technology);

	const valuePresence = getTemplateValuesPresence({
		...technology,
		categoryName,
		name: templateName,
	});

	return (
		<Grid container spacing={0} columnSpacing={8} rowSpacing={4}>
			<Grid item xs={4}>
				<KeyValue
					keyStr={'Build Tool'}
					valueStr={
						valuePresence.buildTool
							? t(`application_build_tool_${buildTool.toLowerCase()}`)
							: DEFAULT_EMPTY_VALUE
					}
					icon={
						valuePresence.buildTool ? (
							<StyledIcon
								src={
									(BUILD_TOOL_ICON_MAPPING as never)[buildTool.toLowerCase()] ||
									(BUILD_TOOL_ICON_MAPPING as never)['other']
								}
								alt={t(`application_build_tool_${buildTool.toLowerCase()}`)}
							/>
						) : (
							<></>
						)
					}
				/>
			</Grid>
			<Grid item xs={4}>
				<KeyValue
					keyStr={'Language'}
					valueStr={
						valuePresence.language
							? t(`application_language_${language.toLowerCase()}`)
							: DEFAULT_EMPTY_VALUE
					}
					icon={
						valuePresence.language ? (
							<StyledIcon
								src={
									(LANGUAGE_ICON_MAPPING as never)[language.toLowerCase()] ||
									(LANGUAGE_ICON_MAPPING as never)['other']
								}
								alt={t(`application_language_${language.toLowerCase()}`)}
							/>
						) : (
							<></>
						)
					}
				/>
			</Grid>
			<Grid item xs={4}>
				<KeyValue
					keyStr={'Framework'}
					valueStr={
						valuePresence.framework
							? t(`application_framework_${framework.toLowerCase()}`)
							: DEFAULT_EMPTY_VALUE
					}
					icon={
						valuePresence.framework ? (
							<StyledIcon
								src={
									(FRAMEWORK_ICON_MAPPING as never)[framework.toLowerCase()] ||
									(FRAMEWORK_ICON_MAPPING as never)['other']
								}
								alt={t(`application_framework_${framework.toLowerCase()}`)}
							/>
						) : (
							<></>
						)
					}
				/>
			</Grid>
			<Grid item xs={4}>
				<KeyValue keyStr={'Business Unit Name'} valueStr={businessUnitName} />
			</Grid>
			<Grid item xs={4}>
				<KeyValue
					keyStr={'Deployment Platform'}
					valueStr={
						valuePresence.deploymentPlatform
							? t(
									`application_deployment_platform_${deploymentPlatform.toLowerCase()}`,
							  )
							: DEFAULT_EMPTY_VALUE
					}
					icon={
						valuePresence.deploymentPlatform ? (
							<StyledIcon
								src={
									(PLATFORM_ICON_MAPPING as never)[
										deploymentPlatform.toLowerCase()
									] || (PLATFORM_ICON_MAPPING as never)['other']
								}
								alt={deploymentPlatform.toLowerCase()}
							/>
						) : (
							<></>
						)
					}
				/>
			</Grid>
			<Grid item xs={4}>
				<KeyValue
					keyStr={'Components'}
					valueStr={
						valuePresence.components
							? components.map(({ name }) => name).join(', ')
							: DEFAULT_EMPTY_VALUE
					}
				/>
			</Grid>
			<Grid item xs={4}>
				<Stack spacing={4}>
					<KeyValue
						keyStr={'Template Name'}
						valueStr={valuePresence.templateName ? templateName : DEFAULT_EMPTY_VALUE}
					/>
					<KeyValue
						keyStr={'Template Category'}
						valueStr={valuePresence.categoryName ? categoryName : DEFAULT_EMPTY_VALUE}
					/>
				</Stack>
			</Grid>
			<Grid item xs={8}>
				<KeyValue
					keyStr={'Functional & NFR Specification'}
					valueStr={
						shouldDisableSpecification ? (
							<DisabledScrollableBox>{specification}</DisabledScrollableBox>
						) : (
							<ScrollableBox>{specification}</ScrollableBox>
						)
					}
				/>
			</Grid>
		</Grid>
	);
};
