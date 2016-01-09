module.exports = {
	handle: function (err) {
		console.log(err);
		switch (err.status) {
			case 404:
				return {
					status: 404,
					message: 'Error: The file was not found or is missing.'
				};
				break;
			case 500:
				return {
					status: 500,
					message: 'Error: 500 - Internal Server Error'
				};
			default:
				return {
					status: '500a',
					message: 'Error: Unknown Error'
				}
		}
	}
}
