import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';
const openai = new OpenAI();

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '50mb', // Set desired size limit here
		},
	},
	maxDuration: 60,
};
export const maxDuration = 60;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const { message } = req.body;
	const jsonRes = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo-1106',
		messages: [
			{
				role: 'user',
				content: [
					{
						type: 'text',
						text: `Analyze food ingredients to determine if it's healthy. 
                   Answer with good, medium, or bad.
							   ''' contents
							   ${message} 
							   '''

							   ''' example json format
                    {
                      healthy: "good",
                      analysis: "The food is healthy because it contains a lot of protein and fiber.",
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
	console.log(
		`DEBUG: VisionService response ${jsonRes.choices[0].message.content.substring(
			0,
			10
		)}`
	);

	res.send(jsonRes.choices[0].message.content);
}
