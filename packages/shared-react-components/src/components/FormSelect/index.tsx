import { ErrorMessage } from '@hookform/error-message';
import CachedIcon from '@mui/icons-material/Cached';
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import React, { ReactElement, RefObject, forwardRef } from 'react';
import { Controller } from 'react-hook-form';

import { FormSelectProps } from './types';

export const FormSelect = forwardRef(
	(
		{
			name,
			label,
			control,
			defaultValue = '',
			errors,
			disabled = false,
			disabledMessage,
			placeholder = 'Select one from the list below...',
			options,
			size,
			reset,
			SelectProps,
			...props
		}: FormSelectProps,
		ref: RefObject<HTMLInputElement>,
	): ReactElement => {
		const hasError = !!errors[name];
		const labelId = `label::${name}`;
		const theme = useTheme();

		return (
			<Stack spacing={1} width={'100%'}>
				<FormControl fullWidth size={size}>
					<InputLabel id={labelId} shrink={true}>
						{label}
					</InputLabel>
					<Controller
						render={({ field }) => (
							<Select
								{...field}
								inputRef={ref}
								error={hasError}
								label={label}
								labelId={labelId}
								displayEmpty
								disabled={disabled}
								fullWidth
								notched
								renderValue={(selected) => {
									const item = options.find(({ value: v }) => v === selected);

									return selected === '' || !item ? (
										<Typography color={theme.palette.text.disabled}>
											{placeholder}
										</Typography>
									) : (
										item.label
									);
								}}
								{...SelectProps}
							>
								{options.map(({ label, value, disabled = false }, idx) => {
									const key = `${label}::${idx}`;

									return (
										<MenuItem value={value} key={key} disabled={disabled}>
											{label}
										</MenuItem>
									);
								})}
								{reset && (
									<MenuItem value={''}>
										<Stack spacing={4} direction={'row'} alignItems={'center'}>
											<CachedIcon fontSize={'small'} />
											<Typography>Clear</Typography>
										</Stack>
									</MenuItem>
								)}
							</Select>
						)}
						name={name}
						defaultValue={defaultValue}
						control={control}
						{...props}
					/>
					{disabledMessage && disabled && <Box>{disabledMessage}</Box>}
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

FormSelect.displayName = 'FormSelect';
