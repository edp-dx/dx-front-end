import { Workflow } from '~/services/data/workflows/model';

import { TableColumn } from '../../../../../../shared-react-components/src/components/Table/types';

export interface OnboardingApplicationsTableProps {
	applicationsSearch: string;
	columns: TableColumn<Workflow>[];
}
