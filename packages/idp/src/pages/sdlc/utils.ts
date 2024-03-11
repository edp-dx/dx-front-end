import { IssueStatus } from '~/services/data/workflows/model';
import { SingleValueFilterItem } from '~/shared-components/SingleValueTableFilter/types';

export const getIssueStatusFilterItems = (): Array<SingleValueFilterItem<IssueStatus>> => [
	{
		label: 'Issues - Open',
		value: IssueStatus.Open,
	},
	{
		label: 'Issues - In Progress',
		value: IssueStatus.InProgress,
	},
	{
		label: 'Issues - Done',
		value: IssueStatus.Closed,
	},
];
