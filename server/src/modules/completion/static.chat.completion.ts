import OpenAI from 'openai';
import dotenv from 'dotenv';
import { OpenAIChatGPTModel } from 'types';
dotenv.config();

export async function staticChatCompletion(
	prompt: string,
	model: OpenAIChatGPTModel = 'gpt-3.5-turbo',
	predefinedChain: OpenAI.Chat.ChatCompletionMessage[] = []
) {
	// console.log(prompt);
	const messages: OpenAI.Chat.ChatCompletionMessage[] = predefinedChain.concat([
		{ role: 'user', content: prompt },
	]);

	const apiBase = 'https://thingsflow-ai-instance.openai.azure.com';
	const apiVersion = '2023-07-01-preview';
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

	const azure_response = await openai.chat.completions.create({
		model: 'chatgpt',
		messages,
	});

	const data = azure_response.choices[0].message.content;
	// console.log(JSON.stringify(data));
	// console.log('====================================');
	return data;
}
