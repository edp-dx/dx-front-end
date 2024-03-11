export interface LearningCenterStore {
	open: boolean;
	setOpen: (value: LearningCenterStore['open']) => void;
	filter: string;
	setFilter: (value: LearningCenterStore['filter']) => void;
	activeTabIdx: number;
	setActiveTabIdx: (value: LearningCenterStore['activeTabIdx']) => void;
	favorites: number[];
	toggleFavorite: (cardId: number) => void;
}
