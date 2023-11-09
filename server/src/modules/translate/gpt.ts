import { staticChatCompletion } from '@/completion/static.chat.completion';

export const translateGPT = async (
	text: string,
	from: string,
	to: string
): Promise<string> => {
	const prompt = `You are a skilled ${to} translator. Translate the following text from ${from} to ${to}. 
Do not repeat the text, and start answering right away. The response language must strictly be in ${to}. Respond in an informal speech, speak casually like to a friend ("반말").
Text: ${text}
Response: `;
	const result = await staticChatCompletion(prompt, 'gpt-4', []);
	return result;
};
