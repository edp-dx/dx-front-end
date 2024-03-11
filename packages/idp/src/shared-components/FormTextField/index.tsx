import React, { forwardRef } from 'react';
import { FormTextField as SharedFormTextField } from 'sharedReactComponents/FormTextField';

import { FormTextFieldProps } from '../../../../shared-react-components/src/components/FormTextField/types';

export const FormTextField = forwardRef((props: FormTextFieldProps, ref) => {
	return <SharedFormTextField ref={ref} {...props} />;
});

FormTextField.displayName = 'FormTextField';
