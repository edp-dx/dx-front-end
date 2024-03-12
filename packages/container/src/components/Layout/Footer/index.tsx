import { Container, Divider, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { blueGrey } from '@mui/material/colors';
import React from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { LogoWithText } from '~/icons/LogoWithText';
import { Subtract } from '~/icons/Subtract';

import { useSocials } from './hooks/useSocials';
import { StyledFooter, useStyles } from './styles';

export const Footer = (): ReactElement => {
	const theme = useTheme();
	const { socials } = useSocials();
	const { classes } = useStyles();

	return (
		<StyledFooter>
			<Container sx={{ position: 'relative' }}>
				<Subtract className={classes.subtract} />
				<Grid container>
					<Grid xs={12}>
						<Grid
							container
							justifyContent={'space-between'}
							columnSpacing={5}
							alignItems={'center'}
						>
							<Grid>
								<LogoWithText
									color={blueGrey[200]}
									width={theme.typography.pxToRem(187)}
									height={theme.typography.pxToRem(52)}
								/>
							</Grid>
							<Grid>
								<Grid container spacing={6.75}>
									{socials.map(({ href, title, icon }, idx) => {
										const key = `${title}::${idx}`;

										return (
											<Grid key={key}>
												<Link
													to={href}
													title={title}
													className={classes.link}
												>
													{icon}
												</Link>
											</Grid>
										);
									})}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid xs={12}>
						<Divider className={classes.divider} />
					</Grid>
					<Grid xs={12}>
						<Grid container justifyContent={'space-between'} columnSpacing={5}>
							<Grid>
								<Typography
									variant={'body2'}
									fontWeight={500}
									color={blueGrey[200]}
								>
									Developer Experience Demo Portal ver. 1.2.1
								</Typography>
							</Grid>
							<Grid>
								<Link to={'/'} className={classes.link}>
									<Typography variant={'body2'} color={theme.palette.info.dark}>
										Terms of Usage
									</Typography>
								</Link>
							</Grid>
							<Grid>
								<Typography
									variant={'body2'}
									fontWeight={500}
									color={blueGrey[200]}
								>
									© 2024 EPAM Systems. All rights reserved.
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</StyledFooter>
	);
};