import { Link } from '@mui/material';
import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { routeDashboard } from '~/pages/application-creation-wizard/route';
import { routeApplications } from '~/pages/applications/route';

export const useSteps = (pipelineURL: string) => {
	return useMemo(
		() => [
			{
				label: (
					<>
						Go to the{' '}
						<Link component={RouterLink} to={routeApplications.to} target={'_blank'}>
							Applications
						</Link>{' '}
						List.
					</>
				),
			},
			{
				label: (
					<>
						Go to the{' '}
						<Link component={RouterLink} to={routeDashboard.to} target={'_blank'}>
							Dashboard
						</Link>{' '}
						page.
					</>
				),
			},
			{
				label: (
					<>
						Navigate to the{' '}
						<Link href={pipelineURL} target={'_blank'}>
							Deployment
						</Link>{' '}
						page.
					</>
				),
			},
		],
		[pipelineURL],
	);
};
