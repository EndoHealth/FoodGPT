export type Message = {
	id?: number;
	speaker: string;
	text: string;
};

export type MessageChain = {
	role: 'assistant' | 'user';
	content: string;
};

export type Question = {
	id: string;
	questionText: string;
};

export type OpenAIChatGPTModel =
	| 'gpt-3.5-turbo'
	| 'gpt-3.5-turbo-0301'
	| 'gpt-4'
	| 'gpt-4-0314'
	| 'gpt-4-32k-0314';

export interface IChatGPTSSEChoice {
	delta: any;
	index: number;
	finish_reason: 'stop' | null;
}

// Server-Side-Event 를 통해서 전달받는 데이터 인터페이스
export interface IChatGPTSSEData {
	id: string;
	object: 'chat.completion.chunk';
	created: number;
	model: OpenAIChatGPTModel;
	choices: IChatGPTSSEChoice[];
}

export type CallbackType = 'message' | 'done' | 'error';
