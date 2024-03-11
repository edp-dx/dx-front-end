import projectCandidatesHalfSizeImage from 'public/assets/Candidates-1_400x400.png';
import projectCandidatesFullSizeImage from 'public/assets/Candidates-1_800x400.png';
import healthMapHalfSizeImage from 'public/assets/HealthMap_400x400.png';
import healthMapFullSizeImage from 'public/assets/HealthMap_800x400.png';
import projectDetailsHalfSizeImage from 'public/assets/ProjectDetails_400x400.png';
import projectDetailsFullSizeImage from 'public/assets/ProjectDetails_800x400.png';
import projectStatusHalfSizeImage from 'public/assets/ProjectStatus_400x400.png';
import projectStatusFullSizeImage from 'public/assets/ProjectStatus_800x400.png';
import roadMapHalfSizeImage from 'public/assets/RoadMap_400x400.png';
import roadMapFullSizeImage from 'public/assets/RoadMap_800x400.png';
import { Widget } from '~/store/Dashboard/types';

export const mockResponse = {
	Jira: {
		'Project Details': {
			source: 'Jira',
			name: 'Project Details (HRZ)',
			originName: 'Project Details',
			insights: [],
			id: 11,
			imageFull: projectDetailsFullSizeImage,
			imageHalf: projectDetailsHalfSizeImage,
			widgetExplanation: [],
		} as unknown as Widget,
	},
	Telescope: {
		'Project Candidates': {
			source: 'Telescope',
			name: 'Project Candidates (HRZ)',
			originName: 'Project Candidates',
			insights: [
				{
					id: 0,
					title: 'Horizon (HRZ) Project Top Candidates',
					description:
						'Your “Top-3 Candidates” who have highest Python knowledge are: John Smith, Michael Davis, Tom Jackson',
				},
			],
			id: 22,
			imageFull: projectCandidatesFullSizeImage,
			imageHalf: projectCandidatesHalfSizeImage,
			widgetExplanation: [
				{
					heading: 'Project Candidates',
					content:
						// eslint-disable-next-line quotes
						"Used in project management to assess the suitability of potential candidates for a project based on their skills and expertise. It displays the matching between the project requirements and the candidate's skills, allowing project managers to identify the most suitable candidates for a project. ",
				},
				{
					heading: 'Skill Match Percentage',
					content:
						// eslint-disable-next-line quotes
						"Evaluates the extent to which a candidate's skills match the required skills for the project. It compares the candidate's skill set to the key skills needed to successfully complete the project.",
				},
				{
					heading: 'Range Rates: ',
					content:
						'Low:      Less than 50% Skill Match Percentage \n' +
						'Medium:   50% to 75% Skill Match Percentage \n' +
						'High:     More than 75% Skill Match Percentage ',
				},
				{
					heading: 'Experience Match',
					content:
						// eslint-disable-next-line quotes
						"Evaluates the extent to which a candidate's previous experience matches the requirements of the project. It compares the candidate's previous experience to the requirements of the project.",
				},
				{
					heading: 'Range Rates: ',
					content:
						'Low:      Less than 50% Experience Match \n' +
						'Medium:   50% to 75% Experience Match \n' +
						'High:     More than 75% Experience Match ',
				},
				{
					heading: 'Availability',
					content:
						// eslint-disable-next-line quotes
						"Evaluates whether the candidate is available to work on the project. It considers factors such as the candidate's current workload, availability of resources, and other commitments.",
				},
				{
					heading: 'Range Rates: ',
					content:
						'Low:      Limited availability that may impact project success \n' +
						'Medium:   Moderate availability that may impact project success \n' +
						'High:     High availability that can support project success ',
				},
			],
		} as unknown as Widget,
	},
	'Delivery Central Project': {
		'Health Map': {
			source: 'Delivery Central Project',
			name: 'Projects Health Map',
			originName: 'Health Map',
			href: 'https://delivery.epam.com/route/unit/1/health/summary',
			insights: [
				{
					id: 0,
					title: 'Aurora (AUR) Project Team Retention ',
					description:
						'Key Developer decided to leave company by the end of the current month. A new replacement position is created.',
				},
				{
					id: 1,
					title: 'Galactic (GLC) Project Contracts',
					description:
						'The Contract ends up at the end of this month and should be prolonged.',
				},
			],
			id: 33,
			imageFull: healthMapFullSizeImage,
			imageHalf: healthMapHalfSizeImage,
			widgetExplanation: [
				{
					heading: 'Projects Health Map',
					content:
						// eslint-disable-next-line quotes
						"Visual representation of the projects' status progress towards achieving their goals. ",
				},
				{
					heading: 'Schedule Performance Index (SPI) ',
					content:
						// eslint-disable-next-line quotes
						"Measures the project's progress against its planned schedule. It compares the earned value (EV) of the project to the planned value (PV). An SPI of 1 indicates that the project is on schedule, while a value less than 1 indicates the project is behind schedule. An SPI greater than 1 indicates that the project is ahead of schedule. ",
				},
				{
					heading: 'Range Rates: ',
					content:
						'0 to 0.99          (less than planned) \n' +
						'1.0                (on schedule) \n' +
						'1.01 to infinity   (ahead of schedule)',
				},
				{
					heading: 'Cost Performance Index (CPI) ',
					content:
						// eslint-disable-next-line quotes
						"Measures the project's progress against its planned budget. It compares the earned value (EV) of the project to the actual cost (AC). An CPI of 1 indicates that the project is on budget, while a value less than 1 indicates that the project is over budget. An CPI greater than 1 indicates that the project is under budget. ",
				},
				{
					heading: 'Range Rates: ',
					content:
						'0 to 0.99          (over budget) \n' +
						'1.0                (on budget) \n' +
						'1.01 to infinity   (under budget) ',
				},
				{
					heading: 'Risk Exposure Index (REI) ',
					content:
						// eslint-disable-next-line quotes
						"Measures the project's overall risk exposure. It is calculated by multiplying the probability of risk occurrence by the impact of risk occurrence. The resulting score can be used to prioritize and manage risks in the project.",
				},
				{
					heading: 'Range Rates: ',
					content:
						'0 to 0.33      (low risk) \n' +
						'0.34 to 0.66   (moderate risk) \n' +
						'0.67 to 1.0    (high risk) ',
				},
			],
		} as unknown as Widget,
		'Project Status': {
			source: 'Delivery Central Project',
			name: 'Project Status (HRZ)',
			originName: 'Project Status',
			insights: [
				{
					id: 0,
					title: 'Horizon (HRZ) Project Staffing',
					description:
						'The QA role is not filled. Currently, the project is performing testing with the help of Development team.',
				},
			],
			id: 44,
			imageFull: projectStatusFullSizeImage,
			imageHalf: projectStatusHalfSizeImage,
			widgetExplanation: [
				{
					heading: 'Overall Project Status',
					content:
						'An Overall Project Status summarizes the overall health of the project. It considers various project metrics such as schedule, cost, quality, and risk, and provides an overall assessment of the project status.',
				},
				{
					heading: 'Range Rates:',
					content:
						'Green:    The project is on track and progressing as planned.\n' +
						'Yellow:   The project has some issues that need to be addressed but is still progressing.\n' +
						'Red:      The project is at risk, and immediate action is required to get it back on track.',
				},
				{
					heading: 'Change Request Acceptance Rate',
					content:
						// eslint-disable-next-line quotes
						"It measures the percentage of change requests that have been accepted by the project team. It is an indicator of the project team's flexibility and adaptability to changing requirements.",
				},
				{
					heading: 'Range Rates:',
					content:
						'0% to 50%:     Low acceptance rate, indicating a rigid project team\n' +
						'51% to 90%:    Moderate acceptance rate, indicating some flexibility in the project team\n' +
						'91% to 100%:   High acceptance rate, indicating a flexible and adaptable project team',
				},
			],
		} as unknown as Widget,
		'Project Roadmap': {
			source: 'Delivery Central Project',
			name: 'Project Roadmap (HRZ)',
			originName: 'Project Roadmap',
			insights: [
				{
					id: 0,
					title: 'Horizon (HRZ) Project Deadline',
					description:
						'The current Sprint ends up this week but includes not started tasks.',
				},
			],
			id: 55,
			imageFull: roadMapFullSizeImage,
			imageHalf: roadMapHalfSizeImage,
			widgetExplanation: [
				{
					heading: 'Project Roadmap',
					content:
						// eslint-disable-next-line quotes
						"Used to track and communicate the high-level strategic goals and milestones. It outlines the key deliverables, timelines, and dependencies required to achieve the project's objectives.",
				},
				{
					heading: 'Milestone Completion Rate (MCR)',
					content:
						// eslint-disable-next-line quotes
						'measures the completion rate of planned project milestones. It compares the number of completed milestones to the total number of planned milestones.',
				},
				{
					heading: 'Range Rates: ',
					content:
						'0% to 33%     (poor progress) \n' +
						'34% to 66%    (moderate progress) \n' +
						'67% to 100%   (good progress) ',
				},
				{
					heading: 'Feature Completion Rate (FCR)',
					content:
						// eslint-disable-next-line quotes
						'Measures the completion rate of planned project features. It compares the number of completed features to the total number of planned features.',
				},
				{
					heading: 'Range Rates: ',
					content:
						'0% to 33%     (poor progress) \n' +
						'34% to 66%    (moderate progress) \n' +
						'67% to 100%   (good progress) ',
				},
				{
					heading: 'Resource Utilization Rate (RUR)',
					content:
						// eslint-disable-next-line quotes
						'Measures the percentage of resources utilized on the project. It compares the actual resources utilized to the planned resources. A high RUR indicates that the project is utilizing its resources efficiently. ',
				},
				{
					heading: 'Range Rates: ',
					content:
						'0% to 50%     (underutilized resources) \n' +
						'51% to 100%   (well-utilized resources) ',
				},
			],
		} as unknown as Widget,
	},
};
