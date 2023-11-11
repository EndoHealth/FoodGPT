import { palette } from 'common/styles';

export const createEmailBody = (comment: string, result: any) => {
	var commentText = parseComment(comment);
	var parsedResult = parseResult(result);

	var ingredientsText = '';
	parsedResult.forEach((ingredient: any) => {
		ingredientsText += `${ingredient.ingredient} (${ingredient.estimated_calories})\n`;
	});

	return `${commentText}
${ingredientsText}`;
};

export function parseResult(result: string) {
	try {
		const jsonResult = JSON.parse(result);

		// Helper function to find a key in the object based on partial keys
		function findKey(object, partialKeys) {
			for (const key of Object.keys(object)) {
				if (
					partialKeys.some((partialKey) =>
						key.toLowerCase().includes(partialKey)
					)
				) {
					return object[key];
				}
			}
			return '';
		}

		// Assuming the input JSON has one key-value pair, and the value is the target array
		const targetArray = Object.values(jsonResult)[0] as Array<any>;

		// New array to store parsed items
		var parsedArray = [];

		targetArray.forEach((item) => {
			// Find the ingredient and calorie values with flexible key matching
			const ingredient = findKey(item, [
				'items',
				'item',
				'ingredient',
				'ingredients',
			]);
			const estimatedCalories = findKey(item, [
				'estimated_calories',
				'estimated_calorie',
				'calories',
				'calorie',
			]);

			// Add to the new array
			parsedArray.push({
				ingredient: ingredient,
				estimated_calories: estimatedCalories,
			});
		});

		return parsedArray;
	} catch {
		return [];
	}
}

export const classifyCalorie = (calorie: string | number) => {
	const calorieString = String(calorie);
	if (!calorieString || calorieString == '') return 'white';

	const maxCalories = calorieString.includes('-')
		? parseInt(calorieString.split('-').pop())
		: parseInt(calorieString);

	if (maxCalories < 100) {
		return palette.grey[200];
	} else if (maxCalories >= 100 && maxCalories <= 300) {
		return palette.blueGrey[200];
	} else {
		return palette.red[200];
	}
};

export const parseComment = (comment: string) => {
	const jsonComment = JSON.parse(comment);

	if (!jsonComment.healthy || !jsonComment.analysis)
		return `The image does not seem to play well with GPT Vision. GPT is non-deterministic, so please try again.`;

	const roast = getRoasted(JSON.parse(comment).healthy);
	const analysis = JSON.parse(comment).analysis;
	return `${roast}
${analysis}`;
};

export const getRoasted = (healthy: string) => {
	if (healthy.toLowerCase().trim() === 'bad') {
		return bad_list[Math.floor(Math.random() * bad_list.length)];
	} else if (healthy.toLowerCase().trim() === 'medium') {
		return medium_list[Math.floor(Math.random() * medium_list.length)];
	} else if (healthy.toLowerCase().trim() === 'good') {
		return good_list[Math.floor(Math.random() * good_list.length)];
	} else {
		return '';
	}
};

const bad_list = [
	"Your plate's a greasy crime scene! 🍔🚨",
	'Ah, a meal by Chef Heart Attack. 🍟❤️‍🔥',
	"Veggies? Never heard of 'em. 🥬🚫",
	"That's a sugar rush waiting to happen! 🍭💥",
	'Junk food junkie spotted! 🌭👀',
	'Carb-loading for a sofa marathon? 🛋️🏃',
	"Who needs a diet when you've got fries? 🍟😂",
	'Eating your feelings? Mood. 😬🍔',
	"Your meal's a workout for your arteries. 💪❤️‍🩹",
	"Salad's worst nightmare right there. 🥗👻🍕",
	"That's not lunch, it's a cheat day parade. 🍩🎉",
	'Your veggies called, they miss you. 🥦😢🍟',
	'Guess the diet starts... never? 😅🍔',
	"That meal's an adventure in calorie land. 🎢🍰",
	'Is it a meal or a snack buffet? 🍪🎭',
	'Looks like your food pyramid is all bottom. 🍕🔺',
	"Going for the 'all grease' diet, bold move! 🥓💥",
	"So much for 'eating light', huh? 💡🚫🍗",
	"That's a masterclass in comfort food. 🛋️🍝",
	"Your plate's yelling 'YOLO' louder than you. 🎤🍔",
];
const medium_list = [
	"Ah, the classic 'I kinda care about my health but not really' plate. 🤷‍♂️ Balanced like a tightrope walker in a windstorm.",
	"Oh look, it's the 'I read a diet book once' special. 📚 Is that a side of commitment issues I see?",
	"50 shades of beige... your meal's as exciting as watching paint dry. 🎨 Yawn.",
	"Trying to win a 'Most Average Meal' award? 🏆 Because you're nailing it, champ.",
	"That meal's so basic, it's asking for a pumpkin spice latte. ☕️ #BasicBites",
	"Did your taste buds file for a leave of absence? Because that meal's playing it safer than a crossing guard. 🚸",
	'Look at you, riding the line between junk food and health like a pro. 🍔🥗 Should I clap or...?',
	"If 'meh' was a meal, this would be it. Inspiring as a blank wall. 🧱",
	"Your plate's the embodiment of 'I guess this is fine'. Aim higher, friend. 🎯",
	"That meal is so forgettable, it's already ghosting my memory. 👻 #WhoAreYouAgain?",
	'Congrats on achieving the culinary equivalent of a shrug. 👐 Revolutionary.',
	"Is your spice rack just salt and ketchup? Because that meal's screaming 'safe choices'. 🧂",
	"Oh, you went with the 'diet of indecision' today. Bold move. 🤔",
	"Your meal's like elevator music - present, but unremarkable. 🎶 #BackgroundBites",
	"So, we're just giving up on flavor now? That's cool. Cool. 😎",
	"That plate is so balanced it could run for office. Too bad it's as exciting as a tax form. 📄",
	"Playing it safe with the food choices, I see. Don't wanna scare those taste buds, huh? 😜",
	"Ah, the 'I'm trying but not too hard' diet. Half-hearted high five! ✋",
	'You must be a diplomat because that meal is aggressively neutral. 🏳️',
	'Is your chef a librarian? Because that meal is quietly unassuming. 🤫 #ShhFood',
];
const good_list = [
	'Oh, another kale salad? Groundbreaking. 🙄 #BasicBites',
	'Avocado toast again? How original, said no one ever. 🥑😴',
	'Quinoa bowl? More like quin-NO-a. 😂 #TryHarder',
	"Sipping that green juice like it's a personality trait. 💚🤢",
	"Look at you, all health and no fun. Salad's calling, it wants its boredom back. 🥗😒",
	'Chia seeds? More like chia snooze fest. 💤 #Bland',
	"Vegan? I thought you said 've-GONE' with all the good flavors. 🌿😬",
	'Congrats on your 100th day of being painfully healthy. 🏅🍏 #YawnFest',
	"Acai bowl? More like 'ah-sigh', where's the real food? 🤔🍇",
	"Smoothie again? What's the matter, forgot how to chew? 🥤😉",
	'Oh, almond milk? Moo-ve over, fake dairy. 🐄🥛😏',
	"Eating tofu like it's the last food on Earth. 🌎🌱 #DesperateMuch",
	'Is that a protein bar or a cardboard replica? 🤨🍫',
	'You and your gluten-free bread - dry as your humor. 🍞😑',
	'So, do you and your spirulina have a special bond? 💚🤮',
	'Brussels sprouts again? What joy! Said no one. Ever. 🌱😖',
	'Did your taste buds go on vacation or are they always this bland? 🏝️🤐',
	"Matcha latte? More like matcha 'not-te.' 😂☕",
	"That's a lot of leafy greens. Compensating for something? 🌿😜",
	"Congrats on the healthy meal, what's your prize? A gold star? 🌟🥦",
];
