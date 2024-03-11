import { WIDGET_MODAL_MODE } from '~/store/Dashboard/constants';
import { ValueOf } from '~/types/common';

export interface StepContentProps {
	handleClose?: () => void;
	handleBack?: () => void;
	handleNext?: () => void;
	mode?: ValueOf<typeof WIDGET_MODAL_MODE>;
}
