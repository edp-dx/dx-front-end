import { ValueOf } from '~/types/common';

import { LEARNING_CENTER_CARD_TYPES } from './constants';

interface ImgType {
	src: string;
}

interface ListType {
	children: LearningCenterCardType[][];
}

interface DefaultType<T, G> {
	type: G;
	content: T;
}

export type LearningCenterCardType =
	| DefaultType<string, 'title' | 'sub-title' | 'text'>
	| DefaultType<ImgType, 'img'>
	| DefaultType<ListType, 'list' | 'dot' | 'circle'>;

export interface LearningCenterCardContentType {
	type: 'img' | 'typography';
	src?: string;
	children?: LearningCenterCardType[];
}

interface LearningCenterCardItem {
	title: string;
	type?: string;
	content?: LearningCenterCardContentType[];
}

export interface LearningCenterCard {
	id: number;
	title: string;
	tag: string;
	type: ValueOf<typeof LEARNING_CENTER_CARD_TYPES>;
	description: string;
	category: string;
	imageURL?: string;
	videoURL?: string;
	videoThumbURL?: string;
	href?: string;
	noActions?: boolean;
	children?: LearningCenterCardItem[];
}

export interface RouterParams {
	cardId: string;
}
