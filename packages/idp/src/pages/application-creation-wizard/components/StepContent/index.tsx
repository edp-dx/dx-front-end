import { Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';

import { StepContentInner, StyledDivider, StyledStepWrapper, StyledTitle } from './styles';
import { StepContentProps } from './types';

export const StepContent: FC<StepContentProps> = ({
	activeStepIndex,
	index,
	step: { title, description, component },
}) => {
	const theme = useTheme();
	return (
		<StyledStepWrapper
			role='tabpanel'
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			sx={{ display: activeStepIndex !== index ? 'none' : 'flex' }}
		>
			{title ? (
				<StyledTitle
					variant={activeStepIndex === 0 ? 'h4' : 'h5'}
					color={theme.palette.text.primary}
				>
					{title}
				</StyledTitle>
			) : null}
			{description ? <Typography variant={'body2'}>{description}</Typography> : null}
			<StyledDivider />
			<StepContentInner>{activeStepIndex === index && component}</StepContentInner>
		</StyledStepWrapper>
	);
};
