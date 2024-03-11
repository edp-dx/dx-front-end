import { IssueStatus } from '~/services/data/workflows/model';

import { SdlcTableProps } from '../../types';

export interface IssuesTableProps extends SdlcTableProps {
	statusesFilter: Array<IssueStatus>;
}
