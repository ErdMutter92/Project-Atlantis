import axios from 'axios';
import csv from 'csv';

export default {
	getItemName: function (id) {
    return axios.get('http://localhost:3333/server/nei/item/'+id).then(function (promise) {
      promise.data = promise.data[1][0].split(':').pop();
      return promise;
    });
  }
};
