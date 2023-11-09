import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI();

const speechFile = path.resolve('./speech.mp3');

export async function AudioService() {
	const mp3 = await openai.audio.speech.create({
		model: 'tts-1',
		voice: 'nova',
		// input: 'Today is a wonderful day to build something people love!',
		input: `안녕하세요, 올리버 쌤입니다. 와, AI 보소! 저 한국말도 잘해요. 좀 긴 말도 해볼게요, 2024 신년 행운 아이템: 띵플러를 위한 특별 할인
안녕하세요, 띵플러 여러분
2024년 청룡의 해를 맞이해 블루밍테일 스튜디오와 함께 콜라보한 '2024년 신년 행운 아이템' 9종을 띵플러 대상 특별 할인된 금액으로 구매하실 수 있도록 기획하였습니다
다가오는 연말연시 자신과 사랑하는 사람을 위해 선물하실 수 있도록 준비해 보았어요
모든 상품은 30% 할인된 금액으로 구매 가능합니다.(단, 럭키 블루 패키지는 20% 할인)
자세한 제품 구성과 금액은 링크에서 확인해주세요`,
	});
	console.log(speechFile);
	const buffer = Buffer.from(await mp3.arrayBuffer());
	await fs.promises.writeFile(speechFile, buffer);
}
