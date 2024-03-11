import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { Grid, Link, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import React from 'react';

import { KeyValue } from '../../../../../../../../components/KeyValue';
import { Application } from '../../../../../../../../services/data/applications/model';
import { DEFAULT_EMPTY_VALUE } from '../../../../../../utils';

export const GeneralInfo = ({ application }: { application: Application }) => {
	const theme = useTheme();

	const {
		application: {
			name,
			enterpriseID,
			description,
			document,
			details: { gitRepoURL, owner },
		},
	} = application;

	return (
		<Grid container spacing={0} columnSpacing={8} rowSpacing={4}>
			<Grid item xs={4}>
				<KeyValue keyStr={'Application Name'} valueStr={name} />
			</Grid>
			<Grid item xs={4}>
				<KeyValue keyStr={'Enterprise Unique ID'} valueStr={enterpriseID} />
			</Grid>
			<Grid item xs={4}>
				<KeyValue
					keyStr={'Git Repo URL'}
					valueStr={
						<Tooltip title={gitRepoURL}>
							<Link href={gitRepoURL} target={'_blank'} sx={{ overflow: 'hidden' }}>
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
			</Grid>
			<Grid item xs={8}>
				<KeyValue
					keyStr={'Application Description'}
					valueStr={description || DEFAULT_EMPTY_VALUE}
				/>
			</Grid>
			<Grid item xs={4}>
				<Stack spacing={4}>
					<KeyValue
						keyStr={'Confluence Namespace URL'}
						valueStr={
							document ? (
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
							) : (
								<></>
							)
						}
					/>
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
				</Stack>
			</Grid>
		</Grid>
	);
};
