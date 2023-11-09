import { encoding_for_model, TiktokenModel } from '@dqbd/tiktoken';
const GPT_MODEL_FOR_TIKTOKEN = 'gpt-4';

export function cosineSimilarity(x, y) {
	// Calculate the dot product of x and y
	const dotProduct = x.reduce((acc, value, index) => acc + value * y[index], 0);

	// Calculate the magnitudes of x and y
	const magnitudeX = Math.sqrt(x.reduce((acc, value) => acc + value ** 2, 0));
	const magnitudeY = Math.sqrt(y.reduce((acc, value) => acc + value ** 2, 0));

	// Calculate the cosine similarity
	const similarity = dotProduct / (magnitudeX * magnitudeY);

	return similarity;
}

export const numTokens = (
	text: string,
	model: TiktokenModel = GPT_MODEL_FOR_TIKTOKEN
) => {
	// Return the number of tokens in a string.
	const encoding = encoding_for_model(model);
	return encoding.encode(text).length;
};

export function delayFor(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const safeJsonParse = (str) => {
	try {
		return JSON.parse(str);
	} catch (e) {
		return undefined;
	}
};

export function splitStringIntoNParts(str, N) {
	const chunkSize = Math.ceil(str.length / N);
	const chunks = [];

	for (let i = 0; i < str.length; i += chunkSize) {
		chunks.push(str.slice(i, i + chunkSize));
	}

	return chunks;
}

export const generateRandomString = (length = 10): string => {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};
