import React from 'react';
import { TableSettings } from 'sharedReactComponents/TableSettings';

import { TableSettingsProps } from '../../../../shared-react-components/src/components/TableSettings/types';

export const SharedTableSettings = (props: TableSettingsProps) => {
	return <TableSettings {...props} />;
};
