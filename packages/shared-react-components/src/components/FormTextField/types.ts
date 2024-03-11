import { InputProps, StandardTextFieldProps } from '@mui/material';

export interface FormTextFieldProps {
	name: string;
	label?: string;
	title?: string;
	control: any;
	defaultValue?: string;
	placeholder?: string;
	disabled?: boolean;
	errors: any;
	InputProps?: InputProps;
	TextFieldProps?: StandardTextFieldProps;
	type?: string;
}
