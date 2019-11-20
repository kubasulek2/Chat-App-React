import moment from 'moment';
export const getLocation = () => {
	if (!navigator.geolocation) return { error: 'Geolocation not supported' };
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
};

export const formatTime = timestamp => moment(timestamp).format('h:mm a');


