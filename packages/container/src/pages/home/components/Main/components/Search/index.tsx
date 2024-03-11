import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
	Box,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Tooltip,
	useTheme,
} from '@mui/material';
import React, { ReactElement, RefObject } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';
import { useOnboardingTourStore } from '~/store/OnboardingTour';

import { StyledForm } from './styles';

export const Search = (): ReactElement => {
	const theme = useTheme();
	const { mainTutorial } = useOnboardingTourStore(
		(state) => ({
			mainTutorial: state.mainTutorial,
		}),
		shallow,
	);
	const { handleSubmit, control } = useForm();

	const onSubmit = (data: never) => console.log(data);

	return (
		<Stack
			spacing={2}
			direction={'row'}
			alignItems={'center'}
			ref={mainTutorial.refs.searchRef as RefObject<HTMLDivElement>}
			sx={{ maxWidth: theme.typography.pxToRem(676) }}
		>
			<Box sx={{ maxWidth: theme.typography.pxToRem(640), width: '100%' }}>
				<StyledForm onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='firstName'
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								fullWidth
								placeholder={'Enterprise Search'}
								size={'small'}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton aria-label='search' edge='end'>
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
			<Tooltip
				title={
					'Enable engineers to do AI/ML searches through source code, documentation, presentations, audio and video.'
				}
				placement={'top'}
				arrow
			>
				<InfoOutlinedIcon sx={{ display: 'block', color: theme.palette.action.active }} />
			</Tooltip>
		</Stack>
	);
};
