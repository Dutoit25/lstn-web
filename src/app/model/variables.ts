export interface Message {
    id: string,
    sender: string,
    content: string,
    dateTime: Date,
}
export enum MESSAGE_TYPE {
    USER = "user",
    ASSISTANT = "assistant"
}

export interface OpenAIResponse {
    content: string,
    run_id: string,
    thread_id: string
}

export interface EditMessage {
    role: string; // Role can be 'system', 'user', or 'assistant'
    content: string; // The actual content of the message
}

// Defining the structure of the JSON object
export interface EditMessageData {
    messages: EditMessage[]; // Array of messages
}
