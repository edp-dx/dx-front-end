import useCase1Page1 from 'public/assets/use_cases/template/page1.png';
import useCase1Page2 from 'public/assets/use_cases/template/page2.png';
import useCase1Page3 from 'public/assets/use_cases/template/page3.png';
import useCase1Page4 from 'public/assets/use_cases/template/page4.png';
import useCase1Page5 from 'public/assets/use_cases/template/page5.png';
import useCase1Page6 from 'public/assets/use_cases/template/page6.png';
import useCase1Page7 from 'public/assets/use_cases/template/page7.png';
import useCase1Page8 from 'public/assets/use_cases/template/page8.png';
import useCase1Page9 from 'public/assets/use_cases/template/page9.png';
import useCase1Page10 from 'public/assets/use_cases/template/page10.png';
import useCase1 from 'public/assets/use_cases/use_case_1.png';
import useCase2 from 'public/assets/use_cases/use_case_2.png';
import useCase3 from 'public/assets/use_cases/use_case_3.png';
import useCase4 from 'public/assets/use_cases/use_case_4.png';
import useCase5 from 'public/assets/use_cases/use_case_5.png';
import useCase6 from 'public/assets/use_cases/use_case_6.png';
import useCase156 from 'public/assets/use_cases/use_case_156.png';

import { LEARNING_CENTER_CARD_TAGS, LEARNING_CENTER_CARD_TYPES } from '../../constants';
import { LearningCenterCard } from '../../types';

export const list: LearningCenterCard[] = [
	{
		id: 156,
		tag: LEARNING_CENTER_CARD_TAGS.DASHBOARD,
		type: LEARNING_CENTER_CARD_TYPES.USE_CASE,
		title: 'Streamlining the Project Staffing Process',
		description:
			'Spend less time setting up a project team by efficiently identifying necessary skills and qualifications...',
		href: '/learning-center/156',
		category: 'Use Case',
		imageURL: useCase156,
		children: [
			{
				title: 'Agenda',
				type: 'column',
				content: [
					{
						type: 'img',
						src: useCase1Page1,
					},
					{
						type: 'typography',
						children: [
							{
								type: 'circle',
								content: {
									children: [
										[
											{
												type: 'title',
												content: 'Problem Statement',
											},
											{
												type: 'text',
												content: 'P. 02',
											},
										],
										[
											{
												type: 'title',
												content: 'Goals',
											},
											{
												type: 'text',
												content: 'P. 03',
											},
										],
										[
											{
												type: 'title',
												content: 'Regular Flow',
											},
											{
												type: 'text',
												content: 'P. 04',
											},
										],
										[
											{
												type: 'title',
												content: 'Solution: IDP Flow',
											},
											{
												type: 'text',
												content: 'P. 06',
											},
										],
										[
											{
												type: 'title',
												content: 'Results',
											},
											{
												type: 'text',
												content: 'P. 10',
											},
										],
									],
								},
							},
						],
					},
				],
			},
			{
				title: 'Problem Statement',
				type: 'column',
				content: [
					{
						type: 'typography',
						children: [
							{
								type: 'circle',
								content: {
									children: [
										[
											{
												type: 'title',
												content: 'Objective',
											},
											{
												type: 'text',
												content:
													'In this case study, we will showcase how a Project Manager successfully sets up a team with skills that align with the specific technical stack requirements of a project.',
											},
										],
										[
											{
												type: 'title',
												content: 'Problem',
											},
											{
												type: 'text',
												content:
													'The PM faces the challenge of having to switch between multiple tools to staff a team, including JIRA for project/task management and the company`s HR system for employee information. The PM finds it problematic to quickly determine the skills and seniority of the team members and should manually cross-reference multiple systems to find this information. This is time-consuming and could lead to errors or oversights.',
											},
										],
									],
								},
							},
						],
					},
					{
						type: 'img',
						src: useCase1Page2,
					},
				],
			},
			{
				title: 'Goals',
				type: 'column',
				content: [
					{
						type: 'img',
						src: useCase1Page3,
					},
					{
						type: 'typography',
						children: [
							{
								type: 'circle',
								content: {
									children: [
										[
											{
												type: 'title',
												content: '#1',
											},
											{
												type: 'text',
												content:
													'In convenient way, spend less time setting up a project team by efficiently identifying necessary skills and qualifications, then recruiting, onboarding, and training team members to match project requirements.',
											},
										],
										[
											{
												type: 'title',
												content: '#2',
											},
											{
												type: 'text',
												content:
													'Set up a team with the right skills to improve the chances of success and ensure that the project is delivered on time, within budget, and to the desired quality standards. ',
											},
										],
									],
								},
							},
						],
					},
				],
			},
			{
				title: 'Regular Flow: Project Technology Stack',
				type: 'column',
				content: [
					{
						type: 'typography',
						children: [
							{
								type: 'text',
								content:
									'The Horizon project with its ambitious goals and cutting-edge technology requirements, entrusted the Project Manager (PM) with the task of assembling a new team.',
							},
							{
								type: 'text',
								content:
									'The PM navigates between different company websites starting from JIRA Software and ending the HR Staffing System to collect data about project technologies and about candidates` skills, majority, and availability.',
							},
							{
								type: 'text',
								content:
									'Following a regular flow to set up a new team, the PM takes following steps:',
							},
							{
								type: 'sub-title',
								content:
									'1. The PM collects the information about the project technology stack:',
							},
							{
								type: 'dot',
								content: {
									children: [
										[
											{
												type: 'text',
												content: 'Navigates to JIRA Software',
											},
										],
										[
											{
												type: 'text',
												content: 'Moves to Project Settings',
											},
										],
										[
											{
												type: 'text',
												content: 'Opens Project Details',
											},
										],
										[
											{
												type: 'text',
												content: 'Checks Technology Stack',
											},
										],
									],
								},
							},
						],
					},
					{
						type: 'img',
						src: useCase1Page4,
					},
				],
			},
			{
				title: 'Regular Flow: Project Technology Stack',
				type: 'column',
				content: [
					{
						type: 'typography',
						children: [
							{
								type: 'sub-title',
								content:
									'2. Once the PM has technology stack data, he collects the information about available candidates and their skills:​',
							},
							{
								type: 'dot',
								content: {
									children: [
										[
											{
												type: 'text',
												content:
													'Navigates to HR Staffing System (EPAM Telescope, EPAM Radar, EPAM Staffing portals)',
											},
										],
										[
											{
												type: 'text',
												content:
													'Finds the top candidates with the corresponding professional skills',
											},
										],
										[
											{
												type: 'text',
												content: 'Assigns new team members to the project',
											},
										],
									],
								},
							},
							{
								type: 'sub-title',
								content:
									'3. The PM analyzes the collected information and selects the best matching candidates, and assigns them to the Horizon project positions.',
							},
						],
					},
					{
						type: 'img',
						src: useCase1Page5,
					},
				],
			},
			{
				title: 'Solution: Internal Developer Platform Flow',
				type: 'row',
				content: [
					{
						type: 'typography',
						children: [
							{
								type: 'text',
								content:
									'By using the Internal Developer Platform, the PM simplifies the process of a team staffing.',
							},
							{
								type: 'text',
								content:
									'The platform includes a Dashboard with the respective widgets and Insights that display real-time information about the skills, seniority, and best matching of each team member.',
							},
							{
								type: 'text',
								content:
									'​To set up a new team, the PM creates a Dashboard by following the steps below:',
							},
							{
								type: 'sub-title',
								content: '1. The PM logs into IDP and navigates to Dashboard',
							},
							{
								type: 'img',
								content: {
									src: useCase1Page6,
								},
							},
						],
					},
				],
			},
			{
				title: 'Solution: Internal Developer Platform Flow',
				type: 'row',
				content: [
					{
						type: 'typography',
						children: [
							{
								type: 'sub-title',
								content:
									'2. The PM adds Project Details widget that displays project name, description, and the technology stack:​',
							},
							{
								type: 'dot',
								content: {
									children: [
										[
											{
												type: 'text',
												content:
													'Selects the Project Details widget from the Widget Preselect drop-down list',
											},
										],
										[
											{
												type: 'text',
												content:
													'​Clicks the Plus icon to appear it on the Dashboard',
											},
										],
									],
								},
							},
							{
								type: 'img',
								content: {
									src: useCase1Page7,
								},
							},
						],
					},
				],
			},
			{
				title: 'Solution: Internal Developer Platform Flow',
				type: 'row',
				content: [
					{
						type: 'typography',
						children: [
							{
								type: 'sub-title',
								content:
									'3. The PM adds the Project Candidates widget that displays the list of available candidates with professional skills:​',
							},
							{
								type: 'dot',
								content: {
									children: [
										[
											{
												type: 'text',
												content:
													'Selects the Project Candidates widget from the Widget Preselect drop-down list',
											},
										],
										[
											{
												type: 'text',
												content:
													'Clicks the Plus icon to add it to the Dashboard​',
											},
										],
									],
								},
							},
							{
								type: 'img',
								content: {
									src: useCase1Page8,
								},
							},
						],
					},
				],
			},
			{
				title: 'Solution: Internal Developer Platform Flow',
				type: 'row',
				content: [
					{
						type: 'typography',
						children: [
							{
								type: 'sub-title',
								content:
									'4. After adding the Project Details and Project Candidates widgets to the Dashboard, the PM checks the Insight Tip that notifies about top-three candidates whose skills are aligned with the project technology stack:​​',
							},
							{
								type: 'img',
								content: {
									src: useCase1Page9,
								},
							},
						],
					},
				],
			},
			{
				title: 'Result',
				type: 'column',
				content: [
					{
						type: 'typography',
						children: [
							{
								type: 'title',
								content: 'Final Result',
							},
							{
								type: 'text',
								content: '',
							},
							{
								type: 'text',
								content:
									'As a result of this case study, the PM has all the necessary information consolidated in one centralized platform.',
							},
							{
								type: 'text',
								content:
									'This eliminates the need to navigate through different tools and sources, saving valuable time and effort.',
							},
							{
								type: 'text',
								content:
									'With a streamlined process for accessing candidate profiles, resumes, and skill assessments, the PM can now set up a new team more effectively and efficiently, allowing for a seamless and timely project execution.​',
							},
						],
					},
					{
						type: 'img',
						src: useCase1Page10,
					},
				],
			},
		],
	},
	{
		id: 7,
		tag: LEARNING_CENTER_CARD_TAGS.MANAGE_APP,
		type: LEARNING_CENTER_CARD_TYPES.USE_CASE,
		title: 'IDP: Containerized Application Scaffolding',
		description:
			'Create a new containerized application in few minutes and get a repository with source code and CI/CD pipelines built in accord with your technology selection.',
		category: 'Use Case',
		imageURL: useCase1,
	},
	{
		id: 8,
		type: LEARNING_CENTER_CARD_TYPES.USE_CASE,
		tag: LEARNING_CENTER_CARD_TAGS.MANAGE_APP,
		title: 'IDP: Cloud Native Application Scaffolding',
		description:
			'Create a new cloud native application by indicating an approved pattern, programming language, and a build tool if necessary. As a result, you will get a repository with source code, IaC scripts, and CI/CD pipelines.',
		category: 'Use Case',
		imageURL: useCase2,
	},
	{
		id: 9,
		tag: LEARNING_CENTER_CARD_TAGS.MANAGE_APP,
		type: LEARNING_CENTER_CARD_TYPES.USE_CASE,
		title: 'IDP: Database Scaffolding',
		description:
			'Create a new database in a Public cloud or On-Premises. Specify a database engine and get a repository with IaC scripts and CI/CD pipelines in accord with your technology selection.',
		category: 'Use Case',
		imageURL: useCase3,
	},
	{
		id: 10,
		tag: LEARNING_CENTER_CARD_TAGS.MANAGE_APP,
		type: LEARNING_CENTER_CARD_TYPES.USE_CASE,
		title: 'IDP: Register an Existing Application',
		description: 'Migrate a legacy application to a Public cloud via recommended templates.',
		category: 'Use Case',
		imageURL: useCase4,
	},
	{
		id: 11,
		tag: LEARNING_CENTER_CARD_TAGS.MANAGE_APP,
		type: LEARNING_CENTER_CARD_TYPES.USE_CASE,
		title: 'IDP: Streamlining the Project Staffing Process',
		description:
			'Spend less time setting up a project team by efficiently identifying necessary skills and qualifications to match project requirements. ',
		category: 'Use Case',
		imageURL: useCase5,
	},
	{
		id: 12,
		tag: LEARNING_CENTER_CARD_TAGS.DASHBOARD,
		type: LEARNING_CENTER_CARD_TYPES.USE_CASE,
		title: 'Setting up Comprehensive Project Dashboard',
		description:
			'Create a comprehensive project dashboard that monitors project status, roadmap, and health map using key metrics and visualizations. ',
		category: 'Use Case',
		imageURL: useCase6,
	},
];
