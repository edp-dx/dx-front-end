import { LOB } from '../LOB/model';

export interface Terraform {
	uuid?: string;
	apiToken: string;
	hostURL: string;
	namespace: string;
	sonarQubeURL: string;
	nexusURL: string;
	blackDuckURL: string;
	lob?: LOB;
}

export interface TerraformPayload {
	uuid: string;
	apiToken: string;
	hostURL: string;
	namespace: string;
	sonarQubeURL: string;
	nexusURL: string;
	blackDuckURL: string;
}
