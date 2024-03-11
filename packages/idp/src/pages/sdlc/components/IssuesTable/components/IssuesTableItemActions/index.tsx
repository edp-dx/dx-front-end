import React, { ReactElement } from 'react';
import { TableActionsMenu } from '~/shared-components/TableActionsMenu';
import { TableItemAction } from '~/shared-components/TableActionsMenu/types';

export const IssuesTableItemActions = (): ReactElement => {
	const actions: TableItemAction[] = [];

	return <TableActionsMenu actions={actions} />;
};
