import { LEARNING_CENTER_CARD_TYPES } from '~/components/Other/LearningCenter/constants';
import { ValueOf } from '~/types/common';

export interface LearningCenterCard {
	id: number;
	title: string;
	type: ValueOf<typeof LEARNING_CENTER_CARD_TYPES>;
	description: string;
	category: string;
	imageURL?: string;
	videoURL?: string;
	videoThumbURL?: string;
	href?: string;
	noActions?: boolean;
}
