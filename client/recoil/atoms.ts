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
	default: '',
});

export const imageState = atom<any>({
	key: 'imageState',
	default: null,
});
