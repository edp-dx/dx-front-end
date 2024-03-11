import { Tab, Tabs } from '@mui/material';
import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useLearningCenterStore } from '~/store/LearningCenter';

import { LEARNING_CENTER_CARD_TABS } from '../../constants';
import { useNavigationList } from '../../hooks/useNavigationList';
import { StyledDivider } from '../../styles';
import { NavTabsProps } from './types';

const a11yProps = (index: number) => ({
	id: `tab-${index}`,
	'aria-controls': `tabpanel-${index}`,
});

export const NavTabs: FC<NavTabsProps> = ({ currentCard }) => {
	const history = useHistory();
	const { activeTabIdx, setActiveTabIdx, filter, setFilter } = useLearningCenterStore();

	const { list: navigationList } = useNavigationList();

	const handleChange = useCallback(
		(event: React.SyntheticEvent, newValue: number) => {
			setFilter(null);
			setActiveTabIdx(newValue);
			if (currentCard) history.push('/learning-center');
		},
		[currentCard, history, setActiveTabIdx, setFilter],
	);

	return (
		<Tabs
			orientation={'vertical'}
			variant={'scrollable'}
			value={
				currentCard?.type
					? LEARNING_CENTER_CARD_TABS[currentCard?.type]
					: filter
					? 10
					: activeTabIdx
			}
			onChange={handleChange}
			aria-label={'Learning center nav'}
			TabIndicatorProps={{
				style: { display: 'none' },
			}}
		>
			{navigationList.map(({ name, label, icon, disabled = false }, idx) => {
				const key = `${name}::${idx}`;
				const isDivider = name === 'divider';

				return isDivider ? (
					<StyledDivider key={key} />
				) : (
					<Tab
						key={key}
						label={label}
						iconPosition={'start'}
						icon={icon}
						disabled={disabled}
						{...a11yProps(idx)}
					/>
				);
			})}
		</Tabs>
	);
};
