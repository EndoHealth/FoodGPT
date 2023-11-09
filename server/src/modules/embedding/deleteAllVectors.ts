import { pinecone } from './pineconeClient';
import dotenv from 'dotenv';

dotenv.config();

export const deleteAllVectors = async () => {
	const index = pinecone.Index(process.env.PINECONE_INDEX);

	const namespaces = ['korea'];

	for (const namespace of namespaces) {
		await index.delete1({
			deleteAll: true,
			namespace,
		});
	}
};
