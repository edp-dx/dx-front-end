export interface PortalAssistantSendMessagePayload {
	content: string;
	session?: string;
}

export interface PortalAssistantSendMessageResponse {
	answer: string;
	session_id: string;
	buttons: string[];
}
