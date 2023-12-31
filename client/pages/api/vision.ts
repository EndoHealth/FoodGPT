import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';
const openai = new OpenAI();

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '50mb',
		},
	},
	maxDuration: 300,
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const { image } = req.body;
	console.log(`DEBUG: VisionService init ${image.substring(0, 10)}`);

	let result;
	let message;
	let retryCount = 0;
	while (retryCount < 3) {
		const response = await openai.chat.completions.create({
			model: 'gpt-4-vision-preview',
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'text',
							text: 'From the following food image, create a list of ingredients, and its estimated calorie of each ingredient.',
						},
						{
							type: 'image_url',
							image_url: {
								url: image,
							},
						},
					],
				},
			],
			max_tokens: 4096,
		});

		result = response.choices[0];
		message = result.message.content;

		if (!message.includes("I'm sorry")) {
			break;
		}

		retryCount++;
	}

	if (retryCount === 3) {
		res.send("I'm sorry, I cannot recognize the food image.");
		return;
	}

	const jsonRes = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo-1106',
		messages: [
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: `Look at the content and respond by changing it to match the JSON format.
							   ''' contents
							   ${message} 
							   '''

							   Return the data as JSON in the following format:
							   ''' json format
							    {
									"ingredients": [
										"ingredient": string,
										"estimated_calories": string
									]
							    }
							   '''
							   
							   ''' example response format
							   {
								"ingredients": [
								  {
									"ingredient": "Leafy greens (lettuce, spinach, etc.)",
									"estimated_calories": 20
								  },
								  {
									"ingredient": "Cooked quinoa",
									"estimated_calories": 111
								  },
								  {
									"ingredient": "Shredded carrots",
									"estimated_calories": 25
								  },
								  {
									"ingredient": "Sliced cucumber",
									"estimated_calories": 8
								  },
								  {
									"ingredient": "Sliced radishes",
									"estimated_calories": 1
								  },
								  {
									"ingredient": "Diced tomatoes",
									"estimated_calories": 16
								  },
								  {
									"ingredient": "Sliced avocado",
									"estimated_calories": 120
								  },
								  {
									"ingredient": "Falafel patties",
									"estimated_calories": 57
								  },
								  {
									"ingredient": "Sprouts",
									"estimated_calories": 5
								  },
								  {
									"ingredient": "Salad dressing",
									"estimated_calories": 70
								  }
								]
							  }
							   '''
							   `,
					},
				],
			},
		],
		response_format: {
			type: 'json_object',
		},
		max_tokens: 4096,
	});

	console.log(`DEBUG: VisionService response ${message.substring(0, 50)}`);
	console.log(
		`DEBUG: VisionService response ${jsonRes.choices[0].message.content.substring(
			0,
			10
		)}`
	);

	res.send(jsonRes.choices[0].message.content);
}
