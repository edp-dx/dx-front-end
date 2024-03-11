import { editResponseMock } from './editResponse.mock';
import { mockResponse } from './response.mock';

export const getMockResponse = (widgetSource: string, widgetName: string) => {
	return (mockResponse as any)?.[widgetSource]?.[widgetName];
};

export const getEditMockResponse = (widgetSource: string, widgetName: string) => {
	return (editResponseMock as any)?.[widgetSource]?.[widgetName];
};
