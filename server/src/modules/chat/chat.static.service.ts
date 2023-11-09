import dotenv from 'dotenv';
import { staticChatCompletion } from '@/completion/static.chat.completion';
import { singlePrompt } from '@/prompt/single.prompt';

dotenv.config();

export async function ChatStaticService(req, res) {
	const CHAT_MODEL = 'gpt-4';
	const { question, messages } = req.body;
	const history = JSON.parse(messages);
	console.log(`DEBUG: ChatStaticService called - ${JSON.stringify(history)}`);
	const { prompt } = await singlePrompt(question);

	const result = await staticChatCompletion(
		prompt as string,
		CHAT_MODEL,
		history
	);
	res.send(result);
}
