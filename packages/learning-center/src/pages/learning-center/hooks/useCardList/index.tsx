import { useLearningCenterStore } from '~/store/LearningCenter';

import { list as academyList } from '../../components/Academy/list';
import { list as getStartedList } from '../../components/GettingStarted/list';
import { list as useCasesList } from '../../components/UseCases/list';

export const useCardList = () => {
	const { filter } = useLearningCenterStore();
	const list = [...getStartedList, ...useCasesList, ...academyList];
	const filterArray = filter.split(', ');

	return filter
		? list.filter((item) => {
				return filterArray.some(
					(filterItem) =>
						item.title.toLowerCase().includes(filterItem.toLowerCase()) ||
						item.category.toLowerCase().includes(filterItem.toLowerCase()) ||
						item.tag.toLowerCase().includes(filterItem.toLowerCase()),
				);
		  })
		: list;
};
