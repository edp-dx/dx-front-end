import { Application } from '~/services/data/applications/model';

export const getAppData = (appName: string, applications: Array<Application> = []) =>
	applications.find((item) => item.application.name === appName);
