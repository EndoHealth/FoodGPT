import OpenAI from 'openai';
import dotenv from 'dotenv';
import { pinecone } from './pineconeClient';
dotenv.config();

const apiModel = 'text-embedding-ada-002';
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
	apiKey: apiKey,
});

export async function semanticSearchQuery(
	query: string,
	namespace = 'pdfs',
	topN = 3,
	cutoff = 0.8
) {
	try {
		const index = pinecone.Index(process.env.PINECONE_INDEX);

		const queryPayload = {
			model: apiModel,
			input: query,
		};
		const embedding_response = await openai.embeddings.create(queryPayload);
		const xq = embedding_response.data['data'][0]['embedding'];

		const res = await index.query({
			queryRequest: {
				namespace: namespace,
				vector: xq,
				topK: topN,
				includeMetadata: true,
			},
		});

		if (res.matches.filter((item) => item.score >= cutoff).length === 0)
			return { strings: [], metadatas: [] };

		const strings = res.matches
			// .filter((item) => item.score >= cutoff)
			.map((item) => (item.metadata as any).text);
		const metadatas = res.matches.map((item) => (item.metadata as any).title);

		// console.log('====================================');
		// console.log(`| ${namespace} | ${query}`);
		// console.log(JSON.stringify(strings));

		return { strings, metadatas };
	} catch (error) {
		console.error('Error creating embedding from query:', error);
		return { strings: [], metadatas: [] };
	}
}
