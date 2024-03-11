import React, { forwardRef } from 'react';
import { FormSelect as SharedFormSelectProps } from 'sharedReactComponents/FormSelect';

import { FormSelectProps } from '../../../../shared-react-components/src/components/FormSelect/types';

export const FormSelect = forwardRef((props: FormSelectProps, ref) => {
	return <SharedFormSelectProps ref={ref} {...props} />;
});

FormSelect.displayName = 'FormSelect';
