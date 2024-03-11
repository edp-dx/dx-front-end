import { Tooltip } from '@mui/material';
import React, { FC, ReactElement } from 'react';

import { StyledControlButton } from './styles';
import { ControlButtonProps } from './types';

export const ControlButton: FC<ControlButtonProps> = ({
	visible,
	handler,
	icon,
	tooltip,
	disabled = false,
	buttonProps,
}): ReactElement => {
	return visible ? (
		<Tooltip title={tooltip} enterDelay={800} enterNextDelay={800} arrow placement={'top'}>
			<StyledControlButton onClick={handler} disabled={disabled} {...buttonProps}>
				{icon}
			</StyledControlButton>
		</Tooltip>
	) : null;
};
