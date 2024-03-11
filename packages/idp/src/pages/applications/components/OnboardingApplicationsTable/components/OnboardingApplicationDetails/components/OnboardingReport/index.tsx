import { Grid } from '@mui/material';
import React from 'react';
import { OnboardingReportType, StepCodes } from '~/services/data/workflows/model';

import { KeyValue } from '../../../../../../../../components/KeyValue';
import { ReportLink } from './components/ReportLink';

export const OnboardingReport = ({ data }: { data?: OnboardingReportType }) => {
	return (
		<Grid container spacing={0} columnSpacing={8} rowSpacing={4}>
			<Grid item xs={4}>
				<KeyValue
					keyStr={'Technology Report'}
					valueStr={<ReportLink value={data?.[StepCodes.TechDiscovery]} />}
				/>
			</Grid>
			<Grid item xs={4}>
				<KeyValue
					keyStr={'Generated Documentation'}
					valueStr={<ReportLink value={data?.[StepCodes.DocGen]} />}
				/>
			</Grid>
			<Grid item xs={4}>
				<KeyValue
					keyStr={'API Specification'}
					valueStr={<ReportLink value={data?.[StepCodes.ApiSpec]} />}
				/>
			</Grid>
			<Grid item xs={4}>
				<KeyValue
					keyStr={'Test Cases'}
					valueStr={<ReportLink value={data?.[StepCodes.TestCases]} />}
				/>
			</Grid>
			<Grid item xs={4}>
				<KeyValue
					keyStr={'Integration & API Tests'}
					valueStr={<ReportLink value={data?.[StepCodes.IntegrationTest]} />}
				/>
			</Grid>
		</Grid>
	);
};
