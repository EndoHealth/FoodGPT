import OpenAI from 'openai';

const openai = new OpenAI();

export async function VisionService(req, res) {
	const { photo } = req.body;
	console.log(`DEBUG: VisionService init ${photo}`);
	// const { image_url } = req.body;

	const response = await openai.chat.completions.create({
		model: 'gpt-4-vision-preview',
		messages: [
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: 'From the following food image, create a list of ingredients, and its estimated calorie of each ingredient. Make the response JSON formatted.',
					},
					{
						type: 'image_url',
						image_url: {
							url: photo,
						},
					},
				],
			},
		],
		max_tokens: 4096,
	});

	const result = response.choices[0];
	const message = result.message.content;

	res.send(message);
}
