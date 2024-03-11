import { Application } from '~/services/data/applications/model';

import { TableColumn } from '../../../../../../shared-react-components/src/components/Table/types';

export interface CreatedApplicationsTableProps {
	applicationsSearch: string;
	columns: TableColumn<Application>[];
	isLoading: boolean;
	error: any;
	data: Array<Application>;
}
