import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputAdornment, Stack, TextField, useTheme } from '@mui/material';
import React, { KeyboardEvent, ReactElement, useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FORM_NAMES } from '~/pages/application-creation-wizard/names';

import { StyledWrapper } from './styles';
import { SearchProps } from './types';

export const Search = ({ setSearch }: SearchProps): ReactElement => {
	const theme = useTheme();
	const { watch, control } = useFormContext();
	const searchFieldValue = watch(FORM_NAMES.search);

	const onSubmit = useCallback(() => setSearch(searchFieldValue), [searchFieldValue, setSearch]);

	const onFieldSubmit = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				setSearch(searchFieldValue);
			}
		},
		[searchFieldValue, setSearch],
	);

	return (
		<Stack spacing={2} direction={'row'} alignItems={'center'}>
			<Box sx={{ maxWidth: theme.typography.pxToRem(300), width: '100%' }}>
				<StyledWrapper>
					<Controller
						name={FORM_NAMES.search}
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								fullWidth
								label={'Search'}
								size={'small'}
								onKeyDown={onFieldSubmit}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='search'
												edge='end'
												type={'button'}
												onClick={onSubmit}
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
				</StyledWrapper>
			</Box>
		</Stack>
	);
};
