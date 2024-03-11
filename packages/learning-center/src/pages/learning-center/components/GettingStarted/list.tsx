import docAsCode1Image from 'public/assets/doc-as-code/doc-as-code1.png';
import docAsCode2Image from 'public/assets/doc-as-code/doc-as-code2.png';
import docAsCode3Image from 'public/assets/doc-as-code/doc-as-code3.png';
import docAsCode4Image from 'public/assets/doc-as-code/doc-as-code4.png';
import docAsCode5Image from 'public/assets/doc-as-code/doc-as-code5.png';
import docAsCode6Image from 'public/assets/doc-as-code/doc-as-code6.png';
import tool1Image from 'public/assets/tools/tool1.png';
import tool2Image from 'public/assets/tools/tool2.png';
import tool3Image from 'public/assets/tools/tool3.png';
import tool4Image from 'public/assets/tools/tool4.png';

import { LEARNING_CENTER_CARD_TAGS, LEARNING_CENTER_CARD_TYPES } from '../../constants';
import { LearningCenterCard } from '../../types';

export const list: LearningCenterCard[] = [
	{
		id: 302,
		tag: LEARNING_CENTER_CARD_TAGS.MANAGE_APP,
		type: LEARNING_CENTER_CARD_TYPES.DOC_AS_CODE,
		href: '/learning-center/302',
		title: 'Documentation-as-Code: A Seamless Integration of GitHub and Confluence',
		description: 'A short introduction on how-to use documentation-as-code approach.',
		category: 'Doc-as-Code',
		imageURL: docAsCode1Image,
		children: [
			{
				title: 'A Seamless Integration of GitHub and Confluence',
				content: [
					{
						type: 'typography',
						children: [
							{
								type: 'text',
								content:
									'In the contemporary landscape of software development, project success is strongly tied to an efficient and integrated documentation process. In pursuit of this objective, we have successfully adopted and implemented the "documentation-as-code" approach. This approach emphasizes the management, versioning, and review of software documentation in alignment with standard codebase practices.',
							},
							{
								type: 'text',
								content:
									'Here, we illustrate our implementation of a documentation-as-code approach, involving a two-way integration between the Version Control System (GitHub) with a popular knowledge management platform (Confluence) as an example.',
							},
							{
								type: 'title',
								content: 'The Path from GitHub to Confluence',
							},
							{
								type: 'text',
								content:
									'Our journey to establish integration between GitHub with Confluence involves several crucial steps:',
							},
							{
								type: 'list',
								content: {
									children: [
										[
											{
												type: 'sub-title',
												content: '1. Convert and Publish',
											},
											{
												type: 'text',
												content:
													'We have incorporated the open-source "Foliant" project into our CI/CD pipeline. As a result, every committed change to the GitHub repository triggers the process wherein updated markdown files (*.md) are transformed into XHTML. These transformed files are subsequently published to Confluence.',
											},
											{
												type: 'img',
												content: {
													src: docAsCode2Image,
												},
											},
										],
										[
											{
												type: 'sub-title',
												content: '2. Change Scaffolding Process',
											},
											{
												type: 'text',
												content:
													'Portal users are provided with the capability to include URLs to the application documentation on Confluence as part of the scaffolding process. Additionally, we have ensured the flexibility to add this URL later through the application details page if it was not initially specified.',
											},
											{
												type: 'img',
												content: {
													src: docAsCode3Image,
												},
											},
										],
										[
											{
												type: 'sub-title',
												content: '3. Create Confluence Bot',
											},
											{
												type: 'text',
												content:
													'To facilitate content publication to Confluence, we have established a bot with limited permissions to control changes using a Personal Access Token (PAT). ',
											},
											{
												type: 'img',
												content: {
													src: docAsCode4Image,
												},
											},
										],
										[
											{
												type: 'sub-title',
												content: '4. Set Documentation Location',
											},
											{
												type: 'text',
												content:
													'As part of the application scaffolding process, a README.md file containing essential project information is automatically added to the "Documentation" folder of the application repository.',
											},
											{
												type: 'img',
												content: {
													src: docAsCode5Image,
												},
											},
											{
												type: 'text',
												content:
													'The necessary Confluence parameters such as Space Value, essential for identifying the location of stored documentation, have been defined and incorporated into our integration.',
											},
										],
									],
								},
							},
							{
								content: 'The Path from Confluence to GitHub',
								type: 'title',
							},
							{
								type: 'text',
								content:
									'Our process is bidirectional, allowing changes originating in the knowledge management platform to flow from Confluence back to GitHub:',
							},

							{
								type: 'list',
								content: {
									children: [
										[
											{
												type: 'sub-title',
												content: '1. Configure Confluence Web-hook',
											},
											{
												type: 'text',
												content:
													'We have established a web-hook that triggers whenever the corresponding Confluence page is updated. This change is then prepared for conversion and subsequent commit to GitHub.',
											},
										],
										[
											{
												type: 'sub-title',
												content: '2. Convert',
											},
											{
												type: 'text',
												content:
													'Our application retrieves the updated content from Confluence, which is then converted from XHTML to GitHub Markdown using the open-source tool, Pandoc.',
											},
											{
												type: 'img',
												content: {
													src: docAsCode6Image,
												},
											},
										],
										[
											{
												type: 'sub-title',
												content: '3. Create Pull Request',
											},
											{
												type: 'text',
												content:
													'We have automated the creation of a pull request in the GitHub repository, integrating the transformed changes from the Confluence page seamlessly.',
											},
											{
												type: 'text',
												content:
													'In addressing the challenge of linking the Confluence page precisely to the corresponding GitHub repository, we have included metadata about the repository within the Confluence page.',
											},
										],
									],
								},
							},
							{
								type: 'title',
								content: 'In Conclusion',
							},
							{
								type: 'text',
								content:
									'Through the implementation of the documentation-as-code approach, we have fostered enhanced transparency, collaboration, and alignment of documentation with the underlying codebase. The solution we’ve developed serves as a robust demonstration of GitHub and Confluence integration, facilitating an automated, bidirectional documentation process.',
							},
							{
								type: 'text',
								content:
									'Moreover, this approach holds a universal applicability, extending not only to GitHub and Confluence but also to various other Version Control Systems (VCS) and knowledge management platforms, such as MediaWiki, your custom Enterprise portal, DX portal, and many more.',
							},
						],
					},
				],
			},
		],
	},
	{
		id: 1,
		tag: LEARNING_CENTER_CARD_TAGS.MANAGE_APP,
		type: LEARNING_CENTER_CARD_TYPES.TOOL,
		title: 'IDP: Scaffold Application',
		description:
			'Scaffold an application based on an approved template with a specific number of components and resources, certified CI/CD pipelines and IaC templates.',
		category: 'How To',
		imageURL: tool1Image,
	},
	{
		id: 2,
		tag: LEARNING_CENTER_CARD_TAGS.MANAGE_APP,
		type: LEARNING_CENTER_CARD_TYPES.TOOL,
		title: 'IDP: Manage Applications',
		description:
			'Manage your applications and onboard existing applications to the Internal Developer Platform (IDP).',
		category: 'How To',
		imageURL: tool3Image,
	},
	{
		id: 3,
		tag: LEARNING_CENTER_CARD_TAGS.MANAGE_APP,
		type: LEARNING_CENTER_CARD_TYPES.TOOL,
		title: 'IDP: Landing Zone',
		description:
			'Setup a robust infrastructure for quick and secure cloud-based applications and services deployment.',
		category: 'How To',
		imageURL: tool4Image,
	},
	{
		id: 4,
		tag: LEARNING_CENTER_CARD_TAGS.MANAGE_APP,
		type: LEARNING_CENTER_CARD_TYPES.TOOL,
		title: 'IDP: Serverless Application',
		description:
			'Run and scale your application by leveraging the advantages of serverless computing.',
		category: 'How To',
		imageURL: tool2Image,
	},
	{
		id: 5,
		tag: LEARNING_CENTER_CARD_TAGS.DASHBOARD,
		type: LEARNING_CENTER_CARD_TYPES.TOOL,
		title: 'Dashboards & Metrics Introduction',
		description:
			'Become familiar with the D&M capability, receive valuable insights, and make data-driven decisions for your business.',
		category: 'Onboarding Video',
		videoURL:
			'https://dx-platform-static-files.s3.eu-central-1.amazonaws.com/Dashboard-Metrics.mp4',
		videoThumbURL:
			'https://dx-platform-static-files.s3.eu-central-1.amazonaws.com/assets/dashboard_video_preview.png',
		noActions: true,
	},
	{
		id: 6,
		tag: LEARNING_CENTER_CARD_TAGS.DASHBOARD,
		type: LEARNING_CENTER_CARD_TYPES.TOOL,
		title: 'Developer Experience Portal Value',
		description: 'Discover the benefits of Developer Experience Portal at Enterprise level.',
		category: 'Onboarding Video',
		videoURL: 'https://dx-platform-static-files.s3.eu-central-1.amazonaws.com/DEP-DevValue.mp4',
		videoThumbURL:
			'https://dx-platform-static-files.s3.eu-central-1.amazonaws.com/assets/developer_experience_portal_video_preview.png',
		noActions: true,
	},
];
