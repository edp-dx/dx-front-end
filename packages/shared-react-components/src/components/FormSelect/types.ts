import { SelectProps } from '@mui/material';
import { ReactElement } from 'react';

export interface SelectOption {
	label: JSX.Element | string;
	value: string;
	disabled?: boolean;
}

export interface FormSelectProps {
	name: string;
	label?: string;
	title?: string | ReactElement;
	placeholder?: string;
	control: any;
	defaultValue?: string;
	errors: any;
	options: SelectOption[];
	SelectProps?: SelectProps;
	size?: 'small' | 'medium';
	reset?: boolean;
	disabled?: boolean;
	disabledMessage?: string | ReactElement;
}
