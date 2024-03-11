import { ErrorMessage } from '@hookform/error-message';
import { FormControl, Stack, Typography } from '@mui/material';
import React, { ReactElement, RefObject, forwardRef } from 'react';
import { Controller } from 'react-hook-form';

import { StyledTextField } from './styles';
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
			<Stack spacing={1}>
				<FormControl fullWidth>
					<Controller
						render={({ field }) => (
							<StyledTextField
								label={label}
								error={hasError}
								placeholder={placeholder}
								inputRef={ref}
								disabled={disabled}
								InputProps={InputProps}
								type={type}
								sx={{ whiteSpace: 'nowrap' }}
								{...field}
								{...TextFieldProps}
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
			</Stack>
		);
	},
);

FormTextField.displayName = 'FormTextField';
