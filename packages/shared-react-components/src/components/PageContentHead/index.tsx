import { Box, Container, Divider, Stack, Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { PageContentHeadProps } from '~/components/PageContentHead/types';
import { Book } from '~/icons/Book';

import { Breadcrumbs } from '../Layout/Breadcrumbs';
import { StyledBookmarkButton } from './styles';

export const PageContentHead: FC<PageContentHeadProps> = ({
	breadcrumbs,
	title,
	rightContent,
	handleBookmarkClick,
}) => {
	const theme = useTheme();

	return (
		<Container maxWidth={'lg'}>
			<Stack
				direction={'row'}
				sx={{
					pt: theme.typography.pxToRem(14),
				}}
				alignItems={'center'}
			>
				{breadcrumbs?.length || title ? (
					<Box>
						{breadcrumbs?.length ? (
							<Box sx={{ mb: theme.typography.pxToRem(8) }}>
								<Breadcrumbs breadcrumbs={breadcrumbs} />
							</Box>
						) : null}
						{title ? (
							<>
								<Stack direction={'row'} spacing={3}>
									<Typography variant={'h4'}>{title}</Typography>
									{handleBookmarkClick && (
										<StyledBookmarkButton
											disableRipple
											disableFocusRipple
											onClick={handleBookmarkClick}
										>
											<Book />
										</StyledBookmarkButton>
									)}
								</Stack>

								<Divider sx={{ my: theme.typography.pxToRem(8) }} />
							</>
						) : null}
					</Box>
				) : null}
				<Box flexGrow={'1'}>{rightContent}</Box>
			</Stack>
		</Container>
	);
};
