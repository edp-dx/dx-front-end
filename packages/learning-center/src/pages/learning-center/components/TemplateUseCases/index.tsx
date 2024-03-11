import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import React, { FC } from 'react';
import { useLearningCenterStore } from '~/store/LearningCenter';

import { LEARNING_CENTER_CARD_TYPES } from '../../constants';
import { ContentType } from './components/ContentType';
import { StyledContent, StyledLink, StyledPagination, StyledTemplateUseCases } from './styles';
import { TemplateUseCasesProps } from './types';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}

export const TemplateUseCases: FC<TemplateUseCasesProps> = ({ currentCard }) => {
	const { filter } = useLearningCenterStore();
	const theme = useTheme();

	const pagination = currentCard?.children?.length;
	const [page, setPage] = React.useState(1);

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<StyledTemplateUseCases>
			<Stack
				direction={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}
				sx={{ pb: 2 }}
			>
				<Stack direction={'row'} alignItems={'center'}>
					<ArrowBackIcon color={'action'} />
					{filter ? (
						<StyledLink to='/learning-center'>Back to All Results</StyledLink>
					) : currentCard.type === LEARNING_CENTER_CARD_TYPES.USE_CASE ? (
						<StyledLink to='/learning-center'>Back to All Cases</StyledLink>
					) : currentCard.type === LEARNING_CENTER_CARD_TYPES.DOC_AS_CODE ? (
						<StyledLink to='/learning-center'>Back to List</StyledLink>
					) : null}
				</Stack>
				<Stack direction={'row'} spacing={2}>
					<Typography variant='h6' color={theme.palette.primary.main}>
						{currentCard.type === LEARNING_CENTER_CARD_TYPES.USE_CASE
							? 'Case Study:'
							: 'Article:'}
					</Typography>
					<Typography variant='h6' color={theme.palette.text.secondary}>
						{' '}
						{currentCard.title}
					</Typography>
				</Stack>
			</Stack>
			<Box sx={{ pl: 10, pt: 4 }}>
				{currentCard?.children?.map((item, index) => (
					<CustomTabPanel key={index} value={page} index={index + 1}>
						<Typography variant='h4' color={theme.palette.secondary.main}>
							{item.title}
						</Typography>
						<Divider sx={{ pt: 2 }} />
						<StyledContent>
							{item.content?.map((item, index: number) => (
								<ContentType key={index} item={item} />
							))}
						</StyledContent>
					</CustomTabPanel>
				))}
				<Divider />
				<StyledPagination>
					{currentCard?.children?.length > 1 && (
						<Pagination
							color='secondary'
							size='large'
							onChange={handleChange}
							page={page}
							count={pagination}
						/>
					)}
				</StyledPagination>
			</Box>
		</StyledTemplateUseCases>
	);
};
