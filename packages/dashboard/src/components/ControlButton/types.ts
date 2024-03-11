import { ButtonBaseProps } from '@mui/material/ButtonBase/ButtonBase';
import { ReactElement } from 'react';

export interface ControlButtonProps {
	visible: boolean;
	handler: () => void;
	icon: ReactElement;
	tooltip: string;
	disabled: boolean;
	buttonProps?: ButtonBaseProps;
}
