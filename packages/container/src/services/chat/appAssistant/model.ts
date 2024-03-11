export interface AppAssistantSendMessagePayload {
	app_name: string;
	content: string;
	session?: string;
}

export interface AppAssistantSendMessageResponse {
	answer: string;
	session_id: string;
	buttons: string[];
}
