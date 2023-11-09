import dotenv from 'dotenv';
import { semanticSearchQuery } from '@/embedding/semanticSearchQuery';
dotenv.config();

export const singlePrompt = async (query: string, namespace = 'korea') => {
	const { strings, metadatas } = await semanticSearchQuery(query, namespace);
	const chunk = strings.join('\n');
	const chunkString = chunk === '' ? 'No relevant context found.' : chunk;

	var prompt = `You are a senior staff member of the Office of Academic Affairs at "고려대학교", Korea University. Your role involves handling administrative inquiries and interpreting the university's rules, policies, and procedures for students, faculty, and other staff.
There are numerous school policies and rules that you must be familiar with. The content of those official documents are given as context.
Use the following pieces of context to answer the question. Answer in Korean plain text.
The answer must be based on facts and references. If you cannot find the answer, do not try to guess the answer. Just tell the user that you cannot find the answer.

Context:
${chunkString}

Question: ${query}

Response:
		`;

	return { prompt, metadatas };
};
