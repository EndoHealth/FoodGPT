import OpenAI from 'openai';

const openai = new OpenAI();

export async function AssistantService() {
	const assistant = await openai.beta.assistants.create({
		name: 'Math Tutor',
		instructions:
			'You are a personal math tutor. Write and run code to answer math questions.',
		tools: [{ type: 'code_interpreter' }],
		model: 'gpt-4-1106-preview',
	});

	const thread = await openai.beta.threads.create({});

	const message = await openai.beta.threads.messages.create(thread.id, {
		role: 'user',
		content: 'I need to solve the equation `3x + 11 = 14`. Can you help me?',
	});

	const run = await openai.beta.threads.runs.create(thread.id, {
		assistant_id: assistant.id,
		instructions:
			'Please address the user as Jane Doe. The user has a premium account.',
	});

	console.log(
		`DEBUG: status: ${JSON.stringify(
			await openai.beta.threads.runs.retrieve(thread.id, run.id)
		)}`
	);

	// wait 20 seconds
	await new Promise((resolve) => setTimeout(resolve, 20000));

	console.log(
		`DEBUG: status: ${JSON.stringify(
			await openai.beta.threads.runs.retrieve(thread.id, run.id)
		)}`
	);

	const messages = await openai.beta.threads.messages.list(thread.id);
	console.log(`DEBUG: messages: ${JSON.stringify(messages)}`);
}
