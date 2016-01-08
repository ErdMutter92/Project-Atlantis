import axios from 'axios';

export default {
	loadServerData: function () {
		return axios.get('http://bleauweb.net/minecraft/api/status.php').then(function (promise) {
			promise.data.stateData = {
				servername: promise.data.servername,
				motd: promise.data.motd,
				version: promise.data.version,
			}
		});
	}
};
