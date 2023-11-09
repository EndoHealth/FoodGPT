import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Define the configuration for axios
const config = {
	baseURL: 'https://api-free.deepl.com',
	headers: {
		Authorization: `DeepL-Auth-Key ${[process.env.DEEPL_AUTH_KEY]}`,
		'User-Agent': 'dating-chatbot/1',
		'Content-Type': 'application/json',
	},
};

/**
 * Translates the given text from a source language to a target language using DeepL API.
 *
 * @param text - The text to be translated.
 * @param from - The source language.
 * @param to - The target language.
 * @returns The translated text.
 */
export const translate = async (text: string, to: string): Promise<string> => {
	console.log(`DEBUG: translate init: ${text} ${to}`);
	try {
		const response = await axios.post(
			'/v2/translate',
			{
				text: [text],
				target_lang: to,
			},
			config
		);

		if (
			response.data &&
			response.data.translations &&
			response.data.translations.length > 0
		) {
			console.log(
				`DEBUG: translate result: ${response.data.translations[0].text}`
			);
			return response.data.translations[0].text;
		} else {
			throw new Error(
				'Translation failed. No translation returned from the API.'
			);
		}
	} catch (error) {
		console.error('Error while translating:', error);
		throw error;
	}
};

// Example usage:
// const translatedText = await translate('Hello, world!', 'DE');
// console.log(translatedText); // Outputs: "Hallo, Welt!"
