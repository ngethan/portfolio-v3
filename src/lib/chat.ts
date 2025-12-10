export interface ChatMessage {
	role: "user" | "assistant";
	content: string;
}

export interface ChatRequest {
	messages: ChatMessage[];
}

export interface ChatStreamChunk {
	type: "text" | "error" | "done";
	content?: string;
	error?: string;
}
