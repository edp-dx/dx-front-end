/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, AlertProps, Snackbar } from '@mui/material';
import React, { createContext, useCallback, useContext, useState } from 'react';

export const Context = createContext({
	handleOpen: (_data: AlertProps) => null,
});

export const NotyProvider = ({ children }: any) => {
	const [noty, setNoty] = useState<AlertProps>(undefined);
	const [visibleNoty, setVisibleNoty] = useState<boolean>(false);

	const handleClose = useCallback(() => {
		setVisibleNoty(false);
	}, []);

	const handleOpen = useCallback((data: AlertProps) => {
		setNoty(data);
		setVisibleNoty(true);
	}, []);

	return (
		<Context.Provider value={{ handleOpen }}>
			<Snackbar
				open={visibleNoty}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				{noty && <Alert onClose={handleClose} {...noty} sx={{ width: '100%' }} />}
			</Snackbar>
			{children}
		</Context.Provider>
	);
};

export const useHandleNoty = () => useContext(Context).handleOpen;
