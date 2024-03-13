import HelpIcon from '@mui/icons-material/Help';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import {
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	PaperProps,
	useTheme,
} from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { useLearningCenterStore } from 'learningCenter/LearningCenter';
import { MouseEvent, ReactElement, RefObject, useCallback } from 'react';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { headerMenuList } from '~/components/Layout/Header/constants';
import { DocumentationFilled } from '~/icons/DocumentationFilled';
import { LighthouseOutlined } from '~/icons/LighthouseOutlined';
import { useHeaderStore } from '~/store/Header';
import { useOnboardingTourStore } from '~/store/OnboardingTour';

import { useStyles } from '../../styles';

export const HelpMenu = (): ReactElement => {
	const { classes } = useStyles();
	const {
		location: { pathname },
	} = useHistory();

	const theme = useTheme();
	const { welcomeModal, setWelcomeModal, reminderTutorial } = useOnboardingTourStore(
		(state) => ({
			welcomeModal: state.welcomeModal,
			setWelcomeModal: state.setWelcomeModal,
			reminderTutorial: state.reminderTutorial,
		}),
		shallow,
	);

	const { menuAnchors, setMenuAnchors } = useHeaderStore(
		(state) => ({
			menuAnchors: state.menuAnchors,
			setMenuAnchors: state.setMenuAnchors,
		}),
		shallow,
	);

	const { setOpen } = useLearningCenterStore();

	const handlePortalTourClick = useCallback(() => {
		setWelcomeModal({
			...welcomeModal,
			open: true,
		});
	}, [setWelcomeModal, welcomeModal]);

	const handleLearningCenterClick = useCallback(() => {
		setOpen(true);
	}, [setOpen]);

	const _PaperProps: Partial<PaperProps<'div'>> = {
		elevation: 0,
		className: classes.popover,
	};

	const handleOpen = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
			setMenuAnchors({
				[headerMenuList.HELP_MENU]: event.currentTarget,
			});
		},
		[setMenuAnchors],
	);

	const handleClose = useCallback(() => {
		setMenuAnchors({
			[headerMenuList.HELP_MENU]: null,
		});
	}, [setMenuAnchors]);

	const open = !!menuAnchors[headerMenuList.HELP_MENU];

	return (
		<div onMouseLeave={handleClose}>
			<IconButton
				ref={reminderTutorial.refs.helpMenuButtonRef as RefObject<HTMLButtonElement>}
				sx={{
					color:
						pathname === '/learning-center'
							? theme.palette.primary.main
							: blueGrey['600'],
					'&[aria-controls="help-menu"]': {
						color: theme.palette.primary.main,
					},
				}}
				aria-label='Help'
				onMouseOver={handleOpen}
				style={{ zIndex: 1301 }}
			>
				<HelpIcon />
			</IconButton>
			<Menu
				open={open}
				anchorEl={menuAnchors[headerMenuList.HELP_MENU]}
				ref={reminderTutorial.refs.helpMenuRef as RefObject<HTMLDivElement>}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				PaperProps={_PaperProps}
				keepMounted
				disableAutoFocusItem
				disableScrollLock
				MenuListProps={{
					onMouseLeave: handleClose,
				}}
				sx={{
					pointerEvents: 'none',

					'& .MuiPaper-root': {
						pointerEvents: 'auto',
					},
				}}
			>
				<MenuItem onClick={handlePortalTourClick}>
					<ListItemIcon color={theme.palette.action.active}>
						<LighthouseOutlined />
					</ListItemIcon>
					<ListItemText>Portal Tour</ListItemText>
				</MenuItem>
				<MenuItem onClick={handleLearningCenterClick}>
					<ListItemIcon color={theme.palette.action.active}>
						<SchoolOutlinedIcon />
					</ListItemIcon>
					<ListItemText>Learning Center</ListItemText>
				</MenuItem>
				<MenuItem>
					<ListItemIcon color={theme.palette.action.active}>
						<DocumentationFilled />
					</ListItemIcon>
					<ListItemText>Documentation</ListItemText>
				</MenuItem>
			</Menu>
		</div>
	);
};