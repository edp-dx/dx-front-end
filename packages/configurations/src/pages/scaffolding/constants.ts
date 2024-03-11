import { FORM_NAMES } from './names';

export const classificationsOptions = ['Prod', 'Non-Prod'];

export enum NavigationTabsEnum {
	LOBSelection = 0,
	EnvManagement = 1,
	EnvConfiguration = 2,
	EnvMapping = 3,
	CDEnvConfiguration = 4,
}

export const initialCDEnvConfigurationFields = {
	[FORM_NAMES.CDEnvConfiguration.sonarQubeURL]: '',
	[FORM_NAMES.CDEnvConfiguration.nexusURL]: '',
	[FORM_NAMES.CDEnvConfiguration.blackDuckURL]: '',
	[FORM_NAMES.CDEnvConfiguration.apiToken]: '',
	[FORM_NAMES.CDEnvConfiguration.hostURL]: '',
	[FORM_NAMES.CDEnvConfiguration.namespace]: '',
};
