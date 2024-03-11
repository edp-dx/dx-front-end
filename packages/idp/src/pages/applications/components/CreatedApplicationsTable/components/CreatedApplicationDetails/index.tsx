import CloseIcon from '@mui/icons-material/Close';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Link,
	Stack,
	Tooltip,
	Typography,
	useTheme,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyValue } from '~/components/KeyValue';
import { BUILD_TOOL_ICON_MAPPING } from '~/configs/iconMappings/buildTool';
import { FRAMEWORK_ICON_MAPPING } from '~/configs/iconMappings/framework';
import { LANGUAGE_ICON_MAPPING } from '~/configs/iconMappings/language';
import { PLATFORM_ICON_MAPPING } from '~/configs/iconMappings/platform';
import { Template } from '~/services/data/categories/model';

import { DEFAULT_EMPTY_VALUE, getTemplateValuesPresence } from '../../../../utils';
import { StyledIcon } from './styles';
import { ApplicationDetailsProps } from './types';

export const CreatedApplicationDetails: FC<ApplicationDetailsProps> = ({
	open,
	onClose,
	data,
}): ReactElement => {
	const theme = useTheme();
	const { t } = useTranslation();
	if (!data) {
		return <></>;
	}
	const {
		application: {
			name,
			enterpriseID,
			description,
			document,
			details: { gitRepoURL, pipelineURL, businessUnitName, owner, template },
		},
	} = data;

	const {
		language,
		buildTool,
		framework,
		deploymentPlatform,
		components,
		name: templateName,
		categoryName,
	} = template || ({} as Template);

	const valuePresence = getTemplateValuesPresence(template);

	return (
		<>
			<Dialog open={open} onClose={onClose} maxWidth={'lgDefault'} fullWidth>
				<DialogTitle>
					<Stack
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
						spacing={4}
					>
						<Typography variant={'h4'}>Application Details</Typography>
						<IconButton onClick={onClose}>
							<CloseIcon />
						</IconButton>
					</Stack>
				</DialogTitle>
				<Divider sx={{}} />
				<DialogContent>
					<Grid container columnSpacing={8} rowSpacing={4}>
						<Grid xs={4}>
							<KeyValue keyStr={'Application Name'} valueStr={name} />
							<KeyValue keyStr={'Application Description'} valueStr={description} />
						</Grid>
						<Grid xs={4}>
							<KeyValue keyStr={'Enterprise Unique ID'} valueStr={enterpriseID} />
						</Grid>
						<Grid xs={4}>
							<KeyValue
								keyStr={'Git Repo URL'}
								valueStr={
									<Tooltip title={gitRepoURL}>
										<Link
											href={gitRepoURL}
											target={'_blank'}
											sx={{ overflow: 'hidden' }}
										>
											<Typography
												variant={'body1'}
												sx={{
													wordBreak: 'break-word',
													whiteSpace: 'nowrap',
													textOverflow: 'ellipsis',
													overflow: 'hidden',
												}}
											>
												{gitRepoURL}
											</Typography>
										</Link>
									</Tooltip>
								}
							/>
							{document && (
								<KeyValue
									keyStr={'App Documentation Link'}
									valueStr={
										<Tooltip title={document}>
											<Link
												href={document}
												target={'_blank'}
												sx={{ overflow: 'hidden' }}
											>
												<Typography
													variant={'body1'}
													sx={{
														wordBreak: 'break-word',
														whiteSpace: 'nowrap',
														textOverflow: 'ellipsis',
														overflow: 'hidden',
													}}
												>
													{document}
												</Typography>
											</Link>
										</Tooltip>
									}
								/>
							)}
						</Grid>
						<Grid xs={4}>
							<KeyValue
								keyStr={'Pipeline URL'}
								valueStr={
									<Tooltip title={pipelineURL}>
										<Link
											href={pipelineURL}
											target={'_blank'}
											sx={{ overflow: 'hidden' }}
										>
											<Typography
												variant={'body1'}
												sx={{
													wordBreak: 'break-word',
													whiteSpace: 'nowrap',
													textOverflow: 'ellipsis',
													overflow: 'hidden',
												}}
											>
												{pipelineURL}
											</Typography>
										</Link>
									</Tooltip>
								}
							/>
						</Grid>
						<Grid xs={4}>
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
												(BUILD_TOOL_ICON_MAPPING as never)[
													buildTool.toLowerCase()
												] || (BUILD_TOOL_ICON_MAPPING as never)['other']
											}
											alt={t(
												`application_build_tool_${buildTool.toLowerCase()}`,
											)}
										/>
									) : (
										<></>
									)
								}
							/>
						</Grid>
						<Grid xs={4}>
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
												(LANGUAGE_ICON_MAPPING as never)[
													language.toLowerCase()
												] || (LANGUAGE_ICON_MAPPING as never)['other']
											}
											alt={t(
												`application_language_${language.toLowerCase()}`,
											)}
										/>
									) : (
										<></>
									)
								}
							/>
						</Grid>
						<Grid xs={4}>
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
												(FRAMEWORK_ICON_MAPPING as never)[
													framework.toLowerCase()
												] || (FRAMEWORK_ICON_MAPPING as never)['other']
											}
											alt={t(
												`application_framework_${framework.toLowerCase()}`,
											)}
										/>
									) : (
										<></>
									)
								}
							/>
						</Grid>
						<Grid xs={4}>
							<KeyValue keyStr={'Business Unit Name'} valueStr={businessUnitName} />
						</Grid>
						<Grid xs={4}>
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
						<Grid xs={4}>
							<KeyValue
								keyStr={'Components'}
								valueStr={
									valuePresence.components
										? components.map(({ name }) => name).join(', ')
										: DEFAULT_EMPTY_VALUE
								}
							/>
						</Grid>
						<Grid xs={4}>
							<KeyValue
								keyStr={'Template Name'}
								valueStr={
									valuePresence.templateName ? templateName : DEFAULT_EMPTY_VALUE
								}
							/>
						</Grid>
						<Grid xs={4}>
							<KeyValue
								keyStr={'Template Category'}
								valueStr={
									valuePresence.categoryName ? categoryName : DEFAULT_EMPTY_VALUE
								}
							/>
						</Grid>
						<Grid xs={12}>
							<KeyValue
								keyStr={'Owner'}
								valueStr={owner}
								icon={
									<MailOutlinedIcon
										sx={{
											width: theme.typography.pxToRem(24),
											height: theme.typography.pxToRem(24),
										}}
									/>
								}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions sx={{ justifyContent: 'center', mb: theme.typography.pxToRem(8) }}>
					<Button size={'large'} variant={'contained'} onClick={onClose}>
						Done
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
