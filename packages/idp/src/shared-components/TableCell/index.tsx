import { Box, Link, Stack, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Document } from '~/icons/Document';
import { GitPull } from '~/icons/GitPull';
import { StyledLinkWithDisabledStatus } from '~/shared-styles';

import { StyledLink } from './styles';
import { TableCellProps } from './types';

export function TableCell<T>({
	name,
	document,
	prLink,
	data,
	modal: TableModal,
	shouldDisplayDocument,
	shouldDisplayPrLink,
	maxWidth = '112px',
}: TableCellProps<T>) {
	const [appDetailsOpen, setAppDetailsOpen] = useState<boolean>(false);
	const handleAppDetailsClose = () => {
		setAppDetailsOpen(false);
	};

	const handleAppDetailsOpen = () => {
		setAppDetailsOpen(true);
	};

	return (
		<>
			<Stack direction={'row'}>
				<Tooltip title={name} placement={'top'} arrow>
					<Box
						sx={{
							maxWidth,
						}}
					>
						<Link href={'#'} onClick={handleAppDetailsOpen} underline={'none'}>
							<Typography variant={'body1'}>{name}</Typography>
						</Link>
					</Box>
				</Tooltip>
				{document && shouldDisplayDocument && (
					<Tooltip title={'App Documentation'} placement={'top'} arrow>
						<StyledLink target='_blank' href={document}>
							<Document />
						</StyledLink>
					</Tooltip>
				)}
				{shouldDisplayPrLink && (
					<StyledLinkWithDisabledStatus target='_blank' href={prLink} disabled={!prLink}>
						<GitPull width='24px' height='24px' />
					</StyledLinkWithDisabledStatus>
				)}
			</Stack>
			<TableModal open={appDetailsOpen} onClose={handleAppDetailsClose} data={data} />
		</>
	);
}
