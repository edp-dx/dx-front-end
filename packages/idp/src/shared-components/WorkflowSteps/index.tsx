import { Step, Stepper, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { WorkflowStepIcon } from './components/WorkflowStepIcon';
import { StyledLabel, StyledLink, StyledStepLabel } from './styles';
import { WorkflowStepsProps } from './types';
import {
	getActiveStep,
	getStatuses,
	getStepFullLabel,
	getStepTooltip,
	shouldDisplayLabel,
} from './utils';

export const WorkflowSteps = ({ steps }: WorkflowStepsProps) => {
	const [activeStep, setActiveStep] = useState(0);
	useEffect(() => {
		setActiveStep(getActiveStep(steps));
	}, [steps]);
	return (
		<Stepper activeStep={activeStep}>
			{steps.map(({ stepName, status, details }, index) => {
				const iconStatuses = getStatuses(status);
				const isLabelDisplayed = shouldDisplayLabel(activeStep, index);
				const fullLabel = getStepFullLabel(status, stepName);
				const stepIconProps = {
					...iconStatuses,
					icon: index + 1,
					tooltip: isLabelDisplayed && details ? '' : getStepTooltip(status, stepName),
				};
				const stepIconComponent = () => <WorkflowStepIcon {...stepIconProps} />;
				return (
					<Step key={`step_${stepName}`}>
						{details ? (
							isLabelDisplayed ? (
								<Tooltip arrow placement='top' title={details}>
									<StyledLink href={details} target='_blank'>
										<StyledStepLabel
											sx={{
												columnGap: '8px',
											}}
											StepIconComponent={stepIconComponent}
										>
											<StyledLabel>{fullLabel}</StyledLabel>
										</StyledStepLabel>
									</StyledLink>
								</Tooltip>
							) : (
								<StyledLink href={details} target='_blank'>
									<StyledStepLabel StepIconComponent={stepIconComponent} />
								</StyledLink>
							)
						) : (
							<StyledStepLabel
								sx={[
									isLabelDisplayed && {
										columnGap: '8px',
									},
								]}
								StepIconComponent={stepIconComponent}
							>
								{isLabelDisplayed ? fullLabel : ''}
							</StyledStepLabel>
						)}
					</Step>
				);
			})}
		</Stepper>
	);
};
