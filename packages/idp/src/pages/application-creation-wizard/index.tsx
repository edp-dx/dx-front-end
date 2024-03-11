import React, { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { ChatDialog } from '~/components/ChatDialog';
import { DataService } from '~/services/data';
import { CreateApplicationPayload } from '~/services/data/applications/model';
import {
	REQUEST_KEY_CREATE_APPLICATION_RESPONSE,
	REQUEST_KEY_GET_APPLICATIONS,
} from '~/services/data/applications/requestKeys';
import { PageContent } from '~/shared-components/PageContent';
import { PageContentHead } from '~/shared-components/PageContentHead';
import { useCreateApplicationWizardStore } from '~/store/CreateApplicationWizard';
import { FormValues } from '~/types/common';

import { Navigation } from './components/Navigation';
import { StepContent } from './components/StepContent';
import { useBreadcrumbs } from './hooks/useBreadcrumbs';
import { useSteps } from './hooks/useSteps';
import { FORM_NAMES } from './names';
import { StyledContainer, StyledWizard, StyledWizardContent, StyledWizardNav } from './styles';

export const ApplicationCreationWizard = () => {
	const steps = useSteps();
	const breadcrumbs = useBreadcrumbs();
	const { activeStepIndex, clearStore, setFormRootNode, defaultValues } =
		useCreateApplicationWizardStore(
			(state) => ({
				defaultValues: state.defaultValues,
				activeStepIndex: state.activeStepIndex,
				setFormRootNode: state.setFormRootNode,
				clearStore: state.clearStore,
			}),
			shallow,
		);

	const methods = useForm({
		mode: 'onBlur',
		defaultValues,
	});
	const { handleSubmit, reset } = methods;
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: 'createApplication',
		mutationFn: (payload: CreateApplicationPayload) => DataService.createApplication(payload),
		onSuccess: async (data) => {
			queryClient.setQueryData(REQUEST_KEY_CREATE_APPLICATION_RESPONSE, data);
			await queryClient.invalidateQueries({
				queryKey: [REQUEST_KEY_GET_APPLICATIONS],
			});
		},
	});

	const onSubmit = ({
		name,
		description,
		owner,
		businessUnitName,
		templateID,
		enterpriseOneID,
		systemID,
		document,
	}: FormValues<typeof FORM_NAMES>) =>
		mutation.mutate({
			name,
			document,
			description,
			owner,
			businessUnitName,
			enterpriseOneID,
			templateID: Number(templateID),
			systemID: Number(systemID),
		});

	const location = useLocation();

	const handleLeaveRoute = useCallback(async () => {
		await queryClient.invalidateQueries({
			queryKey: [REQUEST_KEY_CREATE_APPLICATION_RESPONSE],
		});
		clearStore();
		reset();
	}, [clearStore, queryClient, reset]);

	useEffect(() => {
		return () => {
			handleLeaveRoute().catch((error) => console.error(error));
		};
	}, [handleLeaveRoute, location]);

	return (
		<>
			<PageContentHead breadcrumbs={breadcrumbs} />
			<PageContent>
				<StyledContainer maxWidth={'lg'}>
					<StyledWizard>
						<StyledWizardNav>
							<Navigation />
						</StyledWizardNav>
						<StyledWizardContent>
							<FormProvider {...methods}>
								<form
									onSubmit={handleSubmit(onSubmit)}
									ref={(node) => (node ? setFormRootNode(node) : null)}
									style={{ height: '100%' }}
								>
									{steps.map((step, idx) => {
										const key = `tabpanel::${step.id}`;

										return (
											<StepContent
												key={key}
												activeStepIndex={activeStepIndex}
												index={idx}
												step={step}
											/>
										);
									})}
								</form>
							</FormProvider>
						</StyledWizardContent>
					</StyledWizard>
				</StyledContainer>
				<ChatDialog anchorEl={null} />
			</PageContent>
		</>
	);
};
