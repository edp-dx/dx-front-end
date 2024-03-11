import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { ReactElement } from 'react';
import { shallow } from 'zustand/shallow';
import { useDashboardStore } from '~/store/Dashboard';
import { WIDGET_MODAL_MODE } from '~/store/Dashboard/constants';

import { SLOT_WRAPPER_HEIGHT } from '../../constants';
import { Slot } from '../Slot';
import { EmptySlot } from './components/EmptySlot';

export const Aside = (): ReactElement => {
	const theme = useTheme();
	const { slots, setWidgetModal } = useDashboardStore(
		(state) => ({
			slots: state.slots,
			setWidgetModal: state.setWidgetModal,
		}),
		shallow,
	);

	return (
		<>
			<Stack spacing={2} justifyContent={'space-between'} height={'100%'}>
				<div>
					<Typography variant={'h5'}>All Widgets</Typography>
					<Typography variant={'caption'}>Up to 5 widgets total</Typography>
				</div>
				<Box sx={{ height: theme.typography.pxToRem(SLOT_WRAPPER_HEIGHT) }}>
					<Stack sx={{ height: '100%' }} justifyContent={'space-between'}>
						{slots.aside.map((el, idx) => {
							const key = `slot::${idx}`;
							const isEmptySlot = !el?.widgetId;

							return (
								<Box key={key}>
									{isEmptySlot ? (
										<EmptySlot
											handleOpen={() =>
												setWidgetModal(true, WIDGET_MODAL_MODE.CREATE)
											}
										/>
									) : (
										<Slot slot={el} />
									)}
								</Box>
							);
						})}
					</Stack>
				</Box>
			</Stack>
		</>
	);
};
