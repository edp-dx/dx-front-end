import CachedIcon from '@mui/icons-material/Cached';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
	Box,
	ButtonBase,
	IconButton,
	InputAdornment,
	Stack,
	Tooltip,
	useTheme,
} from '@mui/material';
import React, { FC, ReactElement, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';
import { FormTextField } from '~/shared-components/FormTextField';
import { useLearningCenterStore } from '~/store/LearningCenter';

import { StyledForm } from './styles';
import { SearchFormTypes, SearchProps } from './types';

export const Search: FC<SearchProps> = ({ iconColor }): ReactElement => {
	const theme = useTheme();
	const { setFilter, open } = useLearningCenterStore(
		(state) => ({
			open: state.open,
			setFilter: state.setFilter,
		}),
		shallow,
	);

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
		setValue,
	} = useForm();

	useEffect(() => {
		if (!open) reset();
	}, [open, reset]);

	const onSubmit = useCallback(
		(data: SearchFormTypes) => {
			setFilter(data.search);
		},
		[setFilter],
	);

	const handleResetSearchField = useCallback(() => {
		reset();
		setFilter(null);
	}, [reset, setFilter]);

	useEffect(() => {
		const setLearningCenterFilterSearchEventListener = (
			event: CustomEvent<{ data: { filter: string } }>,
		) => {
			setValue('search', event.detail.data.filter);
			setFilter(event.detail.data.filter);
		};
		window.addEventListener(
			'dx_learning_center_set_filter',
			setLearningCenterFilterSearchEventListener,
		);

		return () => {
			window.removeEventListener(
				'dx_learning_center_set_filter',
				setLearningCenterFilterSearchEventListener,
			);
		};
	}, [setFilter, setValue]);

	return (
		<Stack
			spacing={2}
			direction={'row'}
			alignItems={'center'}
			sx={{ maxWidth: theme.typography.pxToRem(676), width: '100%' }}
		>
			<Box sx={{ maxWidth: theme.typography.pxToRem(630), width: '100%' }}>
				<StyledForm onSubmit={handleSubmit(onSubmit)}>
					<FormTextField
						{...register('search')}
						errors={errors}
						control={control}
						placeholder={'Search for tutorials, articles, help...'}
						TextFieldProps={{
							fullWidth: true,
							size: 'small',
							sx: {
								'& .MuiInputBase-root': {
									backgroundColor: theme.palette.common.white,
								},
							},
							InputProps: {
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton type='submit' aria-label='search' edge='end'>
											<SearchIcon
												sx={{
													width: theme.typography.pxToRem(24),
													height: theme.typography.pxToRem(24),
												}}
											/>
										</IconButton>
									</InputAdornment>
								),
							},
						}}
					/>
				</StyledForm>
			</Box>
			<Tooltip title={'Clear search field'} placement={'top'} arrow>
				<ButtonBase onClick={handleResetSearchField}>
					<CachedIcon sx={{ display: 'block', color: iconColor }} />
				</ButtonBase>
			</Tooltip>
			<Tooltip
				title={
					'Enable engineers to do AI/ML searches through source code, documentation, presentations, audio and video.'
				}
				placement={'top'}
				arrow
			>
				<InfoOutlinedIcon sx={{ display: 'block', color: iconColor }} />
			</Tooltip>
		</Stack>
	);
};
