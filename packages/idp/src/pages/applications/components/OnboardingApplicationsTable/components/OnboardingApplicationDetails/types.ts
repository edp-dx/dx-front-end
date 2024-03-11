import { Application } from '~/services/data/applications/model';

export interface OnboardingApplicationDetailsProps {
	open: boolean;
	onClose: () => void;
	data: Application;
}
