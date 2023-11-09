import dotenv from 'dotenv';
import { CallbackType } from 'types';
import { streamChatCompletion } from '@/completion/stream.chat.completion';
import { singlePrompt } from '@/prompt/single.prompt';

dotenv.config();

export async function ChatStreamService(req, res) {
	const CHAT_MODEL = 'gpt-4';
	const { question, messages } = req.body;
	const history = JSON.parse(messages);
	console.log(`DEBUG: ChatStreamService called - ${JSON.stringify(history)}`);

	// write head for sse
	const headers = {
		'Content-Type': 'text/event-stream;charset=UTF-8',
		Connection: 'keep-alive',
		'Cache-Control': 'no-cache',
		'Access-Control-Allow-Origin': '*',
	};
	res.writeHead(200, headers);

	const { prompt } = await singlePrompt(question);

	const listener = async (
		type: CallbackType,
		message?: string,
		error?: any
	) => {
		switch (type) {
			case 'message':
				if (message.length % 20 === 1)
					console.log(`DEBUG: MESSAGE: ${message}`);
				res.write(`MESSAGE: ${message}`);
				return;
			case 'error':
				res.write(`ERROR: ${error}`);
				break;
			case 'done':
				console.log('DEBUG: [DONE]');
				res.end('done');
				break;
		}
	};

	await streamChatCompletion(prompt as string, history, CHAT_MODEL, listener);
}
