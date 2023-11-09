import OpenAI from 'openai';
import dotenv from 'dotenv';
import { MessageChain, CallbackType, OpenAIChatGPTModel } from 'types';
dotenv.config();

export async function streamChatCompletion(
	prompt: string,
	history: Array<MessageChain>,
	model: OpenAIChatGPTModel = 'gpt-3.5-turbo',
	callback: (type: CallbackType, message?: string, error?: any) => void
): Promise<void> {
	const messages: OpenAI.Chat.ChatCompletionMessage[] = [
		...history,
		{ role: 'user', content: prompt },
	];
	console.log(prompt);
	// console.log('DEBUG: ', messages);

	const apiBase = 'https://thingsflow-ai-instance.openai.azure.com';
	const apiVersion = '2023-05-15';
	// const apiVersion = '2023-03-15-preview';
	const apiModel = model == 'gpt-4' ? 'gpt4' : 'chatgpt';
	const apiKey = process.env.AZURE_API_KEY;

	const url = `${apiBase}/openai/deployments/${apiModel}`;
	const openai = new OpenAI({
		apiKey: apiKey,
		baseURL: url,
		defaultQuery: { 'api-version': apiVersion },
		defaultHeaders: {
			'api-key': `${apiKey}`,
		},
	});

	try {
		const azure_response = await openai.chat.completions.create({
			model: 'chatgpt',
			messages,
			stream: true,
		});

		let message = '';
		for await (const part of azure_response) {
			const isFinished = part.choices[0].finish_reason !== null;
			if (isFinished) {
				callback('done', message);
				return;
			} else {
				const chunk = part.choices[0].delta.content ?? '';
				message += chunk;
				callback('message', message);
			}
		}
	} catch (err) {
		console.log(JSON.stringify(err));
		callback('error', undefined, err);
		console.error('Could not create chat completion Error');
	}
}
