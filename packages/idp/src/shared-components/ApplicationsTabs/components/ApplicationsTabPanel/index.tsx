import { Box } from '@mui/material';
import React from 'react';

import { ApplicationsTabPanelProps } from './types';

export const ApplicationsTabPanel = ({ children, value, index }: ApplicationsTabPanelProps) => (
	<div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`}>
		{value === index && <Box>{children}</Box>}
	</div>
);
