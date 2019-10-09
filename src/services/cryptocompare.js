const axios = require('axios');

const cryptocompare_api = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/',
});
    
module.exports = {
  cryptocompare_api
}
