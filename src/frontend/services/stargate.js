import axios from 'axios';

export default {
	loadStargateData: function () {
		return axios.get('http://api.bleauweb.net/stargate').then(function (promise) {
			promise.data.stateData = {
				stargates: promise.data
			};
		});
	}
};
