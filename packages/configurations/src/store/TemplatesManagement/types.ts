export interface TemplatesManagementStore {
	templatesManagementTab: number;
	setTemplatesManagementTab: (value: number) => void;
	templateCategory: string;
	setTemplateCategory: (value: string) => void;
}
