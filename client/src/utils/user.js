
export const getLocation = () => {
	if (!navigator.geolocation) return { error: 'Geolocation not supported' };
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};


