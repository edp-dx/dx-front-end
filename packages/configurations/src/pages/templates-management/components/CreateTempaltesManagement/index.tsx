import CloseIcon from '@mui/icons-material/Close';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
	Tabs,
	Typography,
	useTheme,
} from '@mui/material';
import React, { FC, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { DataService } from '~/services/data';
import { TemplatesManagementPayload } from '~/services/data/templateManagement/model';
import {
	REQUEST_KEY_CREATE_TEMPLATES_MANAGEMENT,
	REQUEST_KEY_GET_TEMPLATES_MANAGEMENT_LIST,
} from '~/services/data/templateManagement/requestKeys';
import { useTemplatesManagementStore } from '~/store/TemplatesManagement';
import { FormValues } from '~/types/common';

import { TemplatesManagementTabs } from '../../constants';
import { FORM_NAMES, FORM_NAMES_TYPES } from '../../names';
import { GeneralInfoTab } from '../GeneralInfoTab';
import { PermissionTab } from '../PermissionsTab';
import { TechnologiesTab } from '../TechnologiesTab';
import { VersionSetTab } from '../VersionSetTab';
import { StyledTab } from './styles';
import { CreateTemplatesManagementProps } from './types';

export const CreateTemplatesManagement: FC<CreateTemplatesManagementProps> = (props) => {
	const { open, onClose } = props;
	const theme = useTheme();
	const queryClient = useQueryClient();
	const { generalInfoTab, permissionsTab, technologiesTab, versionSetTab } =
		TemplatesManagementTabs;
	const { templatesManagementTab, setTemplatesManagementTab } = useTemplatesManagementStore();

	useEffect(() => {
		if (open) setTemplatesManagementTab(generalInfoTab);
	}, [setTemplatesManagementTab, open, generalInfoTab]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setTemplatesManagementTab(newValue);
	};

	const a11yProps = (index: number) => {
		return {
			id: `tab-${index}`,
			'aria-controls': `tabpanel-${index}`,
		};
	};

	const formMethods = useForm<FormValues<typeof FORM_NAMES_TYPES>>({
		mode: 'onChange',
		defaultValues: {
			status: 'Draft',
		},
	});

	const {
		watch,
		reset,
		formState: { isValid, errors },
		handleSubmit,
	} = formMethods;

	const mutationCreate = useMutation({
		mutationKey: REQUEST_KEY_CREATE_TEMPLATES_MANAGEMENT,
		mutationFn: (payload: TemplatesManagementPayload) =>
			DataService.createTemplatesManagement(payload),
		onSuccess: async (data) => {
			onClose();
			reset();
			queryClient.setQueryData(REQUEST_KEY_CREATE_TEMPLATES_MANAGEMENT, data);
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_TEMPLATES_MANAGEMENT_LIST],
			});
		},
	});

	const onSubmit = useCallback(
		(data: FormValues<typeof FORM_NAMES_TYPES>) => {
			const { owners } = data;
			mutationCreate.mutate({ ...data, owners: owners.split('; ') });
		},
		[mutationCreate],
	);

	const handleNextTab = useCallback(() => {
		setTemplatesManagementTab(templatesManagementTab + 1);
	}, [setTemplatesManagementTab, templatesManagementTab]);

	const handlePrevTab = useCallback(() => {
		setTemplatesManagementTab(templatesManagementTab - 1);
	}, [setTemplatesManagementTab, templatesManagementTab]);

	const disabledTabs = FORM_NAMES.TemplatesManagement.map((item) => {
		return watch(Object.values(item)).every((item: string) => {
			return Boolean(item);
		});
	});

	const validTabs = FORM_NAMES.TemplatesManagement.map((itemTab) => {
		return Object.keys(errors).some((item) => Object.keys(itemTab).includes(item));
	});

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth={'sm'}>
			<DialogTitle>
				<Stack
					direction={'row'}
					justifyContent={'space-between'}
					alignItems={'center'}
					spacing={4}
				>
					<Typography variant={'h4'}>Add New Template</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Stack>
			</DialogTitle>
			<DialogContent
				sx={{
					px: theme.typography.pxToRem(16),
					pb: 3,
					minHeight: theme.typography.pxToRem(470),
				}}
			>
				<FormProvider {...formMethods}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						id='create-form'
						style={{ width: '100%' }}
					>
						<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
							<Tabs
								variant='scrollable'
								value={templatesManagementTab}
								onChange={handleChange}
								aria-label='Templates Management Tabs'
								sx={{ borderColor: 'divider', minHeight: 'initial' }}
							>
								<StyledTab
									itemType={validTabs[generalInfoTab] ? 'error' : ''}
									label='General Info'
									{...a11yProps(generalInfoTab)}
								/>
								<StyledTab
									disabled={!disabledTabs[generalInfoTab]}
									itemType={validTabs[versionSetTab] ? 'error' : ''}
									label='Versions set'
									{...a11yProps(versionSetTab)}
								/>
								<StyledTab
									disabled={!disabledTabs[versionSetTab]}
									itemType={validTabs[technologiesTab] ? 'error' : ''}
									label='Technologies'
									{...a11yProps(technologiesTab)}
								/>
								<StyledTab
									disabled={!disabledTabs[technologiesTab]}
									itemType={validTabs[permissionsTab] ? 'error' : ''}
									label='Permissions'
									{...a11yProps(permissionsTab)}
								/>
							</Tabs>
						</Box>
						<GeneralInfoTab />
						<VersionSetTab />
						<TechnologiesTab />
						<PermissionTab />
					</form>
				</FormProvider>
			</DialogContent>
			<DialogActions
				sx={{
					justifyContent: 'center',
					mb: theme.typography.pxToRem(16),
					px: theme.typography.pxToRem(24),
					pb: 0,
				}}
			>
				<Stack direction={'row'} spacing={2}>
					{templatesManagementTab > 0 && (
						<Button
							key={'back-button'}
							size={'large'}
							style={{ color: theme.palette.action.disabled }}
							variant={'text'}
							onClick={handlePrevTab}
						>
							Back
						</Button>
					)}
					{templatesManagementTab === permissionsTab ? (
						<Button
							key={'submit-button'}
							form='create-form'
							size={'large'}
							type={'submit'}
							variant={'contained'}
							disabled={!isValid}
						>
							Add
						</Button>
					) : (
						<Button
							key={'next-button'}
							size={'large'}
							type='button'
							onClick={handleNextTab}
							variant={'contained'}
							disabled={!disabledTabs[templatesManagementTab]}
						>
							Next
						</Button>
					)}
				</Stack>
			</DialogActions>
		</Dialog>
	);
};
