import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Divider, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import { shallow } from 'zustand/shallow';
import { Book } from '~/icons/Book';
import { WidgetPresets } from '~/pages/dashboard/components/WidgetPresets';
import { StyledBookmarkButton } from '~/pages/dashboard/styles';
import { SLOT_AMOUNT, useDashboardStore } from '~/store/Dashboard';
import { WIDGET_MODAL_MODE } from '~/store/Dashboard/constants';

import { Active } from './components/Active';
import { Aside } from './components/Aside';
import { DeleteModal } from './components/DeleteModal';
import { Insight } from './components/Insight';
import { WidgetModal } from './components/WidgetModal';
import sources from './mocks/sources.mock.json';
import { Source } from './mocks/types';

export const Dashboard = () => {
	const theme = useTheme();

	const { widgets, setWidgetModal } = useDashboardStore(
		(state) => ({
			widgets: state.widgets,
			setWidgetModal: state.setWidgetModal,
		}),
		shallow,
	);

	useQuery<unknown, unknown, Source[]>(
		'sourcesData',
		() => new Promise((resolve) => resolve(sources as Source[])),
	);

	const canCreateWidget = useMemo(() => widgets.length < SLOT_AMOUNT, [widgets]);
	const handleOpenCreateModal = () => setWidgetModal(true, WIDGET_MODAL_MODE.CREATE);

	const handleBookmarkClick = useCallback(() => {
		window.dispatchEvent(new CustomEvent('dx_learning_center_open'));
		window.dispatchEvent(
			new CustomEvent('dx_learning_center_set_filter', {
				detail: {
					data: {
						filter: 'Dashboard',
					},
				},
			}),
		);
	}, []);

	return (
		<>
			<Container maxWidth={'lgDefault'}>
				<Box
					sx={{
						pt: theme.typography.pxToRem(16),
						pb: theme.typography.pxToRem(8),
						mb: theme.typography.pxToRem(24),
					}}
				>
					<Grid
						container
						alignItems={'center'}
						justifyContent={'space-between'}
						spacing={4}
						sx={{ m: 0 }}
					>
						<Grid>
							<Stack direction={'row'} alignItems={'center'} spacing={3}>
								<Typography variant={'h4'} color={theme.palette.text.primary}>
									My Widgets
								</Typography>
								<StyledBookmarkButton
									disableRipple
									disableFocusRipple
									onClick={handleBookmarkClick}
								>
									<Book />
								</StyledBookmarkButton>
							</Stack>
						</Grid>
						<Grid>
							<Stack direction={'row'} alignItems={'center'}>
								<WidgetPresets />
								<Divider
									orientation={'vertical'}
									sx={{ height: theme.typography.pxToRem(32) }}
								/>
								<Button
									variant={'contained'}
									size={'large'}
									onClick={handleOpenCreateModal}
									disabled={!canCreateWidget}
									startIcon={<AddIcon />}
									sx={{ ml: theme.typography.pxToRem(65) }}
								>
									new widget
								</Button>
							</Stack>
						</Grid>
						<Grid xs={12} sx={{ py: 0 }}>
							<Divider />
						</Grid>
					</Grid>
				</Box>
				<Box sx={{ pb: theme.typography.pxToRem(80) }}>
					<Grid container spacing={8} flexWrap={'nowrap'} sx={{ p: 0 }}>
						<Grid
							flexGrow={1}
							display={'flex'}
							flexDirection={'column'}
							boxSizing={'content-box'}
						>
							<Box sx={{ mb: theme.typography.pxToRem(22) }}>
								<Insight />
							</Box>
							<Active />
						</Grid>
						<Grid sx={{ width: '222px' }} boxSizing={'content-box'} flexShrink={0}>
							<Aside />
						</Grid>
					</Grid>
				</Box>
			</Container>
			<WidgetModal />
			<DeleteModal />
		</>
	);
};
