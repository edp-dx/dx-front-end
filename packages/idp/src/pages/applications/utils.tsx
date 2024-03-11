import { Typography } from '@mui/material';
import React from 'react';
import { Application } from '~/services/data/applications/model';
import { Template } from '~/services/data/categories/model';
import { OnboardingApplication, StepCodes, Workflow } from '~/services/data/workflows/model';
import { WorkflowSteps } from '~/shared-components/WorkflowSteps';
import { TableColumn } from '~/types/common';
import { getAppData } from '~/utils/getAppData';

import { TableCell } from '../../shared-components/TableCell';
import { OnboardingApplicationDetails } from './components/OnboardingApplicationsTable/components/OnboardingApplicationDetails';
import { OnboardingTableItemActions } from './components/OnboardingApplicationsTable/components/OnboardingTableItemActions';

const getOnboardingReport = ({ steps }: Workflow) => {
	if (!steps || !steps.length) {
		return;
	}
	return steps.reduce<Record<StepCodes, string>>(
		(prev, { stepCode, details }) => ({
			...prev,
			[stepCode]: details,
		}),
		{} as Record<StepCodes, string>,
	);
};

export const getOnboardingApplicationsColumns = (
	applications: Array<Application>,
	handleWorkflowDeleteConfirm: (appName: string) => void,
): TableColumn<Workflow>[] => {
	return [
		{
			id: 'appName',
			label: 'Application Name',
			columnSortableValuePath: 'appName',
			width: '300px',
			render: (data) => {
				const appData = getAppData(data.appName, applications);
				if (appData) {
					return (
						<TableCell
							data={
								{
									...appData,
									onboardingReport: getOnboardingReport(data),
								} as OnboardingApplication
							}
							name={appData.application?.name}
							modal={OnboardingApplicationDetails}
							maxWidth='300px'
						/>
					);
				}
				return <Typography variant={'body1'}>{data.appName}</Typography>;
			},
		},
		{
			id: 'onboardingSteps',
			label: 'Onboarding Steps',
			customizable: false,
			columnSortableValuePath: 'application.details.template.categoryName',
			render: (data) => <WorkflowSteps steps={data.steps} />,
		},
		{
			id: 'actions',
			label: 'Actions',
			textAlign: 'center',
			width: '84px',
			render: (data) => {
				let onboardingAppData;
				const appData = getAppData(data.appName, applications);
				if (appData) {
					onboardingAppData = {
						...appData,
						onboardingReport: getOnboardingReport(data),
					};
				}
				return (
					<OnboardingTableItemActions
						data={onboardingAppData}
						onWorkflowDeleteConfirm={handleWorkflowDeleteConfirm}
					/>
				);
			},
		},
	];
};

const POSSIBLE_EMPTY_VALUES = new Set(['na', 'nan', '0']);
export const DEFAULT_EMPTY_VALUE = 'N/A';

export const isPresent = (value?: string) =>
	value && !POSSIBLE_EMPTY_VALUES.has(value.toLowerCase());

export const getTemplateValuesPresence = (template: Partial<Template>) => ({
	categoryName: isPresent(template?.categoryName),
	buildTool: isPresent(template?.buildTool),
	deploymentPlatform: isPresent(template?.deploymentPlatform),
	framework: isPresent(template?.framework),
	language: isPresent(template?.language),
	components: template?.components?.length > 0,
	templateName: isPresent(template?.name),
});

export const DEFAULT_TIMEOUT = 6000;
export const SHORT_TIMEOUT = 1000;
export const ONE_MIN_TIMEOUT = 36000;
