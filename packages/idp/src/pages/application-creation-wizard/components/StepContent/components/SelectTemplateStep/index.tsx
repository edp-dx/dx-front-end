import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	IconButton,
	RadioGroup,
	Stack,
	Tooltip,
	Typography,
	useTheme,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { shallow } from 'zustand/shallow';
import { GridView } from '~/icons/GridView';
import { ListView } from '~/icons/ListView';
import { FORM_NAMES } from '~/pages/application-creation-wizard/names';
import { DataService } from '~/services/data';
import { Template } from '~/services/data/categories/model';
import { REQUEST_KEY_GET_TEMPLATE_CATEGORIES } from '~/services/data/categories/requestKeys';
import { SharedTable } from '~/shared-components/Table';
import { useCreateApplicationWizardStore } from '~/store/CreateApplicationWizard';
import { ValueOf } from '~/types/common';

import { Search } from './components/Search';
import { TemplateCheckboxCard } from './components/TemplateCheckboxCard';
import { VIEW_TYPES } from './constants';
import { useColumns } from './hooks/useColumns';
import {
	StyledAccordion,
	StyledAccordionDescription,
	StyledAccordionDetails,
	StyledAccordionSummary,
	StyledAccordionSummaryInner,
	StyledAccordionTitle,
	StyledStepContentHeader,
	StyledTable,
} from './styles';

export const SelectTemplateStep = () => {
	const { isLoading, error, data } = useQuery(
		REQUEST_KEY_GET_TEMPLATE_CATEGORIES,
		() => DataService.getTemplateCategories(),
		{
			staleTime: Infinity,
		},
	);

	const columns = useColumns();
	const theme = useTheme();
	const [search, setSearch] = useState<string>('');
	const [activeViewType, setActiveViewType] = useState<ValueOf<typeof VIEW_TYPES>>(
		VIEW_TYPES['GRID'],
	);

	const [expandedCategoryAccordions, setExpandedCategoryAccordions] = React.useState<string[]>([
		'template-accordion::0',
	]);

	const searchFunction = useCallback((el: Template, search: string) => {
		const searchEntryLowerCase = search.toLowerCase();

		return (
			el.name.toLowerCase().includes(searchEntryLowerCase) ||
			el.language.toLowerCase().includes(searchEntryLowerCase) ||
			el.buildTool.toLowerCase().includes(searchEntryLowerCase) ||
			el.framework.toLowerCase().includes(searchEntryLowerCase) ||
			el.deploymentPlatform.toLowerCase().includes(searchEntryLowerCase) ||
			el.description.toLowerCase().includes(searchEntryLowerCase)
		);
	}, []);

	const handleSearch = useCallback(
		(value: string) => {
			setSearch(value);

			if (value === '') {
				setExpandedCategoryAccordions(['template-accordion::0']);
				return;
			}

			const result = data
				.map((category, categoryIdx) => {
					const templatesSearchResult = category.templates.filter((template) =>
						searchFunction(template, value),
					);

					if (!templatesSearchResult.length) {
						return;
					}

					return `template-accordion::${categoryIdx}`;
				})
				.filter(Boolean);
			setExpandedCategoryAccordions(result);
		},
		[data, searchFunction],
	);

	const handleAccordionChange = useCallback(
		(key: string) => () => {
			setExpandedCategoryAccordions((prev) => {
				if (!prev.includes(key)) {
					return [...prev, key];
				}

				return prev.filter((el) => el !== key);
			});
		},
		[],
	);

	const { activeStepIndex, setActiveStepIndex, setLastCompletedStepIndex } =
		useCreateApplicationWizardStore(
			(state) => ({
				activeStepIndex: state.activeStepIndex,
				setActiveStepIndex: state.setActiveStepIndex,
				setLastCompletedStepIndex: state.setLastCompletedStepIndex,
			}),
			shallow,
		);

	const handleClickPrev = useCallback(() => {
		setActiveStepIndex(activeStepIndex - 1);
	}, [activeStepIndex, setActiveStepIndex]);

	const handleClickNext = useCallback(() => {
		setLastCompletedStepIndex(activeStepIndex);
		setActiveStepIndex(activeStepIndex + 1);
	}, [activeStepIndex, setActiveStepIndex, setLastCompletedStepIndex]);

	const { watch, setValue } = useFormContext();

	const templateIdFieldValue = watch(FORM_NAMES.templateID);

	return (
		<>
			<StyledStepContentHeader
				direction={'row'}
				alignItems={'center'}
				justifyContent={'space-between'}
				spacing={4}
			>
				<Stack direction={'row'} alignItems={'center'} spacing={4}>
					<Search setSearch={handleSearch} />
				</Stack>
				<Stack direction={'row'} alignItems={'center'}>
					<IconButton
						onClick={() =>
							activeViewType === VIEW_TYPES['LIST']
								? setActiveViewType(VIEW_TYPES['GRID'])
								: false
						}
					>
						<GridView
							color={
								activeViewType === VIEW_TYPES['GRID']
									? theme.palette.primary.main
									: theme.palette.action.active
							}
						/>
					</IconButton>
					<IconButton
						onClick={() =>
							activeViewType === VIEW_TYPES['GRID']
								? setActiveViewType(VIEW_TYPES['LIST'])
								: false
						}
					>
						<ListView
							color={
								activeViewType === VIEW_TYPES['LIST']
									? theme.palette.primary.main
									: theme.palette.action.active
							}
						/>
					</IconButton>
				</Stack>
			</StyledStepContentHeader>
			<Box
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				justifyContent={'center'}
				flexGrow={1}
			>
				<FormControl
					sx={{ width: '100%', alignItems: 'center' }}
					hidden={activeViewType === VIEW_TYPES['LIST']}
				>
					<RadioGroup
						name={'template-id'}
						sx={{ width: '100%', alignItems: 'center' }}
						hidden={activeViewType === VIEW_TYPES['LIST']}
					>
						{error ? (
							<Typography color={'error'} variant={'h6'}>
								{error.toString()}
							</Typography>
						) : isLoading ? (
							<CircularProgress />
						) : data ? (
							data.map(({ ID, name, description, templates }, categoryIdx) => {
								const key = `template-accordion::${categoryIdx}`;
								const searchResult = templates.filter((el) =>
									searchFunction(el, search),
								);

								const expanded = expandedCategoryAccordions.includes(key);

								return (
									<StyledAccordion
										key={key}
										expanded={expanded}
										onChange={handleAccordionChange(key)}
									>
										<StyledAccordionSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls='panel1a-content'
											id='panel1a-header'
										>
											<StyledAccordionSummaryInner
												direction={'row'}
												alignItems={'center'}
												spacing={16}
											>
												<Tooltip title={name} placement={'top'} arrow>
													<StyledAccordionTitle
														variant={'body1'}
														fontWeight={500}
														color={theme.palette.text.primary}
													>
														{name}
													</StyledAccordionTitle>
												</Tooltip>
												<Tooltip
													title={description}
													placement={'top'}
													arrow
												>
													<StyledAccordionDescription
														variant={'body1'}
														color={theme.palette.text.secondary}
													>
														{description}
													</StyledAccordionDescription>
												</Tooltip>
											</StyledAccordionSummaryInner>
										</StyledAccordionSummary>
										<StyledAccordionDetails>
											{activeViewType === VIEW_TYPES['GRID'] ? (
												<Grid container spacing={8}>
													{searchResult.map((template) => {
														const { name } = template;

														const key = `template-accordion::${ID}-card::${name}`;
														return (
															<Grid xs={6} key={key}>
																<TemplateCheckboxCard
																	template={template}
																/>
															</Grid>
														);
													})}
												</Grid>
											) : (
												<StyledTable>
													<SharedTable
														columns={columns}
														data={searchResult}
														isLoading={isLoading}
														error={error}
														onRowClick={(event, row: Template) => {
															setValue(FORM_NAMES.templateID, row.ID);
															setValue(
																FORM_NAMES.categoryID,
																row.categoryID,
															);
														}}
														isSelected={(row) =>
															row.ID === templateIdFieldValue
														}
													/>
												</StyledTable>
											)}
										</StyledAccordionDetails>
									</StyledAccordion>
								);
							})
						) : null}
					</RadioGroup>
				</FormControl>
			</Box>
			<Stack
				direction={'row'}
				justifyContent={'flex-end'}
				spacing={2}
				sx={{ mt: 'auto', pt: theme.typography.pxToRem(16) }}
			>
				<Button size={'large'} variant={'text'} onClick={handleClickPrev}>
					Back
				</Button>
				<Button
					size={'large'}
					variant={'contained'}
					onClick={handleClickNext}
					disabled={!templateIdFieldValue}
				>
					Next
				</Button>
			</Stack>
		</>
	);
};
