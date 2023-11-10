declare global {
	interface Window {
		gtag: any;
	}
}

const setUserProperties = () => {
	const properties = localStorage.getItem('user_properties');
	const userProperties = properties && JSON.parse(properties);

	window.gtag('set', 'user_properties', {
		user_id: userProperties?.user_id,
		sign_up_at: userProperties?.sign_up_at,
		is_tester: userProperties?.is_tester,
	});
};

export const viewHome = () => {
	setUserProperties();
	window.gtag('event', 'view_home', {});
};

export const uploadPhotoInit = () => {
	setUserProperties();
	window.gtag('event', 'upload_photo_init', {});
};

export const uploadPhotoSuccess = () => {
	setUserProperties();
	window.gtag('event', 'upload_photo_success', {});
};

export const uploadPhotoFailure = () => {
	setUserProperties();
	window.gtag('event', 'upload_photo_failure', {});
};

export const saveEmail = () => {
	setUserProperties();
	window.gtag('event', 'save_email', {});
};

export const viewResult = (result) => {
	setUserProperties();
	window.gtag('event', 'view_result', { result: result });
};

export const sendEmail = (email) => {
	setUserProperties();
	window.gtag('event', 'send_email', { email: email });
};
