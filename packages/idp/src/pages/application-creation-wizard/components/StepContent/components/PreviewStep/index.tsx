import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Stack, Tooltip, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { shallow } from 'zustand/shallow';
import { KeyValue } from '~/components/KeyValue';
import { FORM_NAMES } from '~/pages/application-creation-wizard/names';
import { DataService } from '~/services/data';
import { REQUEST_KEY_GET_TEMPLATE_CATEGORIES } from '~/services/data/categories/requestKeys';
import { useCreateApplicationWizardStore } from '~/store/CreateApplicationWizard';

import {
	StyledAccordion,
	StyledAccordionDetails,
	StyledAccordionSummary,
	StyledAccordionSummaryInner,
	StyledAccordionTitle,
} from './styles';

export const PreviewStep = () => {
	const theme = useTheme();
	const { data } = useQuery(
		REQUEST_KEY_GET_TEMPLATE_CATEGORIES,
		() => DataService.getTemplateCategories(),
		{
			staleTime: Infinity,
		},
	);

	const { watch } = useFormContext();

	const categoryIdFieldValue = watch(FORM_NAMES.categoryID);
	const templateIdFieldValue = watch(FORM_NAMES.templateID);

	const templatesByCategoryAndTemplateIds = useMemo(
		() =>
			data
				.filter((el) => el.ID === categoryIdFieldValue)?.[0]
				?.templates.filter((el) => el.ID === templateIdFieldValue),
		[categoryIdFieldValue, data, templateIdFieldValue],
	);

	const formValues = {
		appName: watch(FORM_NAMES.name),
		appDescription: watch(FORM_NAMES.description),
		appUniqueId: watch(FORM_NAMES.enterpriseOneID),
		businessUnitName: watch(FORM_NAMES.businessUnitName),
	};

	const [expanded, setExpanded] = React.useState<string | false>('panel::0');

	const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	const { formRootNode, activeStepIndex, setActiveStepIndex, setLastCompletedStepIndex } =
		useCreateApplicationWizardStore(
			(state) => ({
				formRootNode: state.formRootNode,
				activeStepIndex: state.activeStepIndex,
				setActiveStepIndex: state.setActiveStepIndex,
				setLastCompletedStepIndex: state.setLastCompletedStepIndex,
			}),
			shallow,
		);

	const handleClickPrev = useCallback(() => {
		setActiveStepIndex(activeStepIndex - 1);
	}, [activeStepIndex, setActiveStepIndex]);

	const handleClickRun = useCallback(() => {
		formRootNode.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
		setLastCompletedStepIndex(activeStepIndex);
		setActiveStepIndex(activeStepIndex + 1);
	}, [activeStepIndex, formRootNode, setActiveStepIndex, setLastCompletedStepIndex]);

	return (
		<>
			<Grid
				container
				alignItems={'center'}
				columnSpacing={8}
				rowSpacing={2}
				sx={{ mb: theme.typography.pxToRem(16) }}
			>
				<Grid xs={4}>
					<KeyValue keyStr={'Application Name'} valueStr={formValues.appName} />
				</Grid>
				<Grid xs={4}>
					<KeyValue keyStr={'Enterprise Unique ID'} valueStr={formValues.appUniqueId} />
				</Grid>
				<Grid xs={4}>
					<KeyValue
						keyStr={'Business Unit Name'}
						valueStr={formValues.businessUnitName}
					/>
				</Grid>
				<Grid xs={12}>
					<KeyValue
						keyStr={'Application Description'}
						valueStr={formValues.appDescription}
					/>
				</Grid>
			</Grid>
			<div>
				{templatesByCategoryAndTemplateIds?.[0]?.components.map(
					({ name, properties }, idx) => {
						const key = `template::${name}`;
						const panelId = `panel::${idx}`;

						return (
							<StyledAccordion
								key={key}
								expanded={expanded === panelId}
								onChange={handleChange(panelId)}
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
									</StyledAccordionSummaryInner>
								</StyledAccordionSummary>
								<StyledAccordionDetails>
									<Grid
										container
										alignItems={'center'}
										columnSpacing={8}
										rowSpacing={4}
									>
										{properties.map(({ name, value }) => {
											const key = `property::${name}`;

											return (
												<Grid xs={4} key={key}>
													<KeyValue keyStr={name} valueStr={value} />
												</Grid>
											);
										})}
									</Grid>
								</StyledAccordionDetails>
							</StyledAccordion>
						);
					},
				)}
			</div>
			<Stack
				direction={'row'}
				justifyContent={'flex-end'}
				spacing={2}
				sx={{ mt: 'auto', pt: theme.typography.pxToRem(16) }}
			>
				<Button size={'large'} variant={'text'} onClick={handleClickPrev}>
					Back
				</Button>
				<Button size={'large'} variant={'contained'} onClick={handleClickRun}>
					Run
				</Button>
			</Stack>
		</>
	);
};
