import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: 'AIzaSyC1gqe5tvXw3d6_-WHPEodSrAfAm0Q1mU8',
	authDomain: 'foodgpt-3b909.firebaseapp.com',
	projectId: 'foodgpt-3b909',
	storageBucket: 'foodgpt-3b909.appspot.com',
	messagingSenderId: '327891406275',
	appId: '1:327891406275:web:ab5c9c8a5100d22b6a4176',
	measurementId: 'G-D8GEH8DM6Q',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
