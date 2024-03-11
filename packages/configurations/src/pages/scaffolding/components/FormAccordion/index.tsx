import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CircularProgress, useTheme } from '@mui/material';
import React, { FC } from 'react';

import {
	StyledAccordion,
	StyledAccordionDetails,
	StyledAccordionSummary,
	StyledAccordionSummaryInner,
	StyledAccordionTitle,
} from './styled';
import { FormAccordionProps } from './types';

export const FormAccordion: FC<FormAccordionProps> = (props) => {
	const { name, children, disabled, expanded, handleChange } = props;

	const theme = useTheme();

	return (
		<StyledAccordion
			expanded={expanded}
			disabled={disabled}
			onChange={() => handleChange(!expanded)}
		>
			<StyledAccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls='panel1a-content'
				id='panel1a-header'
			>
				{disabled && (
					<CircularProgress
						size={24}
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							marginTop: theme.typography.pxToRem(-12),
							marginLeft: theme.typography.pxToRem(-12),
						}}
					/>
				)}
				<StyledAccordionSummaryInner direction={'row'} alignItems={'center'} spacing={16}>
					<StyledAccordionTitle
						variant={'body1'}
						fontWeight={500}
						color={theme.palette.text.primary}
					>
						{name}
					</StyledAccordionTitle>
				</StyledAccordionSummaryInner>
			</StyledAccordionSummary>
			<StyledAccordionDetails>{children}</StyledAccordionDetails>
		</StyledAccordion>
	);
};
