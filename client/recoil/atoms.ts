import { User } from 'common/models';
import { atom } from 'recoil';

export const userState = atom<User>({
	key: 'userState',
	default: {} as User,
});

export const isBottomsheetVisibleState = atom<boolean>({
	key: 'isBottomsheetVisibleState',
	default: false,
});

export const resultState = atom<string>({
	key: 'resultState',
	default: `{
    "ingredients": [
        {
            "ingredient": "White Rice",
            "estimated_calories": 200
        },
        {
            "ingredient": "Fried Breaded Meat (possibly pork cutlet or chicken cutlet)",
            "estimated_calories": "200-400"
        },
        {
            "ingredient": "Potato Salad",
            "estimated_calories": "140-180 per 100 grams"
        },
        {
            "ingredient": "Stir-fried Vegetables",
            "estimated_calories": "50-100"
        },
        {
            "ingredient": "Kimchi",
            "estimated_calories": "20-30 per 100 grams"
        },
        {
            "ingredient": "Pickled or Fermented Side Dish",
            "estimated_calories": "15-30"
        }
    ]
}`,
});

export const commentState = atom<string>({
	key: 'commentState',
	default: 'Great meal. You should go for the olympics!',
});

export const imageState = atom<any>({
	key: 'imageState',
	default: null,
});
