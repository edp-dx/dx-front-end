import { Dialog, DialogContent, Stack, Typography, useTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { useLearningCenterStore } from 'learningCenter/LearningCenter';
import { NavContent } from 'learningCenter/NavContent';
import { NavTabs } from 'learningCenter/NavTabs';
import { Search } from 'learningCenter/Search';
import { SearchList } from 'learningCenter/SearchList';
import React, { ReactElement, useCallback, useEffect } from 'react';
import { Background } from '~/icons/Background';
import { Logo } from '~/icons/Logo';

import {
	StyledContent,
	StyledContentHeader,
	StyledContentHeaderBackground,
	StyledContentHeaderContent,
	StyledContentInner,
	StyledMain,
	StyledNav,
} from './styles';

export const LearningCenter = (): ReactElement => {
	const { open, setOpen, setFilter, setActiveTabIdx, filter } = useLearningCenterStore();
	const theme = useTheme();

	const handleClose = useCallback(() => {
		setOpen(false);
		setFilter(null);
	}, [setFilter, setOpen]);

	useEffect(() => {
		const setLearningCenterOpenEventListener = () => {
			setOpen(true);
		};
		window.addEventListener('dx_learning_center_open', setLearningCenterOpenEventListener);

		return () => {
			window.removeEventListener(
				'dx_learning_center_open',
				setLearningCenterOpenEventListener,
			);
		};
	}, [setActiveTabIdx, setFilter, setOpen]);

	return (
		<Dialog
			open={open}
			maxWidth={'lgDefault'}
			fullWidth
			sx={{ '& .MuiDialog-paper': { maxHeight: 'calc(100% - 17.54vh)', height: '100%' } }}
			onClose={handleClose}
			keepMounted
		>
			<DialogContent sx={{ p: 0 }}>
				<StyledMain>
					<StyledNav>
						<Stack
							direction={'row'}
							spacing={3}
							alignItems={'center'}
							sx={{ pl: theme.typography.pxToRem(15) }}
						>
							<Logo
								width={theme.typography.pxToRem(40)}
								height={theme.typography.pxToRem(40)}
								color={blueGrey[600]}
							/>
							<Typography variant={'h6'} color={blueGrey[600]}>
								Learning Center
							</Typography>
						</Stack>
						<NavTabs />
					</StyledNav>
					<StyledContent>
						<StyledContentHeader>
							<StyledContentHeaderBackground>
								<Background width={'100%'} height={'100%'} />
							</StyledContentHeaderBackground>
							<StyledContentHeaderContent>
								<Search iconColor={theme.palette.common.white} />
							</StyledContentHeaderContent>
						</StyledContentHeader>
						<StyledContentInner>
							{filter ? <SearchList /> : <NavContent />}
						</StyledContentInner>
					</StyledContent>
				</StyledMain>
			</DialogContent>
		</Dialog>
	);
};
