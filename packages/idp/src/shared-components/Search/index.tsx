import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputAdornment, Stack, TextField, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { StyledForm } from './styles';
import { SearchProps } from './types';

export const Search = ({ setSearch }: SearchProps): ReactElement => {
	const theme = useTheme();
	const { handleSubmit, control } = useForm();

	const onSubmit = ({ search }: never) => setSearch(search);

	return (
		<Stack spacing={2} direction={'row'} alignItems={'center'}>
			<Box sx={{ maxWidth: theme.typography.pxToRem(300), width: '100%' }}>
				<StyledForm onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='search'
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								fullWidth
								label={'Search'}
								size={'small'}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='search'
												edge='end'
												type={'submit'}
											>
												<SearchIcon
													sx={{
														width: theme.typography.pxToRem(18),
														height: theme.typography.pxToRem(18),
													}}
												/>
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						)}
					/>
				</StyledForm>
			</Box>
		</Stack>
	);
};
