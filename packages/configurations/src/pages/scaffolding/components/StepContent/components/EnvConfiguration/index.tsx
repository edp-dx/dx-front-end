import AddIcon from '@mui/icons-material/Add';
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

import { useConfigurations } from '../../../../hooks/useConfigurations';

export const EnvConfiguration = () => {
	const theme = useTheme();
	const data = useConfigurations();

	return (
		<>
			<Stack
				spacing={1}
				sx={{
					pt: theme.typography.pxToRem(8),
					pl: theme.typography.pxToRem(16),
					pb: theme.typography.pxToRem(168),
				}}
			>
				{data.map((item) => (
					<Stack key={item.uuid} spacing={1}>
						<Typography variant='h6'>{item.name}</Typography>
						<Stack
							direction={'row'}
							alignItems={'center'}
							justifyContent={'space-between'}
							spacing={6}
						>
							<Typography>{item.description}</Typography>
							<Button
								variant='text'
								sx={{
									color: theme.palette.text.primary,
									textTransform: 'uppercase',
									':hover': {
										bgcolor: theme.palette.action.hover,
									},
								}}
								startIcon={<AddIcon />}
								onClick={() => item?.handleCreateForm()}
							>
								{item.button}
							</Button>
						</Stack>
						<Divider />
						<Stack pl={4} pt={6} spacing={4}>
							{item.component}
						</Stack>
					</Stack>
				))}
			</Stack>
		</>
	);
};
