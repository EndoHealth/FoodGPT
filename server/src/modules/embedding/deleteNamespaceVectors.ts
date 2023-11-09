import { pinecone } from './pineconeClient';
import dotenv from 'dotenv';

dotenv.config();

export const deleteNamespaceVectors = async (namespace: string) => {
	const index = pinecone.Index(process.env.PINECONE_INDEX);

	await index.delete1({
		deleteAll: true,
		namespace,
	});
};
