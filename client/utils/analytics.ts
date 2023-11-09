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
