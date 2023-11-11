import { atom } from 'recoil';

export const resultState = atom<string>({
	key: 'resultState',
	default: '',
});

export const commentState = atom<string>({
	key: 'commentState',
	default: '',
});

export const imageState = atom<any>({
	key: 'imageState',
	default: null,
});
