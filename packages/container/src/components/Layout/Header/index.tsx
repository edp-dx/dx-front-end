import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { Container, IconButton, Stack, Tooltip, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { blueGrey } from '@mui/material/colors';
import * as React from 'react';
import { FC, ReactElement, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { NavigationItem } from '~/components/Layout/Header/components/NavigationItem';
import { LogoWithText } from '~/icons/LogoWithText';
import { useOnboardingTourStore } from '~/store/OnboardingTour';

import { HelpMenu } from './components/HelpMenu';
import { ProfileMenu } from './components/ProfileMenu';
import { StyledHeader, StyledLogoWrapper, useStyles } from './styles';
import { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({ navLinks }): ReactElement => {
	const { classes } = useStyles();
	const theme = useTheme();
	const { mainTutorial } = useOnboardingTourStore(
		(state) => ({
			mainTutorial: state.mainTutorial,
		}),
		shallow,
	);

	return (
		<StyledHeader ref={mainTutorial.refs.headerRef as RefObject<HTMLDivElement>}>
			<Container maxWidth={'lgHeader'}>
				<Stack direction={'row'} spacing={4} alignItems={'center'}>
					<StyledLogoWrapper>
						<Link to={'/'} className={classes.logoLink}>
							<LogoWithText
								width={theme.typography.pxToRem(150)}
								height={theme.typography.pxToRem(44)}
								color={blueGrey['600']}
							/>
						</Link>
					</StyledLogoWrapper>
					<Grid container columnSpacing={1} alignItems={'center'}>
						<Grid>
							<Grid container columnSpacing={4}>
								{navLinks.map(({ to, name, exact, subMenuList }) => {
									const key = `nav-link::${name}`;

									return (
										<Grid key={key}>
											<NavigationItem
												to={to}
												name={name}
												exact={exact}
												subMenuList={subMenuList}
											/>
										</Grid>
									);
								})}
							</Grid>
						</Grid>
						<Grid sx={{ pr: theme.typography.pxToRem(10) }}>
							<Grid container columnSpacing={0}>
								<Grid>
									<Tooltip title={'Search'} arrow>
										<IconButton
											sx={{ color: blueGrey['600'] }}
											aria-label='Search'
											component='label'
										>
											<SearchIcon />
										</IconButton>
									</Tooltip>
								</Grid>
								<Grid>
									<Tooltip title={'Notifications'} arrow>
										<IconButton
											sx={{ color: blueGrey['600'] }}
											aria-label='Notifications'
											component='label'
										>
											<NotificationsIcon />
										</IconButton>
									</Tooltip>
								</Grid>
								<Grid>
									<HelpMenu />
								</Grid>
							</Grid>
						</Grid>
						<Grid>
							<ProfileMenu />
						</Grid>
					</Grid>
				</Stack>
			</Container>
		</StyledHeader>
	);
};
