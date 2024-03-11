import { GenAITask, GenAITasks } from '~/services/data/workflows/model';

import { Message } from '../types';

export const createMockMessages: Message[] = [
	{
		contents:
			'Hello! You can create a new application here. Based on your role and the infrastructure assigned to it, we recommend that you choose from the following templates:',
		time: new Date(),
		from: 'assistant',
		buttons: [
			{
				name: 'Containerized Microservice',
				events: [
					{
						name: 'message',
						contentType: {
							from: 'user',
							contents: 'Containerized Microservice',
							time: new Date(),
							type: 'message',
						},
					},
					{
						name: 'message',
						contentType: {
							from: 'assistant',
							contents:
								'What type of Containerized Microservice would you like to create? We have the following templates available for this category and based on the insights from your project, we recommend that you select the FastAPI template:',
							buttons: [
								{
									name: 'Fast API',
									events: [
										{
											name: 'message',
											contentType: {
												from: 'user',
												contents: 'Fast API',
												time: new Date(),
												type: 'message',
											},
										},
										{
											name: 'set-template',
											contentType: {
												categoriesName: 'Containerized Microservice',
												templateName: 'Fast API Microservice',
											},
										},
										{
											name: 'set-index',
											contentType: {
												index: 2,
											},
										},
										{
											name: 'redirect',
											contentType: {
												to: 'applications/create',
											},
										},
										{
											name: 'message',
											contentType: {
												from: 'assistant',
												contents:
													'Great! And now you can follow next steps with Application Creation Wizard here...',
												time: new Date(),
												type: 'message',
											},
										},
									],
								},
								{
									name: 'SpringBoot',
									disabled: true,
								},
							],
							time: new Date(),
							type: 'message',
						},
					},
				],
			},
			{
				name: 'Containerized UI Application',
				disabled: true,
			},
			{
				name: 'CloudNative Serverless Application',
				disabled: true,
			},
		],
		type: 'message',
	},
];

const getAvailableIssues = (jiraTasks: Array<GenAITask>) => {
	if (!jiraTasks || !jiraTasks.length) {
		return '';
	}
	const jiraTasksList = jiraTasks.map(({ jiraIssue, jiraIssueUrl, summary }) => {
		return `<li><a href=${jiraIssueUrl} target="_blank" style="color: #2196F3;">${jiraIssue}</a>: ${summary}</li>`;
	});
	return `<ol>${jiraTasksList.join('')}</ol>`;
};

const getIssueButtons = (jiraTasks: Array<GenAITask>, appName: string) => {
	if (!jiraTasks || !jiraTasks.length) {
		return [];
	}

	return jiraTasks.map(({ jiraIssue, jiraIssueUrl, summary }) => ({
		name: jiraIssue,
		events: [
			{
				name: 'message',
				contentType: {
					from: 'user',
					contents: jiraIssue,
					time: new Date(),
					type: 'message',
				},
			},
			{
				name: 'message',
				contentType: {
					from: 'assistant',
					contents: `
													<p>Fantastic! You've chosen Jira Issue <a href=${jiraIssueUrl} target="_blank" style="color: #2196F3;">${jiraIssue}</a>: ${summary}.</p>
													<p>I'll start the process to implement this issue for you. 🚀</p>
												`,
					time: new Date(),
					type: 'message',
				},
			},
			{
				name: 'request',
				contentType: {
					path: 'aiworkflows',
					method: 'POST',
					payload: {
						jiraIssue: jiraIssue,
						appName: appName,
					},
					messages: {
						success:
							'Congratulations! The workflow has been successfully initiated. You can now close this window. If you need any further assistance, feel free to reach out. Have a great day!"',
						error: 'Oops! It seems there was an issue creating the workflow. <br/> Please try again later or contact support for assistance.<br/> We apologize for any inconvenience caused.<br/> <br/>',
					},
				},
			},
		],
	}));
};

export const getWorkflowMessages = (tasks: GenAITasks): Message[] => {
	if (!tasks) {
		return [];
	}
	const initialButtons = Object.entries(tasks).map(([key, value]) => ({
		name: key,
		events: [
			{
				name: 'message',
				contentType: {
					from: 'user',
					contents: key,
					time: new Date(),
					type: 'message',
				},
			},
			{
				name: 'message',
				contentType: {
					from: 'assistant',
					contents: `
							<p>Great choice! 😊 Now, let me fetch the list of Jira Issues available for implementation in ai-demo-app. 
								It'll just take a moment.</p>`,
					time: new Date(),
					type: 'message',
				},
			},
			{
				name: 'message',
				contentType: {
					from: 'assistant',
					contents: `<p>Here are the available Jira Issues for ai-demo-app:</p>
							${getAvailableIssues(value)}
							<p>Please let me know the Jira number of the issue you'd like to start working on, and I'll initiate the process for you.</p>
						`,
					buttons: getIssueButtons(value, key),
					time: new Date(),
					type: 'message',
				},
			},
		],
	}));
	return [
		{
			contents:
				// eslint-disable-next-line quotes
				"👋 Hello there! Welcome to our workflow automation system. I'm here to assist you in starting the implementation of your Jira ticket. First off, could you please let me know which application you'd like to work on? Here's a list of applications:",
			time: new Date(),
			from: 'assistant',
			buttons: initialButtons as any,
			type: 'message',
		},
	];
};
