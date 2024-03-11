import academy1 from 'public/assets/academy/academy1.png';
import academy2 from 'public/assets/academy/academy2.png';
import academy3 from 'public/assets/academy/academy3.png';
import academyDevOps1 from 'public/assets/academy/academy-devops-1.png';
import academyDevOps2 from 'public/assets/academy/academy-devops-2.png';

import { LEARNING_CENTER_CARD_TAGS, LEARNING_CENTER_CARD_TYPES } from '../../constants';
import { LearningCenterCard } from '../../types';

export const list: LearningCenterCard[] = [
	{
		id: 13,
		tag: LEARNING_CENTER_CARD_TAGS.DASHBOARD,
		type: LEARNING_CENTER_CARD_TYPES.ACADEMY,
		title: 'Managing JIRA Project: Introduction',
		description:
			'Get the notion of a project creation, configuration, and maintenance in Jira Cloud. Manage projects with its components and assign roles with specific permissions.',
		category: 'Academy',
		imageURL: academy1,
		href: 'https://learn.epam.com/detailsPage?id=ba86c2c0-c3d5-45c0-a6f9-a547d101a5ec ',
	},
	{
		id: 14,
		tag: LEARNING_CENTER_CARD_TAGS.DASHBOARD,
		type: LEARNING_CENTER_CARD_TYPES.ACADEMY,
		title: 'Project Management Essentials',
		description:
			'Become familiar with the best practices to manage projects effectively from start to closure.',
		category: 'Academy',
		imageURL: academy2,
		href: 'https://learn.epam.com/detailsPage?id=58e6a8cb-62ca-41bf-a5f2-20f4173c0fad ',
	},
	{
		id: 15,
		tag: LEARNING_CENTER_CARD_TAGS.DASHBOARD,
		type: LEARNING_CENTER_CARD_TYPES.ACADEMY,
		title: 'Measuring Project Outcomes Effectively',
		description:
			'The course covers various metrics and KPIs related to business, work, and schedule, as well as forecasting and risk metrics. ',
		category: 'Academy',
		imageURL: academy3,
		href: 'https://learn.epam.com/detailsPage?id=52410152-c883-4d15-bdf4-c18a679c189b',
	},
	{
		id: 16,
		tag: LEARNING_CENTER_CARD_TAGS.MANAGE_APP,
		type: LEARNING_CENTER_CARD_TYPES.ACADEMY,
		title: 'DevOps Fundamentals for JavaScript Engineers',
		description:
			'This training covers common DevOps concepts and tools and includes three main blocks with theoretical, practical parts, and homework assignment.',
		category: 'Academy',
		imageURL: academyDevOps1,
		href: 'https://learn.epam.com/detailsPage?id=1d78e7ab-085d-4867-a050-84520bbd4106',
	},
	{
		id: 17,
		tag: LEARNING_CENTER_CARD_TAGS.MANAGE_APP,
		type: LEARNING_CENTER_CARD_TYPES.ACADEMY,
		title: 'Software Development Life Cycle (SDLC)',
		description:
			'The course covers a range of SDLC approaches, from traditional to modern methods such as Lean, Kanban, and DevOps. Instructor provides a brief overview of each method and explains their uniqueness and relevance today.',
		category: 'Academy',
		imageURL: academyDevOps2,
		href: 'https://learn.epam.com/detailsPage?id=0885a021-27ea-463c-8494-cf0c49821934',
	},
];
