import { Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';

import {
	StyledCircleList,
	StyledDotList,
	StyledImg,
	StyledList,
	StyledSubTitle,
	StyledTitle,
} from './styles';
import { ChildrenTypeProps } from './types';

export const ChildrenType: FC<ChildrenTypeProps> = ({ item }) => {
	const theme = useTheme();
	switch (item.type) {
		case 'img':
			return <StyledImg src={item.content.src} />;

		case 'text':
			return (
				<Typography variant='body1' color={theme.palette.text.secondary}>
					{item.content}
				</Typography>
			);

		case 'title':
			return (
				<StyledTitle variant='h5' mb={1}>
					{item.content}
				</StyledTitle>
			);

		case 'sub-title':
			return <StyledSubTitle variant='h6'>{item.content}</StyledSubTitle>;

		case 'list':
			return (
				<StyledList>
					{item.content.children.map((listItem, index: number) => (
						<li key={index}>
							{listItem.map((listContent, listIndex: number) => (
								<ChildrenType key={listIndex} item={listContent} />
							))}
						</li>
					))}
				</StyledList>
			);

		case 'circle':
			return (
				<StyledCircleList>
					{item.content.children.map((listItem, index: number) => (
						<li key={index}>
							{listItem.map((listContent, listIndex: number) => (
								<ChildrenType key={listIndex} item={listContent} />
							))}
						</li>
					))}
				</StyledCircleList>
			);

		case 'dot':
			return (
				<StyledDotList>
					{item.content.children.map((listItem, index: number) => (
						<li key={index}>
							{listItem.map((listContent, listIndex: number) => (
								<ChildrenType key={listIndex} item={listContent} />
							))}
						</li>
					))}
				</StyledDotList>
			);
	}
};
