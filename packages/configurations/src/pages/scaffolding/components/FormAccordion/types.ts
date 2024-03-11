import { ReactNode } from 'react';

export interface FormAccordionProps {
	name: string;
	children: ReactNode;
	expanded: boolean;
	disabled: boolean;
	handleChange: (expanded: boolean) => void;
}
