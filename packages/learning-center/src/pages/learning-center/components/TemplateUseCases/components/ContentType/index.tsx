import React, { FC } from 'react';

import { ChildrenType } from '../ChildrenType';
import { StyledImg, StyledTypography } from './styles';
import { ContentTypeProps } from './types';

export const ContentType: FC<ContentTypeProps> = ({ item }) => {
	switch (item.type) {
		case 'img':
			return <StyledImg src={item.src} />;

		case 'typography':
			return (
				<StyledTypography>
					{item.children.map((item: any, index: number) => (
						<ChildrenType key={index} item={item} />
					))}
				</StyledTypography>
			);
	}
};
