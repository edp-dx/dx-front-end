import { ErrorMessage } from '@hookform/error-message';
import { FormControl, TextField, Typography } from '@mui/material';
import React, { ReactElement, RefObject, forwardRef } from 'react';
import { Controller } from 'react-hook-form';

import { FormTextFieldProps } from './types';

export const FormTextField = forwardRef(
	(
		{
			name,
			label,
			type,
			control,
			defaultValue = '',
			errors,
			placeholder,
			disabled = false,
			InputProps,
			TextFieldProps,
			...props
		}: FormTextFieldProps,
		ref: RefObject<HTMLInputElement>,
	): ReactElement => {
		const hasError = !!errors[name];

		return (
			<>
				<FormControl fullWidth>
					<Controller
						render={({ field }) => (
							<TextField
								InputLabelProps={{ shrink: true }}
								error={hasError}
								label={label}
								placeholder={placeholder}
								inputRef={ref}
								disabled={disabled}
								InputProps={InputProps}
								type={type}
								{...TextFieldProps}
								{...field}
							/>
						)}
						name={name}
						defaultValue={defaultValue}
						control={control}
						{...props}
					/>
				</FormControl>
				{hasError ? (
					<Typography variant={'caption'} color={'error'}>
						<ErrorMessage errors={errors} name={name} />
					</Typography>
				) : null}
			</>
		);
	},
);

FormTextField.displayName = 'FormTextField';
