import { socket } from '../server/socket';

const geoSuccess = ({ coords: { latitude, longitude } }) => socket.emit(
	'sendLocation', 
	{ latitude, longitude }, 
	response => console.log(response)
);
const geoError = error => console.log(error.message);

export const getLocation = () => {
	if (!navigator.geolocation) return 'Geolocation not supported';
	navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};


