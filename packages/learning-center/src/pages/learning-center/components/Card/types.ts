import { FC } from 'react';

import { LearningCenterCard } from '../../types';

export interface CardProps extends LearningCenterCard {
	Actions?: FC<unknown>;
}
