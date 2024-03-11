import { LOB } from '../LOB/model';

export interface EnvManagement {
	uuid: string;
	name: string;
	description: string;
	classification: string;
	lob: LOB;
}

export interface EnvManagementPayload {
	uuid: string;
	description: string;
	name: string;
	classification: number;
}
