const axios = require('axios');

const fxmarket_api = axios.create({
  baseURL: 'https://fxmarketapi.com/',
});
    
module.exports = {
  fxmarket_api
}
