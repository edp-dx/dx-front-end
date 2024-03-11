export interface TableItemAction {
	label: string;
	disabled?: boolean;
	onClick?: () => void;
}

export interface TableActionsMenuProps {
	actions: Array<TableItemAction>;
}
