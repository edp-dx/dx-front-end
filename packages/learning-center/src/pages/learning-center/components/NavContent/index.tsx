import React from 'react';
import { useLearningCenterStore } from '~/store/LearningCenter';

import { useNavigationContentList } from '../../hooks/useNavigationContentList';

const TabPanel = (props: { children?: React.ReactNode; index: number; value: number }) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	);
};

export const NavContent = () => {
	const { activeTabIdx } = useLearningCenterStore();
	const { list: navigationContentList } = useNavigationContentList();

	return (
		<>
			{navigationContentList.map(({ component }, idx) => {
				const key = `tabpanel-${idx}`;

				return (
					<TabPanel key={key} value={activeTabIdx} index={idx}>
						{component}
					</TabPanel>
				);
			})}
		</>
	);
};
