export type Message = { id: string; role: "user" | "assistant"; text: string };
export type Thread = { id: string; title: string; preview: string; updatedAt: string; messages: Message[] };
