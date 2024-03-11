import { Alert, Button, Link, Stack, Step, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import { KeyValue } from '~/components/KeyValue';
import { FORM_NAMES } from '~/pages/application-creation-wizard/names';
import { routeApplications } from '~/pages/applications/route';
import { CreateApplicationResponse } from '~/services/data/applications/model';
import { REQUEST_KEY_CREATE_APPLICATION_RESPONSE } from '~/services/data/applications/requestKeys';

import { useSteps } from './hooks/useSteps';
import { StyledStepLabel, StyledStepper } from './styles';

export const ConfirmationStep = () => {
	const theme = useTheme();
	const { watch } = useFormContext();

	const {
		data,
	}: {
		data: CreateApplicationResponse;
	} = useQuery(REQUEST_KEY_CREATE_APPLICATION_RESPONSE);

	const appNameFieldValue = watch(FORM_NAMES.name);
	const appDescriptionFieldValue = watch(FORM_NAMES.description);

	const steps = useSteps(data?.pipelineURL);

	return (
		<>
			<Alert severity='success' sx={{ mb: theme.typography.pxToRem(24) }}>
				Your application [{appNameFieldValue}] is successfully scaffolded!
			</Alert>
			<Stack spacing={4} sx={{ mb: theme.typography.pxToRem(24) }}>
				<KeyValue keyStr={'Application Name'} valueStr={appNameFieldValue} />
				<KeyValue keyStr={'Application Description'} valueStr={appDescriptionFieldValue} />
				<KeyValue
					keyStr={'Git Repo URL'}
					valueStr={
						<Link href={data?.gitRepoURL} target={'_blank'}>
							<Typography variant={'body1'} sx={{ wordBreak: 'break-word' }}>
								{data?.gitRepoURL}
							</Typography>
						</Link>
					}
				/>
				<KeyValue
					keyStr={'Pipeline URL'}
					valueStr={
						<Link href={data?.pipelineURL} target={'_blank'}>
							<Typography variant={'body1'} sx={{ wordBreak: 'break-word' }}>
								{data?.pipelineURL}
							</Typography>
						</Link>
					}
				/>
			</Stack>
			<Typography variant={'h6'} sx={{ mb: theme.typography.pxToRem(16) }}>
				Next Steps Recommended
			</Typography>
			<StyledStepper orientation='vertical'>
				{steps.map((step, index) => (
					<Step active={false} key={index}>
						<StyledStepLabel>{step.label}</StyledStepLabel>
					</Step>
				))}
			</StyledStepper>
			<Stack
				direction={'row'}
				justifyContent={'flex-end'}
				spacing={2}
				sx={{ mt: 'auto', pt: theme.typography.pxToRem(16) }}
			>
				<Button
					size={'large'}
					variant={'contained'}
					component={RouterLink}
					to={routeApplications.to}
				>
					Go to apps list
				</Button>
			</Stack>
		</>
	);
};
