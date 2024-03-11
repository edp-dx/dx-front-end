import React from 'react';
import { TabPanel } from 'sharedReactComponents/TabPanel';

import { TabPanelProps } from '../../../../shared-react-components/src/components/TabPanel/types';

export const SharedTabPanel = (props: TabPanelProps) => {
	return <TabPanel {...props} />;
};
