import OpenAI from 'openai';

const openai = new OpenAI();

export async function VisionService(req, res) {
	const { image } = req.body;
	console.log(`DEBUG: VisionService init ${image.substring(0, 10)}`);

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
							"url": image,
						},
					},
				],
			},
		],
		max_tokens: 4096,
	});

	const result = response.choices[0];
	const message = result.message.content;

	console.log(`DEBUG: VisionService response ${message.substring(0, 10)}`);
	res.send(message);
}
