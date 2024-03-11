export interface TableItemAction {
	label: string;
	disabled?: boolean;
	onClick?: () => void;
}

export interface TableItemActionsProps {
	actions: TableItemAction[];
}
