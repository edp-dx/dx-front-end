import { Chip, Paper, Radio, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BUILD_TOOL_ICON_MAPPING } from '~/configs/iconMappings/buildTool';
import { FRAMEWORK_ICON_MAPPING } from '~/configs/iconMappings/framework';
import { LANGUAGE_ICON_MAPPING } from '~/configs/iconMappings/language';
import { PLATFORM_ICON_MAPPING } from '~/configs/iconMappings/platform';
import { FORM_NAMES } from '~/pages/application-creation-wizard/names';

import { StyledFormControlLabel, StyledIcon } from './styles';
import { TemplateCheckboxCardProps } from './types';

export const TemplateCheckboxCard: FC<TemplateCheckboxCardProps> = ({
	template: {
		ID,
		categoryID,
		name,
		description,
		deploymentPlatform,
		language,
		framework,
		buildTool,
		version,
	},
}) => {
	const theme = useTheme();
	const { t } = useTranslation();

	const { watch, setValue } = useFormContext();

	const templateIdFieldValue = watch(FORM_NAMES.templateID);

	const setValues = () => {
		setValue(FORM_NAMES.templateID, ID);
		setValue(FORM_NAMES.categoryID, categoryID);
	};

	return (
		<StyledFormControlLabel
			value={ID}
			control={
				<Radio
					onChange={({ target: { checked } }) => (checked ? setValues() : false)}
					checked={templateIdFieldValue === ID}
					sx={{ display: 'none' }}
				/>
			}
			label={
				<Paper
					component={'span'}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						height: '100%',
						p: theme.typography.pxToRem(16),
					}}
				>
					<Stack
						component={'span'}
						direction={'row'}
						alignItems={'center'}
						justifyContent={'space-between'}
						spacing={8}
						width={'100%'}
						sx={{ mb: theme.typography.pxToRem(12) }}
					>
						<Typography variant={'subtitle2'}>{name}</Typography>
						<Typography variant={'caption'}>{version}</Typography>
					</Stack>
					<Typography
						variant={'body2'}
						color={theme.palette.text.secondary}
						sx={{ mb: theme.typography.pxToRem(32) }}
					>
						{description}
					</Typography>
					<Grid
						container
						alignItems={'center'}
						spacing={2}
						sx={{ p: 0, marginTop: 'auto' }}
					>
						<Grid>
							<Tooltip title={'Deployment Platform'}>
								<Chip
									avatar={
										<StyledIcon
											src={
												(PLATFORM_ICON_MAPPING as never)[
													deploymentPlatform.toLowerCase()
												] || (PLATFORM_ICON_MAPPING as never)['other']
											}
											alt={deploymentPlatform}
										/>
									}
									label={t(
										`application_deployment_platform_${deploymentPlatform.toLowerCase()}`,
									)}
								/>
							</Tooltip>
						</Grid>
						<Grid>
							<Tooltip title={'Language'}>
								<Chip
									avatar={
										<StyledIcon
											src={
												(LANGUAGE_ICON_MAPPING as never)[
													language.toLowerCase()
												] || (LANGUAGE_ICON_MAPPING as never)['other']
											}
											alt={language}
										/>
									}
									label={t(`application_language_${language.toLowerCase()}`)}
								/>
							</Tooltip>
						</Grid>
						<Grid>
							<Tooltip title={'Framework'}>
								<Chip
									avatar={
										<StyledIcon
											src={
												(FRAMEWORK_ICON_MAPPING as never)[
													framework.toLowerCase()
												] || (FRAMEWORK_ICON_MAPPING as never)['other']
											}
											alt={framework}
										/>
									}
									label={t(`application_framework_${framework.toLowerCase()}`)}
								/>
							</Tooltip>
						</Grid>

						<Grid>
							<Tooltip title={'Build Tool'}>
								<Chip
									avatar={
										<StyledIcon
											src={
												(BUILD_TOOL_ICON_MAPPING as never)[
													buildTool.toLowerCase()
												] || (BUILD_TOOL_ICON_MAPPING as never)['other']
											}
											alt={buildTool}
										/>
									}
									label={t(`application_build_tool_${buildTool.toLowerCase()}`)}
								/>
							</Tooltip>
						</Grid>
					</Grid>
				</Paper>
			}
			sx={{ m: 0 }}
		/>
	);
};
